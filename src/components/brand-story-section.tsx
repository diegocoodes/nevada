import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="campaign-story" aria-labelledby="story-title">
      <div className="container campaign-story-grid">
        <div className="campaign-story-photo">
          <Image
            src="/images/retem-ppf-real.webp"
            alt="Profissionais posicionando uma película de proteção sobre a pintura de um esportivo"
            fill
            sizes="(max-width: 700px) 100vw, 45vw"
          />
          <span>Imagem ilustrativa · WAVYVISUALS / Pexels</span>
        </div>
        <div className="campaign-story-copy">
          <p className="campaign-kicker">A ESSÊNCIA RETÉM</p>
          <h2 id="story-title">
            Técnica na aplicação.
            <br />
            <span>Cuidado em cada escolha.</span>
          </h2>
          <p>
            Em Praia de Itaparica, Vila Velha, reunimos proteção e estética para
            cuidar do que acompanha você.
          </p>
          <p>
            Trabalhamos com Origin Películas e produtos Gyeon. Da primeira
            conversa ao acabamento, a atenção está no seu projeto e no resultado
            que você procura.
          </p>
          <Link href="/contato" className="campaign-button">
            Converse com a RETÉM <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
