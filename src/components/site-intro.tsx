"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import VaporizeTextCycle from "@/components/ui/vapour-text-effect";
import { usePathname } from "next/navigation";
import { isDistributorPath } from "@/lib/brand";

export function SiteIntro({ logo }: { logo: string }) {
  const distributor = isDistributorPath(usePathname());
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
        Math.max(0, 3100 - (performance.now() - started)),
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
    const safetyTimer = setTimeout(finish, 4000);
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
      <div className="intro-vapor-composition">
        <Image
          className="intro-vapor-logo"
          src={distributor ? "/images/retem-re.svg" : logo}
          alt={
            distributor ? "Retém Loja Distribuidora" : "Retém Estética Premium"
          }
          width={distributor ? 820 : 1000}
          height={distributor ? 360 : 260}
          loading="eager"
        />
        <VaporizeTextCycle
          texts={[
            "RETÉM",
            distributor ? "SEU PRÓXIMO PROJETO." : "CUIDADO EM CADA DETALHE.",
          ]}
          font={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "96px",
            fontWeight: 600,
          }}
          animation={{
            waitDuration: 0.65,
            vaporizeDuration: 0.8,
            fadeInDuration: 0.4,
          }}
          spread={5}
          density={5}
        />
        <span className="intro-vapor-progress" />
      </div>
      <span className="site-intro-signature">
        {distributor ? "RETÉM LOJA DISTRIBUIDORA" : "RETÉM ESTÉTICA PREMIUM"}
      </span>
    </div>
  );
}
