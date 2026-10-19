"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLandingMotion } from "@/hooks/use-landing-motion";

export function LandingPage({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Start inside the page boundary, after its streamed HTML has hydrated.
  useLandingMotion(root, pathname);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
