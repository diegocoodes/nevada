"use client";

import { usePathname } from "next/navigation";
import { isDistributorPath } from "@/lib/brand";
import { useEffect, useRef } from "react";

export function BrandShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const distributor = isDistributorPath(pathname);
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      if (root.current)
        root.current.dataset.motionPaused = String(document.hidden);
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <div
      ref={root}
      className="storefront"
      data-brand={distributor ? "distributor" : "studio"}
      data-page={
        pathname === "/distribuidora"
          ? "distributor-landing"
          : pathname.startsWith("/produtos") || pathname === "/checkout"
            ? "commerce"
            : undefined
      }
    >
      {children}
    </div>
  );
}
