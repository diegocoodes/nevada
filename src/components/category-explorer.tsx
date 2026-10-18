"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Category } from "@/types/store";
import {
  SlantedImageClip,
  SlantedImageOutline,
} from "@/components/ui/slanted-image-clip";

const descriptions: Record<string, string> = {
  ppf: "Películas para preservar a pintura e explorar diferentes acabamentos. Encontre a opção para o seu próximo projeto.",
  "nevada-color":
    "Cor e acabamento para dar uma nova expressão ao seu projeto. Explore as possibilidades da linha Nevada Color.",
  "peliculas-solares":
    "Conheça as opções para os vidros e escolha a linha que acompanha a sua rotina.",
  "peliculas-seguranca":
    "Explore a linha de películas de segurança e consulte as opções para a sua aplicação.",
  "protecao-para-brisa":
    "Conheça a linha voltada ao para-brisa e encontre a opção para o seu projeto.",
  "produtos-aplicacao":
    "Da preparação ao acabamento, encontre produtos para acompanhar cada etapa da aplicação.",
};

export function CategoryExplorer({
  categories,
  services = false,
}: {
  categories: Category[];
  services?: boolean;
}) {
  const id = useId();
  const [selectedId, setSelectedId] = useState(
    () =>
      categories.find((category) => category.slug === "ppf")?.id ??
      categories[0]?.id,
  );
  const selected =
    categories.find((category) => category.id === selectedId) ?? categories[0];

  if (!selected) return null;

  const previewId = `${id}-preview`;
  const clipId = `${id}-image-clip`;

  return (
    <div className="lines-explorer">
      <ul
        className="lines-list"
        aria-label={services ? "Serviços Retém" : "Linhas da distribuidora"}
      >
        {categories.map((category) => {
          const active = selected.id === category.id;
          const buttonId = `${id}-button-${category.id}`;
          const detailsId = `${id}-details-${category.id}`;
          return (
            <li
              key={category.id}
              className="lines-option"
              data-selected={active}
            >
              <h3 className="lines-option-heading">
                <button
                  id={buttonId}
                  type="button"
                  className="lines-option-button"
                  aria-pressed={active}
                  aria-controls={`${detailsId} ${previewId}`}
                  onClick={() => setSelectedId(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="lines-option-indicator" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </button>
              </h3>
              <div
                id={detailsId}
                className="lines-option-details"
                role="region"
                aria-labelledby={buttonId}
                hidden={!active}
              >
                <p className="lines-option-caption">
                  {services
                    ? category.slug === "ppf"
                      ? "Proteção de pintura"
                      : "Conforto para dirigir"
                    : category.description}
                </p>
                <p className="lines-option-description">
                  {(services
                    ? category.description
                    : descriptions[category.slug]) ??
                    "Explore os produtos desta linha e encontre a solução para a sua aplicação."}
                </p>
                <Link
                  href={
                    services
                      ? `/contato?servico=${encodeURIComponent(category.name)}`
                      : `/produtos?categoria=${encodeURIComponent(category.slug)}`
                  }
                  className="lines-option-link"
                  aria-label={
                    services
                      ? `Consultar ${category.name}`
                      : `Explorar a linha ${category.name}`
                  }
                >
                  {services
                    ? "Quero cuidar do meu carro"
                    : "Explorar esta linha"}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        id={previewId}
        className="lines-preview"
        aria-live="polite"
        aria-atomic="true"
      >
        <SlantedImageClip id={clipId} />
        <div
          className="lines-preview-image"
          style={{ clipPath: `url(#${clipId})` }}
          data-image={selected.slug}
        >
          <Image
            key={selected.id}
            src={selected.image}
            alt={selected.name}
            fill
            sizes="(max-width: 800px) 100vw, (max-width: 1200px) 55vw, 640px"
          />
          <SlantedImageOutline id={clipId} />
        </div>
      </div>
    </div>
  );
}
