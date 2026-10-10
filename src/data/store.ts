import type { Category, Product, Settings } from "@/types/store";

export const settings: Settings = {
  name: "Nevada | Distribuidora",
  logo: "/images/nevada-logo-2026.png",
  whatsapp: "558186020710",
  email: "",
  instagram: "",
  address: "",
  hours: "",
  heroTitle: "Proteção em sua melhor forma.",
  heroDescription: "",
  heroImage: "/images/hero-car-cutout.png",
  aboutText:
    "Monte sua seleção de produtos e encaminhe uma solicitação. Disponibilidade, frete e pagamento são confirmados durante o atendimento.",
  postalCodeRequired: false,
  demoMode: true,
};

export const categories: Category[] = [
  {
    id: "cmv1n3xbt000048tbnzd6nj7h",
    name: "PPF",
    slug: "ppf",
    description: "Proteção de pintura",
    image: "/images/lines/ppf-application.webp",
    position: 0,
    active: true,
  },
  {
    id: "cmv1n3xbx000148tbynrtbf1g",
    name: "Nevada Color",
    slug: "nevada-color",
    description: "Cor e proteção",
    image: "/images/lines/color-finish.webp",
    position: 1,
    active: true,
  },
  {
    id: "cmv1n3xby000248tb1cnqh9oy",
    name: "Películas solares",
    slug: "peliculas-solares",
    description: "Conforto para dirigir",
    image: "/images/lines/solar-film.webp",
    position: 2,
    active: true,
  },
  {
    id: "cmv1n3xbz000348tb4qzw996t",
    name: "Películas de segurança",
    slug: "peliculas-seguranca",
    description: "Proteção para os vidros",
    image: "/images/lines/security-film.webp",
    position: 3,
    active: true,
  },
  {
    id: "cmv1n3xc0000448tbyhz7646o",
    name: "Proteção de para-brisa",
    slug: "protecao-para-brisa",
    description: "Visibilidade e proteção",
    image: "/images/lines/windshield-film.webp",
    position: 4,
    active: true,
  },
  {
    id: "cmv1n3xc0000548tbmwofmakd",
    name: "Produtos de aplicação",
    slug: "produtos-aplicacao",
    description: "Precisão na bancada",
    image: "/images/lines/application-products.webp",
    position: 5,
    active: true,
  },
];

