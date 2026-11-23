import type { Category, FilmPerformance, Product } from "@/types/store";

export const nevadaPerformanceSource = "https://bynevada.com/pelicula-solar/";

type NevadaLine = {
  slug: string;
  name: string;
  description: string;
  category: string;
  prices: [number, number, number, number];
  performance?: FilmPerformance;
  artwork: NonNullable<Product["artwork"]>;
};

const lengths = [
  { label: "1 metro", sku: "1M" },
  { label: "7,5 metros", sku: "7-5M" },
  { label: "15 metros", sku: "15M" },
  { label: "30 metros", sku: "30M" },
];

// Valores em centavos, na ordem: 1 m, 7,5 m, 15 m e 30 m.
const nevadaLines: NevadaLine[] = [
  {
    slug: "nevada-graphite-nano-ceramica-plus",
    name: "Nevada Graphite — Nano Cerâmica Plus",
    description: "Película Nevada Graphite da linha Nano Cerâmica Plus.",
    category: "peliculas-solares",
    prices: [7500, 56225, 112500, 225000],
    artwork: {
      headline: "Película",
      technology: "Nano cerâmica",
      edition: "Plus",
    },
    performance: {
      solar: 86,
      solarUpTo: true,
      infrared: 97,
      infraredUpTo: true,
      ultraviolet: 99,
      warranty: "10 anos",
    },
  },
  {
    slug: "nevada-nano-ceramica-standard",
    name: "Nevada — Nano Cerâmica Standard",
    description: "Película Nevada da linha Nano Cerâmica Standard.",
    category: "peliculas-solares",
    prices: [5000, 37500, 75000, 150000],
    artwork: {
      headline: "Película",
      technology: "Nano cerâmica",
      edition: "Standard",
    },
    performance: {
      solar: 65,
      solarUpTo: true,
      infrared: 72,
      infraredUpTo: true,
      ultraviolet: 99,
      warranty: "8 anos",
    },
  },
  {
    slug: "nevada-profissional",
    name: "Nevada — Profissional",
    description: "Película Nevada da linha Profissional.",
    category: "peliculas-solares",
    prices: [2200, 16500, 33000, 66000],
    artwork: { headline: "Película", technology: "Linha profissional" },
    performance: {
      solar: null,
      infrared: null,
      ultraviolet: null,
      warranty: null,
    },
  },
  {
    slug: "nevada-clear-ppf",
    name: "Nevada Clear — PPF",
    description: "Película de proteção de pintura da linha Nevada Clear.",
    category: "ppf",
    prices: [38000, 285000, 570000, 1140000],
    artwork: {
      headline: "Proteção de pintura",
      technology: "PPF",
      edition: "Clear",
    },
  },
  {
    slug: "nevada-ceramica-70",
    name: "Nevada Cerâmica 70% — garantia vitalícia",
    description: "Película Nevada Cerâmica 70% com garantia vitalícia.",
    category: "peliculas-solares",
    prices: [11000, 82500, 165000, 330000],
    artwork: {
      headline: "Película",
      technology: "Nano cerâmica",
      edition: "70%",
    },
    performance: {
      solar: null,
      infrared: null,
      ultraviolet: 99,
      warranty: "Vitalícia",
    },
  },
];

export function getNevadaProducts(categories: Category[]): Product[] {
  return nevadaLines.map((line) => {
    const category = categories.find((item) => item.slug === line.category);
    if (!category)
      throw new Error("Categoria das películas Nevada não encontrada.");

    return {
      id: line.slug,
      slug: line.slug,
      name: line.name,
      brand: "nevada",
      description: `${line.description} Selecione o comprimento para consultar o valor e adicionar ao pedido.`,
      technical: [
        "Venda por metro e em comprimentos de 7,5, 15 e 30 metros.",
        ...(line.performance?.solar != null
          ? [`Rejeição de energia solar: até ${line.performance.solar}%.`]
          : []),
        ...(line.performance?.infrared != null
          ? [`Retenção de raios IR: até ${line.performance.infrared}%.`]
          : []),
        ...(line.performance?.ultraviolet != null
          ? [`Proteção UV / UVR (UVA e UVB): ${line.performance.ultraviolet}%.`]
          : []),
        ...(line.performance?.warranty
          ? [`Garantia: ${line.performance.warranty}.`]
          : []),
        "Índices de referência da linha; variam conforme a tonalidade. Confirme largura, tonalidade, disponibilidade e condições de aplicação e garantia no atendimento.",
      ].join("\n"),
      performance: line.performance,
      artwork: line.artwork,
      categoryId: category.id,
      category,
      active: true,
      featured: true,
      images: [
        {
          url: `/images/nevada/${line.slug}.webp`,
          alt: `${line.name} — composição ilustrativa com carro esportivo e iluminação ciano`,
          position: 0,
        },
        {
          url: category.image,
          alt: `${line.name} — imagem ilustrativa de aplicação`,
          position: 1,
        },
      ],
      variants: lengths.map((length, index) => ({
        id: `${line.slug}-${length.sku.toLowerCase()}`,
        name: length.label,
        sku: `${line.slug.toUpperCase()}-${length.sku}`,
        attributes: { Comprimento: length.label },
        priceCents: line.prices[index],
        active: true,
        inventory: { available: true, quantity: null },
      })),
    };
  });
}
