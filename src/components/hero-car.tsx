"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HeroCar({
  image,
  alt = "Carro esportivo prateado em perfil",
}: {
  image: string;
  alt?: string;
}) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    const update = () => {
      scene.dataset.active = String(
        inView && !document.hidden && !preference.matches,
      );
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(scene);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      scene.dataset.active = "false";
    };
  }, []);

  return (
    <div className="hero-car-scene" ref={sceneRef} data-active="false">
      <Image
        src={image}
        alt={alt}
        fill
        preload
        sizes="100vw"
        className="hero-photo"
      />
    </div>
  );
}
