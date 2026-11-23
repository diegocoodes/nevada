import type { Category, FilmPerformance, Product } from "@/types/store";

export const originSource = "https://originfilms.com.br/nossas-peliculas/";

type OriginLine = {
  slug: string;
  name: string;
  technology: string;
  description: string;
  tones: number[];
  solar: number | null;
  infrared: number | null;
  ultraviolet: number | null;
  warranty: string;
  warrantyDetails?: string;
  prices: [number, number, number, number] | null;
  image?: string;
  artwork: NonNullable<Product["artwork"]>;
};

const lengths = [
  { label: "1 metro", sku: "1M" },
  { label: "7,5 metros", sku: "7-5M" },
  { label: "15 metros", sku: "15M" },
  { label: "30 metros", sku: "30M" },
];

export const originLines: OriginLine[] = [
  {
    slug: "origin",
    name: "Origin 7090",
    artwork: {
      headline: "Película",
      technology: "Nano cerâmica",
      edition: "7090",
    },
    technology: "Nanocerâmica · Transparência",
    description:
      "Conforto térmico com um visual discreto e alta transparência para os vidros.",
    tones: [70],
    solar: 47,
    infrared: 94,
    ultraviolet: 99,
    warranty: "Vitalícia",
    warrantyDetails: "Vitalícia no automotivo; 10 anos no arquitetônico.",
    prices: [11000, 82500, 165000, 330000],
  },
  {
    slug: "origin-black",
    name: "Origin Black — Nano Cerâmica",
    artwork: {
      headline: "Película",
      technology: "Nano cerâmica",
      edition: "Black",
    },
    technology: "Nanocerâmica · Privacidade",
    description:
      "Diferentes tonalidades para combinar privacidade, clareza de visão e controle do calor.",
    tones: [5, 20, 35, 50],
    solar: 63,
    infrared: 94,
    ultraviolet: 99,
    warranty: "Vitalícia",
    warrantyDetails: "Vitalícia no automotivo; 10 anos no arquitetônico.",
    prices: [7500, 56225, 112500, 225000],
  },
  {
    slug: "origin-carbon",
    name: "Origin Carbono",
    artwork: {
      headline: "Película",
      technology: "Nanocarbono",
      edition: "Carbono",
    },
    technology: "Nanocarbono · Conforto",
    description:
      "Tecnologia de carbono para reduzir o calor e ajustar a luminosidade ao seu projeto.",
    tones: [5, 20, 35, 50],
    solar: 46,
    infrared: 55,
    ultraviolet: 99,
    warranty: "10 anos",
    warrantyDetails: "Para uso automotivo e arquitetônico.",
    prices: [4000, 30000, 60000, 120000],
  },
  {
    slug: "origin-maxx-protection",
    name: "Origin Max Protection",
    artwork: {
      headline: "Segurança PS4 MIL",
      technology: "Nano cerâmica",
      edition: "Max Protection",
    },
    technology: "Nanocerâmica · Segurança PS4 MIL",
    description:
      "Uma camada adicional de resistência para os vidros, aliada à proteção solar.",
    tones: [5, 20, 35],
    solar: 63,
    infrared: 92,
    ultraviolet: 99,
    warranty: "Vitalícia",
    warrantyDetails: "Vitalícia no automotivo; 10 anos no arquitetônico.",
    prices: [12000, 90000, 180000, 360000],
  },
  {
    slug: "origin-gts",
    name: "Origin GTS",
    artwork: { headline: "Película", technology: "Híbrida", edition: "GTS" },
    technology: "Híbrida · Multicamadas",
    description:
      "Cerâmica e liga metálica combinadas para alto desempenho térmico e estabilidade de cor.",
    tones: [10, 20, 35, 50],
    solar: 78,
    infrared: 95,
    ultraviolet: 100,
    warranty: "Vitalícia",
    warrantyDetails: "Vitalícia no automotivo; 10 anos no arquitetônico.",
    prices: [15000, 112500, 225000, 450000],
  },
  {
    slug: "origin-reflect",
    name: "Origin Reflect",
    artwork: {
      headline: "Película",
      technology: "Refletiva",
      edition: "Reflect",
    },
    technology: "Nanocerâmica · Refletiva",
    description:
      "Acabamento refletivo com tecnologia multicamadas para projetos que pedem elevada rejeição solar.",
    tones: [5, 10],
    solar: 91,
    infrared: 99,
    ultraviolet: 100,
    warranty: "Vitalícia no automotivo; 10 anos no arquitetônico.",
    warrantyDetails: "Vitalícia no automotivo; 10 anos no arquitetônico.",
    prices: null,
  },
  {
    slug: "origin-profissional",
    name: "Profissional",
    artwork: {
      headline: "Película",
      technology: "Linha",
      edition: "Profissional",
    },
    technology: "Película profissional",
    description:
      "Película da linha Profissional, disponível por metro e em comprimentos de 7,5, 15 e 30 metros.",
    tones: [],
    solar: null,
    infrared: null,
    ultraviolet: null,
    warranty: "5 anos",
    prices: [2000, 16500, 33000, 60000],
    image: "/images/lines/solar-film.webp",
  },
];

