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
        <Reveal className="story-editorial-media" direction="left">
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
            <figcaption>
              Proteção na superfície. Cuidado em cada detalhe.
            </figcaption>
          </figure>
        </Reveal>
        <Reveal className="story-editorial-copy" direction="right">
          <h2 id="story-title">
            RETÉM <span>ESTÉTICA PREMIUM</span>
          </h2>
          <div className="story-editorial-text">
            <h3>O seu carro merece esse cuidado.</h3>
            <p>
              Da pintura aos vidros, cada escolha faz parte da experiência de
              dirigir. A Retém reúne cuidado estético, PPF e películas para
              preservar o que torna o seu carro único.
            </p>
          </div>
          <div className="story-editorial-text story-editorial-detail">
            <h3>Vamos entender o que você precisa.</h3>
            <p>
              Conte sobre o seu carro e a sua rotina. Nossa equipe ajuda a
              escolher a proteção e o acabamento para o seu projeto.
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
