"use client";

import { useEffect, useState } from "react";
import { BrandLoader } from "@/components/brand-loader";

export function SiteIntro({ logo }: { logo: string }) {
  const [phase, setPhase] = useState<"entering" | "leaving" | "hidden">(
    "entering",
  );

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const started = performance.now();
    let finished = false;
    let exitTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (preference.matches) {
        setPhase("hidden");
      } else {
        setPhase("leaving");
        removeTimer = setTimeout(() => setPhase("hidden"), 400);
      }
    };
    const ready = () => {
      clearTimeout(exitTimer);
      exitTimer = setTimeout(
        finish,
        Math.max(0, 1100 - (performance.now() - started)),
      );
    };
    const changePreference = () => {
      if (preference.matches) {
        clearTimeout(removeTimer);
        finished = true;
        setPhase("hidden");
      }
    };
    // Keep the entrance brief even when a nonessential resource is slow.
    const safetyTimer = setTimeout(finish, 2800);
    if (preference.matches) {
      exitTimer = setTimeout(finish, 0);
    } else if (document.readyState === "complete") {
      ready();
    } else {
      window.addEventListener("load", ready, { once: true });
    }
    preference.addEventListener("change", changePreference);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
      clearTimeout(safetyTimer);
      window.removeEventListener("load", ready);
      preference.removeEventListener("change", changePreference);
    };
  }, []);

  if (phase === "hidden") return null;
  return (
    <div className="site-intro" data-phase={phase} aria-hidden="true">
      <BrandLoader logo={logo} />
      <span className="site-intro-signature">NEVADA PROTECTION FILMS</span>
    </div>
  );
}