export function getOriginPerformance(line: OriginLine): FilmPerformance {
  return {
    solar: line.solar,
    solarUpTo: true,
    infrared: line.infrared,
    ultraviolet: line.ultraviolet,
    warranty: line.slug === "origin-reflect" ? "Vitalícia" : line.warranty,
    warrantyDetails: line.warrantyDetails,
  };
}

export function getOriginProducts(categories: Category[]): Product[] {
  return originLines.map((line) => {
    const category = categories.find(
      (item) =>
        item.slug ===
        (line.slug === "origin-maxx-protection"
          ? "peliculas-seguranca"
          : "peliculas-solares"),
    );
    if (!category)
      throw new Error("Categoria das películas Origin não encontrada.");
    return {
      id: line.slug,
      slug: line.slug,
      name: line.name,
      brand: "origin",
      description: line.description,
      technical: [
        `${line.technology}.`,
        ...(line.solar !== null
          ? [`Rejeição de energia solar: até ${line.solar}%.`]
          : []),
        ...(line.infrared !== null
          ? [`Rejeição de infravermelho: ${line.infrared}%.`]
          : []),
        ...(line.ultraviolet !== null
          ? [`Proteção UV / UVR (UVA e UVB): ${line.ultraviolet}%.`]
          : []),
        `Garantia: ${line.warranty}.`,
        ...(line.warrantyDetails ? [line.warrantyDetails] : []),
        "Consulte as condições da garantia, a ficha da tonalidade, a largura e a disponibilidade no atendimento.",
      ].join("\n"),
      performance: getOriginPerformance(line),
      artwork: line.artwork,
      categoryId: category.id,
      category,
      active: true,
      featured: false,
      images: [
        {
          url: `/images/origin/campaigns/${line.slug}.webp`,
          alt: `${line.name} — composição ilustrativa com carro e iluminação cobre`,
          position: 0,
        },
        {
          url: line.image ?? `/images/origin/${line.slug}.webp`,
          alt: `${line.name} — imagem ilustrativa de apresentação`,
          position: 1,
        },
      ],
      variants: (line.tones.length ? line.tones : [null]).flatMap((tone) => {
        const baseId = tone !== null ? `${line.slug}-${tone}` : line.slug;
        const toneAttributes: Record<string, string> =
          tone !== null ? { Tonalidade: `${tone}%` } : {};
        const options = line.prices ? lengths : [null];
        return options.map((length, index) => ({
          // Preserve os IDs das tonalidades existentes na opção de 1 metro.
          id:
            length && index > 0
              ? `${baseId}-${length.sku.toLowerCase()}`
              : baseId,
          name: [
            ...(tone !== null ? [`Tonalidade ${tone}%`] : []),
            ...(length ? [length.label] : []),
          ].join(" · "),
          sku: `${baseId.toUpperCase()}${length ? `-${length.sku}` : ""}`,
          attributes: {
            ...toneAttributes,
            ...(length ? { Comprimento: length.label } : {}),
            Tecnologia: line.technology,
            Garantia: line.warranty,
          },
          priceCents: line.prices ? line.prices[index] : null,
          active: true,
          inventory: { available: true, quantity: null },
        }));
      }),
    };
  });
}
