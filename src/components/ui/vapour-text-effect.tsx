"use client";

import { createElement, useEffect, useRef } from "react";

export enum Tag {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  P = "p",
}

type VaporizeTextCycleProps = {
  texts: string[];
  font?: { fontFamily?: string; fontSize?: string; fontWeight?: number };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
  direction?: "left-to-right" | "right-to-left";
  alignment?: "left" | "center" | "right";
  tag?: Tag;
};

type Particle = {
  x: number;
  y: number;
  alpha: number;
  velocityX: number;
  velocityY: number;
  release: number;
};

// Adapted from the supplied vapour-text-effect: one animation loop, bounded
// sampling, fitted typography and full observer / animation cleanup.
export default function VaporizeTextCycle({
  texts,
  font,
  color = "rgb(247, 244, 239)",
  spread = 5,
  density = 5,
  animation,
  direction = "left-to-right",
  alignment = "center",
  tag = Tag.P,
}: VaporizeTextCycleProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textKey = JSON.stringify(texts);
  const fontFamily = font?.fontFamily ?? "Manrope, sans-serif";
  const fontSize = font?.fontSize ?? "88px";
  const fontWeight = font?.fontWeight ?? 600;
  const vaporizeDuration = Math.max(0.1, animation?.vaporizeDuration ?? 0.85);
  const fadeInDuration = Math.max(0.1, animation?.fadeInDuration ?? 0.4);
  const waitDuration = Math.max(0.1, animation?.waitDuration ?? 0.65);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const words = (JSON.parse(textKey) as string[]).filter(Boolean);
    const ctx = canvas.getContext("2d");
    if (!ctx || !words.length) {
      wrapper.dataset.state = "fallback";
      return;
    }
    const sample = document.createElement("canvas");
    const sampleCtx = sample.getContext("2d", { willReadFrequently: true });
    if (!sampleCtx) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let ready = false;
    let inView = false;
    let frame = 0;
    let previous = 0;
    let age = 0;
    let index = 0;
    let phase: "waiting" | "vaporizing" | "fading-in" = "waiting";
    let width = 0;
    let height = 0;
    let dpr = 1;
    let textX = 0;
    let textY = 0;
    let particles: Particle[] = [];
    let fittedFont = "";

    const paintText = (opacity = 1) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = fittedFont;
      ctx.textAlign = alignment;
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fillText(words[index], textX, textY);
      ctx.globalAlpha = 1;
    };

    const prepare = () => {
      if (!width || !height) return;
      const requestedSize = Math.min(parseFloat(fontSize) || 88, height * 0.55);
      sampleCtx.font = `${fontWeight} ${requestedSize}px ${fontFamily}`;
      const measured = sampleCtx.measureText(words[index]).width;
      const size = Math.min(
        requestedSize,
        (requestedSize * (width * 0.84)) / Math.max(1, measured),
      );
      fittedFont = `${fontWeight} ${size}px ${fontFamily}`;
      sample.width = Math.ceil(width);
      sample.height = Math.ceil(height);
      sampleCtx.font = fittedFont;
      sampleCtx.textAlign = alignment;
      sampleCtx.textBaseline = "middle";
      sampleCtx.fillStyle = color;
      textX =
        alignment === "center"
          ? width / 2
          : alignment === "left"
            ? width * 0.08
            : width * 0.92;
      textY = height / 2;
      sampleCtx.fillText(words[index], textX, textY);
      const textWidth = sampleCtx.measureText(words[index]).width;
      const left =
        alignment === "center"
          ? textX - textWidth / 2
          : alignment === "left"
            ? textX
            : textX - textWidth;
      const data = sampleCtx.getImageData(
        0,
        0,
        sample.width,
        sample.height,
      ).data;
      const step = Math.max(
        2,
        Math.round(4 - Math.min(10, Math.max(0, density)) * 0.2),
      );
      particles = [];
      for (
        let y = 0;
        y < sample.height && particles.length < 12000;
        y += step
      ) {
        for (
          let x = 0;
          x < sample.width && particles.length < 12000;
          x += step
        ) {
          const alpha = data[(y * sample.width + x) * 4 + 3] / 255;
          if (alpha < 0.1) continue;
          const progress = Math.min(
            1,
            Math.max(0, (x - left) / Math.max(1, textWidth)),
          );
          particles.push({
            x,
            y,
            alpha,
            velocityX:
              (Math.random() * 2 + 0.3) *
              spread *
              (direction === "left-to-right" ? 1 : -1),
            velocityY: (Math.random() - 0.6) * spread * 3,
            release:
              (direction === "left-to-right" ? progress : 1 - progress) *
              vaporizeDuration *
              0.55,
          });
        }
      }
      wrapper.dataset.text = words[index];
      wrapper.dataset.particles = String(particles.length);
      paintText();
    };

    const active = () =>
      ready && inView && !document.hidden && !preference.matches && !disposed;
    const tick = (now: number) => {
      frame = 0;
      if (!active()) return;
      // Positions derive from elapsed time, so the cycle stays on schedule
      // even when a slower device cannot render every frame.
      if (previous) age += (now - previous) / 1000;
      previous = now;
      wrapper.dataset.state = phase;
      if (phase === "waiting") {
        paintText();
        if (age >= waitDuration) {
          age = 0;
          phase = "vaporizing";
        }
      } else if (phase === "vaporizing") {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = color;
        const dot = Math.max(
          1,
          Math.round(4 - Math.min(10, Math.max(0, density)) * 0.2),
        );
        for (const particle of particles) {
          const releasedFor = Math.max(0, age - particle.release);
          const life = Math.min(1, releasedFor / (vaporizeDuration * 0.45));
          ctx.globalAlpha = particle.alpha * (1 - life);
          ctx.fillRect(
            particle.x + particle.velocityX * releasedFor * 12,
            particle.y +
              particle.velocityY * releasedFor * 8 -
              releasedFor * releasedFor * 25,
            dot,
            dot,
          );
        }
        ctx.globalAlpha = 1;
        if (age >= vaporizeDuration) {
          index = (index + 1) % words.length;
          phase = "fading-in";
          age = 0;
          prepare();
          paintText(0);
        }
      } else {
        paintText(Math.min(1, age / fadeInDuration));
        if (age >= fadeInDuration) {
          phase = "waiting";
          age = 0;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      if (preference.matches) {
        delete wrapper.dataset.ready;
        wrapper.dataset.state = "reduced";
      } else if (active()) {
        wrapper.dataset.ready = "true";
        frame = requestAnimationFrame(tick);
      } else wrapper.dataset.state = "paused";
    };
    const resize = () => {
      if (disposed) return;
      const bounds = wrapper.getBoundingClientRect();
      width = Math.round(bounds.width);
      height = Math.round(bounds.height);
      if (!width || !height) return;
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      prepare();
    };
    const resizeObserver = new ResizeObserver(resize);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    resizeObserver.observe(wrapper);
    observer.observe(wrapper);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    document.fonts.ready.then(() => {
      if (disposed) return;
      ready = true;
      resize();
      update();
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      particles = [];
    };
  }, [
    textKey,
    fontFamily,
    fontSize,
    fontWeight,
    color,
    spread,
    density,
    vaporizeDuration,
    fadeInDuration,
    waitDuration,
    direction,
    alignment,
  ]);

  return (
    <div ref={wrapperRef} className="vapor-text" data-state="static">
      <span className="vapor-text-fallback" aria-hidden="true">
        {texts[0] ?? ""}
      </span>
      <canvas ref={canvasRef} aria-hidden="true" />
      {createElement(tag, { className: "sr-only" }, texts.join(". "))}
    </div>
  );
}
