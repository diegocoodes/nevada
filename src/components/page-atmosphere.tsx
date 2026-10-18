"use client";

import { usePathname } from "next/navigation";
import { Atmosphere } from "@/components/atmosphere";

export function PageAtmosphere({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/distribuidora") return children;
  return <Atmosphere>{children}</Atmosphere>;
}
