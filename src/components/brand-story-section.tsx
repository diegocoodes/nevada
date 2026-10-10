import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  SlantedImageClip,
  SlantedImageOutline,
} from "@/components/ui/slanted-image-clip";

export function BrandStorySection() {
  return (
    <section className="section brand-story" aria-labelledby="story-title">
      <div className="container story-editorial-grid">
        <Reveal className="story-editorial-media">
          <figure className="story-editorial-figure">
            <SlantedImageClip id="nevada-story-photo-shape" />
            <div className="story-editorial-image">
              <Image
                src="/images/nevada-application.png"
                alt="Aplicador posicionando uma película de proteção transparente sobre a pintura de um carro"
                fill
                sizes="(max-width: 800px) 100vw, (max-width: 1200px) 55vw, 640px"
              />
              <SlantedImageOutline id="nevada-story-photo-shape" />
            </div>
            <figcaption>O cuidado começa na escolha.</figcaption>
          </figure>
        </Reveal>
        <Reveal className="story-editorial-copy">
          <h2 id="story-title">
            NEVADA <span>PROTECTION FILMS</span>
          </h2>
          <div className="story-editorial-text">
            <h3>Seu projeto. Nossa proteção.</h3>
            <p>
              Da pintura aos vidros, encontre PPF, películas e produtos de
              aplicação para preservar e valorizar cada acabamento.
            </p>
          </div>
          <div className="story-editorial-text story-editorial-detail">
            <h3>Uma linha para cada necessidade.</h3>
            <p>
              Conheça as possibilidades da Nevada e escolha a solução para a
              superfície que você quer proteger.
            </p>
          </div>
          <Link href="/contato" className="story-editorial-link">
            Converse com nossa equipe
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
