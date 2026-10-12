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
import { Button } from "@/components/ui/button";
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
            <div className="product-grid">
              {products
                .filter((product) => product.featured)
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    imageSizes="(max-width: 600px) 180vw, (max-width: 800px) 90vw, (max-width: 1240px) 45vw, 560px"
                  />
                ))}
            </div>
          </div>
        </section>

        <section
          className="section container application-section"
          aria-labelledby="application-title"
        >
          <div className="application-panel">
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
          </div>
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
          <div className="purchase-grid">
            {steps.map(
              ({ number, icon: Icon, title, description, action, href }) => (
                <article className="purchase-card" key={number}>
                  <p className="purchase-description">{description}</p>
                  <div className="purchase-service">
                    <span className="tile-icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <div>
                      <span className="step-number">PASSO {number}</span>
                      <h3>{title}</h3>
                    </div>
                  </div>
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
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">VAMOS AO PRÓXIMO PROJETO?</p>
              <h2 id="cta-title">
                A sua próxima
                <br />
                escolha começa <span>aqui.</span>
              </h2>
              <p>
                Encontre seus produtos e fale com quem pode ajudar no seu
                pedido.
              </p>
            </div>
            <div className="cta-actions">
              <Button asChild>
                <a href={contactUrl(settings.whatsapp)}>
                  Falar com a loja <ArrowUpRight size={22} />
                </a>
              </Button>
              <Link className="link-arrow" href="/produtos">
                Prefiro explorar o catálogo <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
