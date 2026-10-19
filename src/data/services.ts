import type { Category } from "@/types/store";

export const services: Category[] = [
  {
    id: "service-ppf",
    name: "PPF",
    slug: "ppf",
    description:
      "Uma película de proteção para preservar a pintura original contra o desgaste do dia a dia. Definimos as áreas de aplicação de acordo com o seu veículo e a sua rotina.",
    image: "/images/retem-ppf-real.webp",
    position: 0,
    active: true,
  },
  {
    id: "service-solar",
    name: "Películas solares",
    slug: "peliculas-solares",
    description:
      "Conforto térmico, controle de luminosidade e privacidade para o seu carro. Conheça as opções Origin Películas e escolha com orientação da nossa equipe.",
    image: "/images/retem-porsche-black.webp",
    position: 1,
    active: true,
  },
  {
    id: "service-ceramic",
    name: "Coat cerâmica e vitrificação",
    slug: "coat-ceramica",
    description:
      "Cuidado com a pintura com produtos Gyeon. Avaliamos o acabamento e indicamos o tratamento cerâmico e a manutenção para o seu veículo.",
    image: "/images/retem-porsche-black.webp",
    position: 2,
    active: true,
  },
  {
    id: "service-polish",
    name: "Polimento e cristalização",
    slug: "polimento-cristalizacao",
    description:
      "Tratamentos para recuperar o brilho e cuidar do acabamento. O processo começa com uma avaliação da pintura e das possibilidades de correção.",
    image: "/images/retem-workshop-real.webp",
    position: 3,
    active: true,
  },
  {
    id: "service-architecture",
    name: "Películas residenciais e comerciais",
    slug: "peliculas-arquitetonicas",
    description:
      "Controle solar para sua casa ou empresa. Avaliamos os vidros, a incidência de luz e as necessidades de conforto e privacidade para indicar a película.",
    image: "/images/retem-architecture-real.webp",
    position: 4,
    active: true,
  },
  {
    id: "service-headlights",
    name: "Polimento de faróis",
    slug: "polimento-farois",
    description:
      "Avaliamos o estado dos faróis para indicar o processo de recuperação do acabamento e da transparência das lentes.",
    image: "/images/retem-hero-real.webp",
    position: 5,
    active: true,
  },
];

export const serviceCaptions: Record<string, string> = {
  ppf: "Proteção de pintura",
  "peliculas-solares": "Conforto para dirigir",
  "coat-ceramica": "Gyeon · cuidado cerâmico",
  "polimento-cristalizacao": "Brilho e acabamento",
  "peliculas-arquitetonicas": "Conforto para viver e trabalhar",
  "polimento-farois": "Cuidado com as lentes",
};

export const serviceQuestions = [
  {
    question: "Qual serviço é indicado para o meu carro?",
    answer:
      "Conte para a equipe o modelo do veículo, como você o utiliza e o que deseja proteger ou melhorar. A indicação considera a condição da pintura e dos vidros, além do resultado que você procura.",
  },
  {
    question: "Vocês aplicam películas em casas e empresas?",
    answer:
      "Sim. Atendemos projetos residenciais e comerciais. Envie a localização, fotos e as medidas aproximadas dos vidros para iniciarmos a avaliação do seu ambiente.",
  },
  {
    question: "Quanto tempo demora e qual é a garantia?",
    answer:
      "O prazo de aplicação, a durabilidade e as condições de garantia dependem do material, da área e do serviço contratado. Nossa equipe informa esses detalhes no orçamento, junto com os cuidados de manutenção.",
  },
  {
    question: "Como solicitar um orçamento?",
    answer:
      "Use o formulário ou fale diretamente pelo WhatsApp (27) 99231-5115. Conte qual serviço procura e envie fotos do veículo ou do ambiente. Estamos na Rodovia do Sol, 1528, em Praia de Itaparica, Vila Velha.",
  },
];
