import { AnimatedText } from "@/components/animated-text";
import { LandingPage } from "@/components/landing-page";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Check,
  SlidersHorizontal,
  ShoppingBag,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { getSettings, getCategories, getProducts } from "@/lib/store-data";
import { contactUrl } from "@/lib/utils";
import { Reveal } from "@/components/reveal";
import { CategoryExplorer } from "@/components/category-explorer";
import { ProductCard } from "@/components/product-card";
import { OriginLines } from "@/components/origin-lines";

export const metadata: Metadata = {
  title: "Loja Distribuidora | Nevada Films e Origin Películas",
  description:
    "Retém Loja Distribuidora. Explore Nevada Films e consulte a linha Origin Películas. Selecione produtos e continue seu atendimento pelo WhatsApp.",
  alternates: { canonical: "/distribuidora" },
};

const steps = [
  {
    icon: SlidersHorizontal,
    title: "Encontre sua linha.",
    description:
      "Explore as categorias e escolha os produtos para a superfície que você quer proteger.",
    action: "Explorar o catálogo",
    href: "/produtos",
  },
  {
    icon: ShoppingBag,
    title: "Monte sua seleção.",
    description:
      "Escolha a variação, defina a quantidade e reúna seus produtos no carrinho.",
    action: "Revisar meu pedido",
    href: "/checkout",
  },
  {
    icon: MessageCircle,
    title: "Converse com a Retém.",
    description:
      "Confirme disponibilidade, frete e condições de pagamento diretamente com nossa equipe.",
    action: "Falar com a distribuidora",
    href: "whatsapp",
  },
];

const benefits = [
  {
    title: "Duas marcas. Mais possibilidades.",
    text: "Nevada Films e Origin Películas em um só lugar para você encontrar a solução para sua aplicação.",
  },
  {
    title: "Da proteção ao acabamento.",
    text: "Explore PPF, películas e os produtos que acompanham cada etapa do seu projeto.",
  },
  {
    title: "Uma conversa que faz diferença.",
    text: "Tire suas dúvidas e confirme linhas, medidas e disponibilidade diretamente com a Retém.",
  },
];

const questions = [
  {
    title: "Como faço meu pedido?",
    text: "Escolha os produtos no catálogo, selecione as variações e adicione ao carrinho. Ao continuar, você informa seus dados e abre uma conversa no WhatsApp com o resumo da seleção. A equipe confirma as condições antes de concluir o pedido.",
  },
  {
    title: "Onde encontro os produtos da Origin?",
    text: "A Origin Películas tem uma área de consulta no catálogo. Entre em contato com a Retém para conhecer as linhas, as medidas e a disponibilidade para seu projeto.",
  },
  {
    title: "Como consulto frete e pagamento?",
    text: "As condições de envio e pagamento são combinadas diretamente no atendimento. Envie sua seleção pelo WhatsApp para receber as informações do seu pedido.",
  },
  {
    title: "Também posso agendar uma aplicação no meu carro?",
    text: "Sim. A Retém Estética Premium é a área dedicada ao cuidado do seu carro, com foco em PPF e películas. Acesse a estética pelo menu ou fale com nossa equipe.",
  },
];

