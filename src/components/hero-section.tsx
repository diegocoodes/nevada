import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroCar } from "@/components/hero-car";
import { DrawLineText } from "@/components/ui/draw-line-text";
import type { Settings } from "@/types/store";

export function HeroSection({ settings }: { settings: Settings }) {
  return (
    <section className="hero hero-luxury" aria-labelledby="hero-title">
      <HeroCar image={settings.heroImage} />
      <div className="luxury-shade" />
      <div className="container luxury-copy">
        <h1 id="hero-title">
          <DrawLineText
            text={settings.heroTitle}
            color="#71B9B0"
            oneByOne={false}
            strokeWidth={1.1}
          />
        </h1>
        <Link href="/produtos" className="luxury-link">
          Conheça a coleção <ArrowUpRight size={21} />
        </Link>
      </div>
    </section>
  );
}
