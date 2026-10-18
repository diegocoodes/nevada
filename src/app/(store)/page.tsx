import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Sun, Sparkles } from "lucide-react";
import { getSettings } from "@/lib/store-data";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { CategoryExplorer } from "@/components/category-explorer";
import { HeroSection } from "@/components/hero-section";
import { BrandStorySection } from "@/components/brand-story-section";
import { BrandMarquee } from "@/components/brand-marquee";
import { Atmosphere } from "@/components/atmosphere";
import type { Category } from "@/types/store";

export const metadata = { alternates: { canonical: "/" } };

const services: Category[] = [
  {
    id: "service-ppf",
    name: "PPF",
    slug: "ppf",
    description:
      "Proteção de pintura. Uma película transparente para preservar o acabamento do seu carro no dia a dia. Converse com a equipe sobre as áreas de aplicação.",
    image: "/images/lines/ppf-application.webp",
    position: 0,
    active: true,
  },
  {
    id: "service-solar",
    name: "Películas solares",
    slug: "peliculas-solares",
    description:
      "Conforto para dirigir. Encontre a película para os vidros do seu carro, considerando privacidade, luminosidade e a sua rotina ao volante.",
    image: "/images/lines/solar-film.webp",
    position: 1,
    active: true,
  },
];

export default async function Home() {
  const settings = await getSettings();
  return (
    <>
      <HeroSection settings={settings} />
      <Atmosphere>
        <section
          className="retem-service-band"
          aria-label="Especialidades da Retém"
        >
          <div className="container">
            <span>
              <ShieldCheck size={22} /> Proteção de pintura / PPF
            </span>
            <span>
              <Sun size={22} /> Películas automotivas
            </span>
            <span>
              <Sparkles size={22} /> Cuidado em cada detalhe
            </span>
          </div>
        </section>
        <BrandStorySection />
        <section
          id="servicos"
          className="section lines-section"
          aria-labelledby="services-title"
        >
          <div className="container">
            <Reveal className="section-intro retem-section-intro">
              <p className="eyebrow">O CUIDADO QUE ACOMPANHA VOCÊ</p>
              <h2 id="services-title">
                Preserve a pintura.
                <br />
                <span>Transforme a experiência.</span>
              </h2>
              <p>
                Conheça nossas especialidades e encontre a proteção para o seu
                carro.
              </p>
            </Reveal>
            <CategoryExplorer categories={services} services />
          </div>
        </section>
        <BrandMarquee />
        <section
          className="section retem-distributor-teaser"
          aria-labelledby="distributor-title"
        >
          <div className="container retem-distributor-grid">
            <Reveal className="retem-distributor-copy">
              <p className="eyebrow">PARA QUEM TAMBÉM VIVE DE CUIDAR</p>
              <h2 id="distributor-title">
                A proteção continua.
                <br />
                <span>Agora, no seu projeto.</span>
              </h2>
              <p>
                Conheça a Retém Loja Distribuidora. Nevada Films e Origin
                Películas reunidas em uma área dedicada a produtos para a sua
                aplicação.
              </p>
              <Link href="/distribuidora" className="button button-primary">
                Acessar a distribuidora <ArrowUpRight size={20} />
              </Link>
            </Reveal>
            <Reveal className="retem-distributor-card">
              <Image
                src="/images/retem-re.svg"
                alt="RE — Retém Loja Distribuidora"
                width={820}
                height={360}
              />
              <p>LOJA DISTRIBUIDORA</p>
              <div>
                <span>NEVADA FILMS</span>
                <span>ORIGIN PELÍCULAS</span>
              </div>
              <Link
                href="/distribuidora"
                aria-label="Conhecer a Retém Loja Distribuidora"
              >
                <ArrowUpRight size={24} />
              </Link>
            </Reveal>
          </div>
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
                <p className="contact-kicker">
                  SEU PRÓXIMO CUIDADO COMEÇA AQUI
                </p>
                <h3>Vamos falar do seu carro.</h3>
                <ContactForm
                  whatsapp={settings.whatsapp}
                  includeProject={false}
                />
              </div>
              <div className="contact-art" aria-hidden="true">
                <span className="contact-art-label">
                  CUIDADO EM
                  <br />
                  CADA DETALHE.
                </span>
                <div className="contact-car-halftone" />
                <span className="contact-art-signature">
                  RETÉM / ESTÉTICA PREMIUM
                </span>
              </div>
            </Reveal>
            <div className="contact-meta">
              <span>A conversa continua pelo WhatsApp.</span>
              <Link href="/contato">
                Fale com a Retém <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </Atmosphere>
    </>
  );
}
