"use client";

import { usePathname } from "next/navigation";
import { isDistributorPath } from "@/lib/brand";

export function BrandShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const distributor = isDistributorPath(pathname);
  return (
    <div
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