export const products: Product[] = [
  {
    id: "cmv1n3xd8000u48tbikwtmk9d",
    slug: "nevada-layer-seal",
    name: "Nevada Layer Seal",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xc0000548tbmwofmakd",
    active: true,
    featured: false,
    category: {
      id: "cmv1n3xc0000548tbmwofmakd",
      name: "Produtos de aplicação",
      slug: "produtos-aplicacao",
      description: "Precisão na bancada",
      image: "/images/lines/application-products.webp",
      position: 5,
      active: true,
    },
    images: [
      {
        url: "/images/layer-seal.png",
        alt: "Nevada Layer Seal",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xd9000w48tbq30hgc85",
        name: "Embalagem de demonstração",
        sku: "DEMO-7",
        attributes: {
          Linha: "Layer",
        },
        priceCents: null,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
  {
    id: "cmv1n3xd4000q48tbcz2arv5z",
    slug: "nevada-layer-prepare",
    name: "Nevada Layer Prepare",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xc0000548tbmwofmakd",
    active: true,
    featured: false,
    category: {
      id: "cmv1n3xc0000548tbmwofmakd",
      name: "Produtos de aplicação",
      slug: "produtos-aplicacao",
      description: "Precisão na bancada",
      image: "/images/lines/application-products.webp",
      position: 5,
      active: true,
    },
    images: [
      {
        url: "/images/layer-prepare.png",
        alt: "Nevada Layer Prepare",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xd5000s48tbf1tdec4c",
        name: "Embalagem de demonstração",
        sku: "DEMO-6",
        attributes: {
          Linha: "Layer",
        },
        priceCents: 9990,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
  {
    id: "cmv1n3xcz000m48tbumems8qa",
    slug: "nevada-layer-solution",
    name: "Nevada Layer Solution",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xc0000548tbmwofmakd",
    active: true,
    featured: false,
    category: {
      id: "cmv1n3xc0000548tbmwofmakd",
      name: "Produtos de aplicação",
      slug: "produtos-aplicacao",
      description: "Precisão na bancada",
      image: "/images/lines/application-products.webp",
      position: 5,
      active: true,
    },
    images: [
      {
        url: "/images/layer-solution.png",
        alt: "Nevada Layer Solution",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xd2000o48tbghrcwjj1",
        name: "Embalagem de demonstração",
        sku: "DEMO-5",
        attributes: {
          Linha: "Layer",
        },
        priceCents: 8990,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
  {
    id: "cmv1n3xcv000i48tbs4vvbjb7",
    slug: "nevada-layer-gel",
    name: "Nevada Layer Gel",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xc0000548tbmwofmakd",
    active: true,
    featured: true,
    category: {
      id: "cmv1n3xc0000548tbmwofmakd",
      name: "Produtos de aplicação",
      slug: "produtos-aplicacao",
      description: "Precisão na bancada",
      image: "/images/lines/application-products.webp",
      position: 5,
      active: true,
    },
    images: [
      {
        url: "/images/layer-gel.png",
        alt: "Nevada Layer Gel",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xcw000k48tb10ewnimt",
        name: "Embalagem de demonstração",
        sku: "DEMO-4",
        attributes: {
          Linha: "Layer",
        },
        priceCents: 14990,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
  {
    id: "cmv1n3xcs000e48tbqpm8vdmy",
    slug: "ppf-nevada-satin",
    name: "PPF Nevada Satin",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xbt000048tbnzd6nj7h",
    active: true,
    featured: true,
    category: {
      id: "cmv1n3xbt000048tbnzd6nj7h",
      name: "PPF",
      slug: "ppf",
      description: "Proteção de pintura",
      image: "/images/lines/ppf-application.webp",
      position: 0,
      active: true,
    },
    images: [
      {
        url: "/images/ppf-satin.webp",
        alt: "PPF Nevada Satin",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xcu000g48tbgsxcqbq3",
        name: "Satin • amostra de cadastro",
        sku: "DEMO-3",
        attributes: {
          Acabamento: "Acetinado",
        },
        priceCents: null,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
  {
    id: "cmv1n3xco000a48tb9iecs2fl",
    slug: "ppf-nevada-black",
    name: "PPF Nevada Black",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xbt000048tbnzd6nj7h",
    active: true,
    featured: true,
    category: {
      id: "cmv1n3xbt000048tbnzd6nj7h",
      name: "PPF",
      slug: "ppf",
      description: "Proteção de pintura",
      image: "/images/lines/ppf-application.webp",
      position: 0,
      active: true,
    },
    images: [
      {
        url: "/images/ppf-black.webp",
        alt: "PPF Nevada Black",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xcp000c48tboz87svyu",
        name: "Black • amostra de cadastro",
        sku: "DEMO-2",
        attributes: {
          Acabamento: "Black Piano",
        },
        priceCents: 219900,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
  {
    id: "cmv1n3xch000648tbipj8nul2",
    slug: "ppf-nevada-gloss",
    name: "PPF Nevada Gloss",
    description:
      "Produto de demonstração para testar a seleção e o atendimento. O nome da linha é referenciado no site do fabricante; preços, embalagens e estoque deste cadastro são ilustrativos.",
    technical:
      "Cadastro de desenvolvimento. Substitua pela ficha técnica aprovada e configure as medidas e apresentações reais antes de publicar.",
    categoryId: "cmv1n3xbt000048tbnzd6nj7h",
    active: true,
    featured: true,
    category: {
      id: "cmv1n3xbt000048tbnzd6nj7h",
      name: "PPF",
      slug: "ppf",
      description: "Proteção de pintura",
      image: "/images/lines/ppf-application.webp",
      position: 0,
      active: true,
    },
    images: [
      {
        url: "/images/ppf-gloss.webp",
        alt: "PPF Nevada Gloss",
        position: 0,
      },
    ],
    variants: [
      {
        id: "cmv1n3xck000848tb65jh1omg",
        name: "Gloss • amostra de cadastro",
        sku: "DEMO-1",
        attributes: {
          Acabamento: "Brilhante",
        },
        priceCents: 189900,
        active: true,
        inventory: {
          available: true,
          quantity: 20,
        },
      },
    ],
  },
];
