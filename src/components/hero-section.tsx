import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Settings } from "@/types/store";
import { contactUrl } from "@/lib/utils";

export function HeroSection({ settings }: { settings: Settings }) {
  return (
    <section className="campaign-hero" aria-labelledby="hero-title">
      <div className="campaign-hero-visual">
        <Image
          className="hero-photo"
          src="/images/retem-hero-real.webp"
          alt="Detalhes do capô e do farol de um esportivo vermelho"
          fill
          sizes="(max-width: 760px) 100vw, 75vw"
          preload
        />
      </div>
      <div className="container campaign-hero-inner">
        <div className="campaign-hero-copy">
          <p className="campaign-kicker">PELÍCULAS · PPF · ESTÉTICA PREMIUM</p>
          <h1 id="hero-title">
            Seu carro merece
            <br />
            <span>proteção de verdade.</span>
          </h1>
          <p>
            Preserve a pintura. Sinta o conforto.
            <br />
            Descubra o cuidado da RETÉM em cada detalhe.
          </p>
          <a href={contactUrl(settings.whatsapp)} className="campaign-button">
            Solicitar orçamento <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <Link href="#servicos" className="campaign-hero-explore">
            Explore os serviços <ArrowDown size={15} aria-hidden="true" />
          </Link>
          <span className="campaign-hero-location">
            PRAIA DE ITAPARICA · VILA VELHA, ES
          </span>
        </div>
      </div>
    </section>
  );
}
