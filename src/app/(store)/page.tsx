import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Droplets,
  ShoppingBag,
  SlidersHorizontal,
  MessageCircle,
} from "lucide-react";
import { getSettings, getCategories, getProducts } from "@/lib/store-data";
import { contactUrl } from "@/lib/utils";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { CategoryExplorer } from "@/components/category-explorer";
import { ProductCard } from "@/components/product-card";
import { HeroSection } from "@/components/hero-section";
import { CredentialsSection } from "@/components/credentials-section";
import { BrandStorySection } from "@/components/brand-story-section";
import { BrandMarquee } from "@/components/brand-marquee";
import { MeshDriftBackground } from "@/components/mesh-drift-background";

export const metadata = { alternates: { canonical: "/" } };

const steps = [
  {
    number: "01",
    icon: SlidersHorizontal,
    title: "Encontre sua linha.",
    action: "Explorar o catálogo",
    href: "/produtos",
    description:
      "Explore o catálogo e escolha a solução para a superfície que você quer proteger.",
  },
  {
    number: "02",
    icon: ShoppingBag,
    title: "Monte seu pedido.",
    action: "Revisar meu pedido",
    href: "/checkout",
    description:
      "Selecione a variação, defina a quantidade e reúna seus produtos no carrinho.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Continue a conversa.",
    action: "Falar com a loja",
    href: "whatsapp",
    description:
      "Envie sua seleção pelo WhatsApp e confirme disponibilidade, frete e pagamento com a loja.",
  },
];

export default async function Home() {
  const [settings, categories, products] = await Promise.all([
    getSettings(),
    getCategories(),
    getProducts(),
  ]);
  return (
    <>
      <HeroSection settings={settings} />
      <CredentialsSection />

      <BrandStorySection />

      <section
        id="linhas"
        className="section lines-section"
        aria-labelledby="lines-title"
      >
        <div className="container">
          <Reveal className="section-intro">
            <h2 id="lines-title">
              Uma superfície.
              <br />
              <span>Novas possibilidades.</span>
            </h2>
            <p>Encontre a linha que acompanha a sua aplicação.</p>
          </Reveal>
          <CategoryExplorer categories={categories} />
          {categories.length === 0 && (
            <p className="empty">
              O catálogo está sendo preparado. Fale com a loja para consultar os
              produtos.
            </p>
          )}
        </div>
      </section>

      <BrandMarquee />

      <div className="project-background">
        <MeshDriftBackground />
        <section
          className="section featured-section"
          aria-labelledby="featured-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SELEÇÃO NEVADA</p>
                <h2 id="featured-title">
                  O próximo detalhe.
                  <br />
                  <span>O seu próximo projeto.</span>
                </h2>
              </div>
              <Link className="link-arrow" href="/produtos">
                Ver todos os produtos <ArrowUpRight size={20} />
              </Link>
            </div>
            <p className="mobile-carousel-hint">
              Deslize para ver os produtos{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
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
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageSizes="(max-width: 600px) 180vw, (max-width: 800px) 90vw, (max-width: 1240px) 45vw, 560px"
                  />
                ))}
            </Reveal>
          </div>
        </section>

        <section
          className="section container application-section"
          aria-labelledby="application-title"
        >
          <Reveal className="application-panel">
            <div className="application-copy">
              <div className="application-kicker">
                <span className="tile-icon">
                  <Droplets size={22} aria-hidden="true" />
                </span>
                <p className="eyebrow">DO PRODUTO AO ACABAMENTO</p>
              </div>
              <h2 id="application-title">
                Uma boa aplicação
                <br />
                começa <span>aqui.</span>
              </h2>
              <p>
                Conheça Nevada Layer: produtos para preparar a superfície e
                acompanhar as etapas da aplicação.
              </p>
              <ul
                className="application-stages"
                aria-label="Etapas da aplicação"
              >
                <li>Preparação</li>
                <li>Aplicação</li>
                <li>Acabamento</li>
              </ul>
            </div>
            <div className="application-image">
              <Image
                src="/images/layer.jpg"
                alt="Linha de produtos de aplicação Nevada Layer"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
              />
              <span className="application-image-caption">NEVADA LAYER</span>
            </div>
            <Link
              className="application-link"
              href="/produtos?categoria=produtos-aplicacao"
            >
              <span>Conhecer Nevada Layer</span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </Reveal>
        </section>

        <section
          className="section container purchase-section"
          aria-labelledby="purchase-title"
        >
          <Reveal className="section-intro">
            <p className="eyebrow">SIMPLES, DO INÍCIO AO FIM</p>
            <h2 id="purchase-title">
              Você escolhe online.
              <br />
              <span>A gente continua a conversa.</span>
            </h2>
          </Reveal>
          <p className="mobile-carousel-hint">
            Deslize para conhecer os passos{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </p>
          <Reveal
            stagger
            className="purchase-grid"
            role="region"
            aria-label="Passos para fazer seu pedido"
            tabIndex={0}
          >
            {steps.map(
              ({ number, icon: Icon, title, description, action, href }) => (
                <article className="purchase-card" key={number}>
                  <div className="purchase-number">
                    <span className="step-number">
                      <span className="step-label">PASSO</span>
                      {number}
                    </span>
                    <Icon size={26} aria-hidden="true" />
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
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </article>
              ),
            )}
          </Reveal>
        </section>

        <section
          className="contact-page contact-home"
          aria-labelledby="home-contact-title"
        >
          <div className="container contact-composition">
            <h2
              id="home-contact-title"
              className="contact-title"
              aria-label="Entre em contato"
            >
              CONTATO
            </h2>
            <Reveal className="contact-intro-panel">
              <div className="contact-form-column">
                <h3>Vamos conversar.</h3>
                {/^\d{10,15}$/.test(settings.whatsapp) ? (
                  <ContactForm
                    whatsapp={settings.whatsapp}
                    includeProject={false}
                  />
                ) : (
                  <p>O contato comercial será disponibilizado em breve.</p>
                )}
              </div>
              <div className="contact-art" aria-hidden="true">
                <span className="contact-art-label">
                  PROTEÇÃO EM
                  <br />
                  SUA MELHOR FORMA.
                </span>
                <div className="contact-car-halftone" />
                <span className="contact-art-signature">
                  NEVADA / PROTECTION FILMS
                </span>
              </div>
            </Reveal>
            <div className="contact-meta">
              <span>A conversa continua pelo WhatsApp.</span>
              <Link href="/produtos">
                Explorar o catálogo{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
