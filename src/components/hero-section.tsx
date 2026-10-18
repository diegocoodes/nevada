import { ArrowUpRight } from "lucide-react";
import { HeroCar } from "@/components/hero-car";
import { DrawLineText } from "@/components/ui/draw-line-text";
import type { Settings } from "@/types/store";
import { contactUrl } from "@/lib/utils";

export function HeroSection({ settings }: { settings: Settings }) {
  return (
    <section
      className="hero hero-luxury hero-reference"
      aria-labelledby="hero-title"
    >
      <HeroCar
        image="/images/retem-hero-profile.webp"
        alt="Composição de um esportivo clássico vermelho visto de perfil"
      />
      <div className="container reference-hero-copy">
        <h1 id="hero-title" className="reference-hero-title">
          <DrawLineText
            text="RETÉM"
            color="#F03B42"
            oneByOne={false}
            strokeWidth={1.1}
          />
        </h1>
      </div>
      <div className="container reference-hero-footer">
        <a href={contactUrl(settings.whatsapp)} className="reference-hero-cta">
          Solicitar orçamento <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
