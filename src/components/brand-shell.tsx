"use client";

import { usePathname } from "next/navigation";
import { isDistributorPath } from "@/lib/brand";
import { useRef } from "react";
import { useLandingMotion } from "@/hooks/use-landing-motion";

export function BrandShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const distributor = isDistributorPath(pathname);
  const root = useRef<HTMLDivElement>(null);
  useLandingMotion(root, pathname);
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