export default async function Distributor() {
  const [settings, categories, products] = await Promise.all([
    getSettings(),
    getCategories(),
    getProducts(),
  ]);
  return (
    <LandingPage className="distributor-landing">
      <section
        className="campaign-hero distributor-campaign-hero"
        aria-labelledby="distributor-hero-title"
      >
        <div className="campaign-hero-visual">
          <Image
            className="hero-photo"
            src="/images/retem-ppf-real.webp"
            alt="Aplicação profissional de película de proteção sobre um esportivo"
            fill
            preload
            sizes="(max-width: 760px) 100vw, 75vw"
          />
        </div>
        <div className="container campaign-hero-inner">
          <div className="campaign-hero-copy">
            <p className="campaign-kicker">RETÉM LOJA DISTRIBUIDORA</p>
            <h1 id="distributor-hero-title">
              <AnimatedText text="Seu melhor acabamento." />
              <br />
              <span>
                <AnimatedText text="Começa na escolha." />
              </span>
            </h1>
            <p>
              Nevada Films e Origin Películas. Da primeira camada ao último
              detalhe, encontre os produtos para o seu próximo acabamento.
            </p>
            <Link href="/produtos" className="campaign-button">
              Explorar os produtos <ArrowUpRight size={20} />
            </Link>
            <a className="campaign-hero-explore" href="#distributor-benefits">
              Conheça a distribuidora <ArrowDown size={15} />
            </a>
            <span className="campaign-hero-location">
              NEVADA FILMS · ORIGIN PELÍCULAS
            </span>
          </div>
        </div>
      </section>
      <a href="#linhas" className="campaign-ribbon">
        Material para o seu próximo grande projeto.
        <span>
          <ChevronDown size={18} aria-hidden="true" />
        </span>
      </a>
      <div className="distributor-campaign-body">
        <section
          id="distributor-benefits"
          className="section dl-benefits"
          aria-labelledby="benefits-title"
        >
          <div className="container dl-benefit-grid">
            <Reveal className="dl-benefit-art" direction="left">
              <Image
                src="/images/retem-workshop-real.webp"
                alt="Aplicação de película de proteção na pintura de um carro em oficina"
                fill
                sizes="(max-width: 800px) 100vw, 520px"
              />
              <span className="dl-photo-tag">PRECISÃO EM CADA CAMADA.</span>
            </Reveal>
            <Reveal className="dl-benefit-copy" direction="right">
              <p className="eyebrow">PARA QUEM VIVE DE CUIDAR</p>
              <h2 id="benefits-title">
                <AnimatedText text="O seu melhor acabamento" />
                <br />
                <span>
                  <AnimatedText text="começa na escolha." />
                </span>
              </h2>
              <ul>
                {benefits.map(({ title, text }) => (
                  <li key={title}>
                    <span className="dl-check">
                      <Check size={17} />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/produtos" className="button button-primary">
                Encontre sua próxima linha <ArrowUpRight size={20} />
              </Link>
            </Reveal>
          </div>
        </section>

        <div className="dl-material-strip" aria-label="Linhas de produtos">
          <div className="container">
            <span>
              <i /> PPF
            </span>
            <span>
              <i /> PELÍCULAS SOLARES
            </span>
            <span>
              <i /> NEVADA FILMS
            </span>
            <span>
              <i /> ORIGIN PELÍCULAS
            </span>
            <span>
              <i /> PRODUTOS DE APLICAÇÃO
            </span>
          </div>
        </div>

        <section
          className="section container purchase-section dl-purchase"
          aria-labelledby="purchase-title"
        >
          <Reveal className="section-intro">
            <p className="eyebrow">DO CATÁLOGO À SUA BANCADA</p>
            <h2 id="purchase-title">
              <AnimatedText text="Seu próximo pedido." />
              <br />
              <span>
                <AnimatedText text="Sem complicar." />
              </span>
            </h2>
            <p>Você escolhe online. A Retém continua a conversa.</p>
          </Reveal>
          <p className="mobile-carousel-hint">
            Deslize para conhecer os passos <ArrowUpRight size={16} />
          </p>
          <Reveal
            stagger
            className="purchase-grid"
            role="region"
            aria-label="Passos para fazer seu pedido"
            tabIndex={0}
          >
            {steps.map(({ icon: Icon, title, description, action, href }) => (
              <article className="purchase-card" key={title}>
                <div className="purchase-number">
                  <Icon size={26} />
                </div>
                <div className="purchase-service">
                  <h3>{title}</h3>
                </div>
                <p className="purchase-description">{description}</p>
                <Link
                  className="purchase-card-link"
                  href={
                    href === "whatsapp" ? contactUrl(settings.whatsapp) : href
                  }
                >
                  <span>{action}</span>
                  <ArrowUpRight size={17} />
                </Link>
              </article>
            ))}
          </Reveal>
          <div className="dl-section-action">
            <Link href="/produtos" className="button button-primary">
              Começar minha seleção <ArrowUpRight size={20} />
            </Link>
          </div>
        </section>

        <section
          className="section dl-brands-section"
          aria-labelledby="brands-title"
        >
          <div className="container">
            <Reveal className="section-intro">
              <p className="eyebrow">AS MARCAS QUE ACOMPANHAM SEU TRABALHO</p>
              <h2 id="brands-title">
                <AnimatedText text="Duas marcas." />
                <br />
                <span>
                  <AnimatedText text="Um novo nível de cuidado." />
                </span>
              </h2>
              <p>
                Explore o catálogo Nevada e conheça as possibilidades da Origin
                com nossa equipe.
              </p>
            </Reveal>
            <div
              className="distributor-brands"
              role="region"
              aria-label="Marcas distribuídas"
            >
              <Link
                href="/produtos?marca=nevada"
                className="distributor-brand-card"
              >
                <span className="eyebrow">EXPLORE O CATÁLOGO</span>
                <Image
                  src="/images/nevada-logo-2026.png"
                  alt="Nevada Films"
                  width={982}
                  height={182}
                />
                <p>
                  Proteção para a pintura, soluções para os vidros e cuidado na
                  aplicação.
                </p>
                <ul>
                  <li>
                    <Check size={15} /> PPF e acabamentos
                  </li>
                  <li>
                    <Check size={15} /> Películas automotivas
                  </li>
                  <li>
                    <Check size={15} /> Linha de aplicação Nevada Layer
                  </li>
                </ul>
                <span className="distributor-brand-description">
                  Conhecer Nevada Films
                  <ArrowUpRight size={24} />
                </span>
              </Link>
              <Link
                href="/produtos?marca=origin"
                className="distributor-brand-card origin-brand-card"
              >
                <span className="eyebrow">CONHEÇA AS SEIS LINHAS</span>
                <span className="origin-wordmark">
                  ORIGIN<span>PELÍCULAS</span>
                </span>
                <p>
                  Nanocerâmica, carbono e proteção para encontrar o conforto do
                  seu próximo projeto.
                </p>
                <ul>
                  <li>
                    <Check size={15} /> Origin, Black e Carbon
                  </li>
                  <li>
                    <Check size={15} /> Maxx Protection, GTS e Reflect
                  </li>
                  <li>
                    <Check size={15} /> Confira a disponibilidade
                  </li>
                </ul>
                <span className="distributor-brand-description">
                  Conhecer Origin Películas
                  <ArrowUpRight size={24} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <OriginLines whatsapp={settings.whatsapp} />

        <section
          id="linhas"
          className="section lines-section"
          aria-labelledby="lines-title"
        >
          <div className="container">
            <Reveal className="section-intro">
              <p className="eyebrow">
                ESCOLHA A SUPERFÍCIE. EXPLORE A SOLUÇÃO.
              </p>
              <h2 id="lines-title">
                <AnimatedText text="Cada projeto tem sua linha." />
                <br />
                <span>
                  <AnimatedText text="Encontre a sua." />
                </span>
              </h2>
              <p>
                Da pintura aos vidros, conheça as possibilidades para a sua
                aplicação.
              </p>
            </Reveal>
            <CategoryExplorer categories={categories} />
          </div>
        </section>

        <section
          className="section featured-section"
          aria-labelledby="featured-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  DO PREPARO AO ÚLTIMO DETALHE / NEVADA LAYER
                </p>
                <h2 id="featured-title">
                  <AnimatedText text="Na sua bancada." />
                  <br />
                  <span>
                    <AnimatedText text="No seu próximo projeto." />
                  </span>
                </h2>
              </div>
              <Link className="link-arrow" href="/produtos">
                Ver todos os produtos <ArrowUpRight size={20} />
              </Link>
            </div>
            <p className="mobile-carousel-hint">
              Deslize para ver os produtos <ArrowUpRight size={16} />
            </p>
            <Reveal
              stagger
              className="product-grid"
              role="region"
              aria-label="Produtos em destaque"
              tabIndex={0}
            >
              {products
                .filter(
                  (product) => product.category.slug === "produtos-aplicacao",
                )
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </Reveal>
          </div>
        </section>

        <section className="section dl-faq" aria-labelledby="faq-title">
          <div className="container dl-faq-grid">
            <div>
              <p className="eyebrow">ANTES DO PRÓXIMO PASSO</p>
              <h2 id="faq-title">
                <AnimatedText text="Tudo começa" />
                <br />
                <span>
                  <AnimatedText text="sem dúvidas." />
                </span>
              </h2>
              <p>
                Precisa de mais alguma orientação?
                <br />A nossa equipe está por aqui.
              </p>
              <a href={contactUrl(settings.whatsapp)} className="link-arrow">
                Fale com a Retém <ArrowUpRight size={20} />
              </a>
            </div>
            <div className="dl-faq-list">
              {questions.map(({ title, text }) => (
                <details key={title}>
                  <summary>
                    {title}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="distributor-help dl-final">
          <div className="container">
            <div className="dl-final-brand">
              <Image
                src="/images/retem-re.svg"
                alt="RE — Retém Loja Distribuidora"
                width={820}
                height={360}
              />
              <span>LOJA DISTRIBUIDORA</span>
            </div>
            <p className="eyebrow">SEU PRÓXIMO ACABAMENTO COMEÇA AQUI</p>
            <h2>
              <AnimatedText text="Quem cuida de cada detalhe" />
              <br />
              <span>
                <AnimatedText text="merece uma boa escolha." />
              </span>
            </h2>
            <a
              className="button button-primary"
              href={contactUrl(settings.whatsapp)}
            >
              Falar com a distribuidora <ArrowUpRight size={20} />
            </a>
            <Link href="/retem" className="distributor-back">
              Quer cuidar do seu carro? Conheça a estética{" "}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </LandingPage>
  );
}
