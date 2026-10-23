import type { Category, Product } from "@/types/store";

export const originSource = "https://originfilms.com.br/nossas-peliculas/";

export const originLines = [
  {
    slug: "origin",
    name: "Origin",
    technology: "Nanocerâmica · Transparência",
    description:
      "Conforto térmico com um visual discreto e alta transparência para os vidros.",
    tones: [70],
    solar: 47,
    infrared: 94,
    warranty: "Vitalícia no automotivo; 10 anos no arquitetônico.",
  },
  {
    slug: "origin-black",
    name: "Origin Black",
    technology: "Nanocerâmica · Privacidade",
    description:
      "Diferentes tonalidades para combinar privacidade, clareza de visão e controle do calor.",
    tones: [5, 20, 35, 50],
    solar: 63,
    infrared: 94,
    warranty: "Vitalícia no automotivo; 10 anos no arquitetônico.",
  },
  {
    slug: "origin-carbon",
    name: "Origin Carbon",
    technology: "Nanocarbono · Conforto",
    description:
      "Tecnologia de carbono para reduzir o calor e ajustar a luminosidade ao seu projeto.",
    tones: [5, 20, 35, 50],
    solar: 46,
    infrared: 55,
    warranty: "10 anos no automotivo e no arquitetônico.",
  },
  {
    slug: "origin-maxx-protection",
    name: "Origin Maxx Protection",
    technology: "Nanocerâmica · Segurança PS4 MIL",
    description:
      "Uma camada adicional de resistência para os vidros, aliada à proteção solar.",
    tones: [5, 20, 35],
    solar: 63,
    infrared: 92,
    warranty: "Vitalícia no automotivo; 10 anos no arquitetônico.",
  },
  {
    slug: "origin-gts",
    name: "Origin GTS",
    technology: "Híbrida · Multicamadas",
    description:
      "Cerâmica e liga metálica combinadas para alto desempenho térmico e estabilidade de cor.",
    tones: [10, 20, 35, 50],
    solar: 78,
    infrared: 95,
    warranty: "Vitalícia no automotivo; 10 anos no arquitetônico.",
  },
  {
    slug: "origin-reflect",
    name: "Origin Reflect",
    technology: "Nanocerâmica · Refletiva",
    description:
      "Acabamento refletivo com tecnologia multicamadas para projetos que pedem elevada rejeição solar.",
    tones: [5, 10],
    solar: 91,
    infrared: 99,
    warranty: "Vitalícia no automotivo; 10 anos no arquitetônico.",
  },
];

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
      technical: `${line.technology}.\nRejeição de energia solar: até ${line.solar}%.\nRejeição de infravermelho: ${line.infrared}%.\nGarantia informada pelo fabricante: ${line.warranty}\nConsulte as condições da garantia, a ficha da tonalidade e as medidas no atendimento.`,
      categoryId: category.id,
      category,
      active: true,
      featured: false,
      images: [
        {
          url: `/images/origin/${line.slug}.webp`,
          alt: `${line.name} — imagem de apresentação da Origin Films`,
          position: 0,
        },
      ],
      variants: line.tones.map((tone) => ({
        id: `${line.slug}-${tone}`,
        name: `Tonalidade ${tone}%`,
        sku: `${line.slug.toUpperCase()}-${tone}`,
        attributes: { Tonalidade: `${tone}%`, Tecnologia: line.technology },
        priceCents: null,
        active: true,
        inventory: { available: true, quantity: null },
      })),
    };
  });
}
