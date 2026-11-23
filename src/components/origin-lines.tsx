import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getOriginPerformance, originLines, originSource } from "@/data/origin";
import { contactUrl } from "@/lib/utils";
import { FilmPerformance } from "@/components/film-performance";
import { FilmArtwork } from "@/components/film-artwork";

export function OriginLines({ whatsapp }: { whatsapp: string }) {
  return (
    <section
      id="origin"
      className="section origin-lines"
      aria-labelledby="origin-title"
    >
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">ORIGIN PELÍCULAS NA RETÉM LOJA</p>
          <h2 id="origin-title">
            Mais conforto.
            <br />
            <span>Em cada linha.</span>
          </h2>
          <p>
            Conheça as tecnologias e encontre a película para o seu próximo
            projeto.
          </p>
        </div>
        <div className="origin-line-list">
          {originLines.map((line) => (
            <article className="origin-line" key={line.slug}>
              <div className="origin-line-visual">
                <div className="origin-line-photo origin-line-artwork">
                  <FilmArtwork
                    product={{
                      name: line.name,
                      brand: "origin",
                      artwork: line.artwork,
                      images: [
                        {
                          url: `/images/origin/campaigns/${line.slug}.webp`,
                          alt: `${line.name} — composição ilustrativa com carro e iluminação cobre`,
                          position: 0,
                        },
                      ],
                    }}
                    sizes="(max-width: 760px) 100vw, 500px"
                  />
                </div>
                <FilmPerformance performance={getOriginPerformance(line)} />
              </div>
              <div className="origin-line-copy">
                <p className="eyebrow">{line.technology}</p>
                <h3>{line.name}</h3>
                <p>{line.description}</p>
                {line.tones.length > 0 && (
                  <p className="origin-tones">
                    Tonalidades:{" "}
                    <strong>
                      {line.tones.map((tone) => `${tone}%`).join(" · ")}
                    </strong>
                  </p>
                )}
                <p className="origin-warranty">Garantia: {line.warranty}</p>
                <div className="origin-line-actions">
                  <Link
                    className="button button-primary"
                    href={`/produtos/${line.slug}`}
                  >
                    Escolher variação{" "}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  <a
                    href={`${contactUrl(whatsapp)}?text=${encodeURIComponent(`Olá, Retém Loja! Gostaria de consultar a linha ${line.name}.`)}`}
                  >
                    Consultar a linha{" "}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="origin-source">
          Dados e imagens de apresentação:{" "}
          <a href={originSource} target="_blank" rel="noopener noreferrer">
            Origin Films <ArrowUpRight size={13} aria-hidden="true" />
          </a>
          . Desempenho conforme a tonalidade. Consulte medidas, disponibilidade
          e condições de garantia com a Retém.
        </p>
      </div>
    </section>
  );
}
