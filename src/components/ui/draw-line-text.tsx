"use client";

import { useRef, type ComponentProps } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

type DrawTextProps = {
  afterFill?: boolean;
  color?: string;
  fontSize?: number;
  letterSpacing?: number;
  oneByOne?: boolean;
  strokeWidth?: number;
  text: string;
  wordSpacing?: number;
} & ComponentProps<"svg">;

// Adapted from the supplied DrawLineText: the HTML text reserves its layout,
// remains accessible, and supplies positions for wrapped SVG letters.
export function DrawLineText({
  text,
  oneByOne = true,
  afterFill = true,
  color = "currentColor",
  fontSize,
  wordSpacing,
  strokeWidth = 1,
  letterSpacing,
  ...props
}: DrawTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      const wrapper = wrapperRef.current;
      const fallback = fallbackRef.current;
      const svg = svgRef.current;
      if (!wrapper || !fallback || !svg || !contextSafe) return;
      const letters = Array.from(svg.querySelectorAll("text"));
      const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
      let disposed = false;
      let initialized = false;
      let lastWidth = 0;
      let lastHeight = 0;
      let resizeFrame = 0;
      let timeline: gsap.core.Timeline | undefined;

      const paint = contextSafe((animate: boolean) => {
        if (disposed) return;
        timeline?.kill();
        if (preference.matches) {
          wrapper.removeAttribute("data-ready");
          wrapper.dataset.animation = "reduced";
          return;
        }
        const node = fallback.firstChild;
        if (!(node instanceof Text)) return;
        const bounds = wrapper.getBoundingClientRect();
        const typography = getComputedStyle(fallback);
        svg.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
        svg.style.font = typography.font;
        svg.style.letterSpacing = typography.letterSpacing;
        svg.style.wordSpacing = typography.wordSpacing;
        lastWidth = bounds.width;
        lastHeight = bounds.height;
        let offset = 0;
        const range = document.createRange();
        Array.from(text).forEach((char, index) => {
          range.setStart(node, offset);
          offset += char.length;
          range.setEnd(node, offset);
          const rect = range.getBoundingClientRect();
          const letter = letters[index];
          letter.setAttribute("x", `${rect.left - bounds.left}`);
          letter.setAttribute("y", `${rect.top - bounds.top}`);
          const length = Math.max(letter.getComputedTextLength() * 8, 1);
          letter.style.strokeDasharray = `${length}px`;
          letter.style.strokeDashoffset = animate ? `${length}px` : "0px";
          letter.style.fillOpacity = animate ? "0" : afterFill ? "1" : "0";
        });
        wrapper.dataset.ready = "true";
        if (!animate) {
          wrapper.dataset.animation = "complete";
          return;
        }
        wrapper.dataset.animation = "drawing";
        const visibleLetters = letters.filter((letter) =>
          letter.textContent?.trim(),
        );
        timeline = gsap.timeline({
          onComplete: () => {
            wrapper.dataset.animation = "complete";
          },
        });
        timeline.to(visibleLetters, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "none",
          stagger: oneByOne ? { amount: 0.8 } : 0,
        });
        if (afterFill)
          timeline.to(visibleLetters, {
            fillOpacity: 1,
            duration: 0.6,
            ease: "power4.in",
            stagger: { amount: 0.2, from: "center" },
          });
        if (document.hidden) timeline.pause();
      });

      const observer = new ResizeObserver(() => {
        if (!initialized) return;
        const bounds = wrapper.getBoundingClientRect();
        if (bounds.width === lastWidth && bounds.height === lastHeight) return;
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => paint(false));
      });
      observer.observe(wrapper);
      const changePreference = () => paint(false);
      const changeVisibility = () => {
        if (document.hidden) timeline?.pause();
        else timeline?.resume();
      };
      preference.addEventListener("change", changePreference);
      document.addEventListener("visibilitychange", changeVisibility);
      void document.fonts.ready.then(() => {
        if (disposed) return;
        initialized = true;
        paint(true);
      });
      return () => {
        disposed = true;
        observer.disconnect();
        cancelAnimationFrame(resizeFrame);
        timeline?.kill();
        preference.removeEventListener("change", changePreference);
        document.removeEventListener("visibilitychange", changeVisibility);
        wrapper.removeAttribute("data-ready");
      };
    },
    {
      scope: wrapperRef,
      dependencies: [
        text,
        oneByOne,
        afterFill,
        color,
        fontSize,
        wordSpacing,
        strokeWidth,
        letterSpacing,
      ],
      revertOnUpdate: true,
    },
  );

  return (
    <span
      ref={wrapperRef}
      className="draw-line-text"
      style={{ color, fontSize, letterSpacing, wordSpacing }}
    >
      <span ref={fallbackRef} className="draw-text-fallback">
        {text}
      </span>
      <svg
        {...props}
        ref={svgRef}
        className={`draw-text-svg ${props.className || ""}`}
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
      >
        {Array.from(text).map((char, index) => (
          <text
            key={index}
            dominantBaseline="text-before-edge"
            style={{ stroke: color, fill: color, fillOpacity: 0, strokeWidth }}
          >
            {char}
          </text>
        ))}
      </svg>
    </span>
  );
}
