"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export function Reveal({
  children,
  className = "",
  stagger = false,
  direction = "up",
  ...props
}: {
  stagger?: boolean;
  direction?: "up" | "left" | "right";
} & React.ComponentPropsWithoutRef<"div">) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const targets = stagger
          ? Array.from(root.current?.children || [])
          : root.current;
        gsap.from(targets, {
          y: direction === "up" ? (stagger ? 32 : 28) : 0,
          x: direction === "left" ? -28 : direction === "right" ? 28 : 0,
          opacity: 0,
          duration: 0.75,
          stagger: stagger ? 0.1 : 0,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: root.current,
            start: "top 95%",
            once: true,
          },
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [stagger, direction]);
  return (
    <div ref={root} className={className} {...props}>
      {children}
    </div>
  );
}
