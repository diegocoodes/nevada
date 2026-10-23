"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { isDistributorPath } from "@/lib/brand";

export function BrandLoader({
  logo = "/images/retem-logo.svg",
  name = "Retém Estética Premium",
}: {
  logo?: string;
  name?: string;
}) {
  const distributor = isDistributorPath(usePathname());
  return (
    <div className="brand-loader">
      <div className="brand-loader-glow" aria-hidden="true" />
      <Image
        className="brand-loader-logo"
        src={distributor ? "/images/retem-re.svg" : logo}
        alt={distributor ? "Retém Loja Distribuidora" : name}
        width={distributor ? 820 : 1000}
        height={distributor ? 360 : 260}
        sizes="(max-width: 600px) 72vw, 380px"
        loading="eager"
      />
      <div className="brand-loader-track" aria-hidden="true">
        <span />
      </div>
      <p>{distributor ? "LOJA DISTRIBUIDORA" : "CUIDADO EM CADA DETALHE."}</p>
    </div>
  );
}
