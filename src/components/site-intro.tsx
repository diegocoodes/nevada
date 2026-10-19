"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isDistributorPath } from "@/lib/brand";

export function SiteIntro({ logo }: { logo: string }) {
  const distributor = isDistributorPath(usePathname());
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = window.setTimeout(
      () => setFinished(true),
      preference.matches ? 0 : 1450,
    );
    const reduceMotion = () => {
      if (!preference.matches) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFinished(true), 0);
    };
    preference.addEventListener("change", reduceMotion);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener("change", reduceMotion);
    };
  }, []);

  if (finished) return null;
  return (
    <div className="site-entrance" aria-hidden="true">
      <span className="site-entrance-light" />
      <div className="site-entrance-brand">
        <Image
          src={distributor ? "/images/retem-re-light.svg" : logo}
          alt=""
          width={distributor ? 820 : 1000}
          height={distributor ? 360 : 260}
          sizes="230px"
          loading="eager"
        />
        <span>
          {distributor ? "LOJA DISTRIBUIDORA" : "CUIDADO EM CADA DETALHE."}
        </span>
        <i />
      </div>
    </div>
  );
}
