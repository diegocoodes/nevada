import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  ShieldCheck,
  Sun,
  Sparkles,
} from "lucide-react";
import { getSettings } from "@/lib/store-data";
import { contactUrl } from "@/lib/utils";
import { ContactForm } from "@/components/contact-form";
import { HeroSection } from "@/components/hero-section";
import { BrandStorySection } from "@/components/brand-story-section";
import { StudioDetails } from "@/components/studio-details";
import { StudioServices } from "@/components/studio-services";

export const metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const settings = await getSettings();
  return (
    <div className="campaign-home">
      <HeroSection settings={settings} />
      <a href="#servicos" className="campaign-ribbon">
        O seu próximo cuidado começa aqui.
        <span>
          <ChevronDown size={18} aria-hidden="true" />
        </span>
      </a>
      <section
        id="empresa"
        className="campaign-intro"
        aria-labelledby="intro-title"
      >
        <div className="container campaign-intro-grid">
          <h2 id="intro-title">
            Para quem exige mais.
            <br />
            <span>Em cada detalhe.</span>
          </h2>
          <div>
            <p>
              Seu carro faz parte da sua história. A nossa parte é ajudar você a
              preservar o que ele tem de melhor.
            </p>
            <p>
              Películas solares, proteção de pintura e estética premium.
              Atendimento atento para encontrar o cuidado que faz sentido para
              você, sua casa ou sua empresa.
            </p>
          </div>
        </div>
      </section>
      <section
        className="atelier-process campaign-pillars"
        aria-labelledby="process-title"
      >
        <div className="container">
          <div className="campaign-heading">
            <p className="campaign-kicker">O QUE MOVE NOSSO CUIDADO</p>
            <h2 id="process-title">
              Proteção, conforto e estética.
              <br />
              <span>Seu carro em boas mãos.</span>
            </h2>
          </div>
          <div className="atelier-process-grid">
            {[
              {
                Icon: ShieldCheck,
                title: "Proteção de pintura",
                text: "PPF para preservar o acabamento original e acompanhar sua rotina com mais tranquilidade.",
                detail: "Cuidado que preserva.",
              },
              {
                Icon: Sun,
                title: "Conforto para sentir",
                text: "Películas solares para controlar a luminosidade e encontrar o conforto que você procura.",
                detail: "Proteção para viver melhor.",
              },
              {
                Icon: Sparkles,
                title: "Estética em evidência",
                text: "Coat cerâmica, polimento e vitrificação. Atenção ao brilho, ao toque e ao acabamento.",
                detail: "O detalhe faz a diferença.",
              },
            ].map(({ Icon, title, text, detail }) => (
              <article key={title}>
                <Icon size={36} strokeWidth={1.25} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <span>{detail}</span>
              </article>
            ))}
          </div>
          <div className="campaign-centered-action">
            <a href={contactUrl(settings.whatsapp)} className="campaign-button">
              Quero cuidar do meu carro{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section
        id="servicos"
        className="campaign-services"
        aria-labelledby="services-title"
      >
        <div className="container">
          <div className="campaign-heading">
            <p className="campaign-kicker">ENCONTRE O SEU CUIDADO</p>
            <h2 id="services-title">
              Cada superfície pede
              <br />
              <span>uma atenção especial.</span>
            </h2>
          </div>
          <StudioServices />
        </div>
      </section>
      <section
        id="orcamento"
        className="campaign-offer contact-home"
        aria-labelledby="home-contact-title"
      >
        <div className="container">
          <div className="campaign-heading">
            <h2 id="home-contact-title" aria-label="Entre em contato">
              Seu próximo projeto.
              <br />
              <span>Nosso melhor cuidado.</span>
            </h2>
            <p>Uma conversa para entender o que você precisa.</p>
          </div>
          <div className="campaign-offer-card">
            <Image
              src={settings.logo}
              alt="RETÉM Estética Premium"
              width={1000}
              height={260}
              className="campaign-offer-logo"
            />
            <ul>
              {[
                "Orientação sobre materiais e acabamentos",
                "Avaliação do seu veículo ou ambiente",
                "Condições e prazo apresentados no orçamento",
              ].map((item) => (
                <li key={item}>
                  <Check size={15} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <h3>
              Proteção
              <br />
              <span>sob medida.</span>
            </h3>
            <p className="campaign-offer-subtitle">
              Conte para a gente o que você tem em mente.
            </p>
            <ContactForm whatsapp={settings.whatsapp} includeProject={false} />
            <p className="campaign-offer-note">
              Atendimento pelo WhatsApp.
              <br />
              Personalizado e sem compromisso.
            </p>
          </div>
        </div>
      </section>
      <BrandStorySection />
      <StudioDetails settings={settings} />
      <section
        className="campaign-distributor retem-distributor-teaser"
        aria-labelledby="distributor-title"
      >
        <div className="container">
          <div>
            <p className="campaign-kicker">TAMBÉM PARA QUEM APLICA</p>
            <h2 id="distributor-title">
              Leve esse cuidado
              <br />
              <span>para o seu projeto.</span>
            </h2>
            <p>Nevada Films e Origin Películas na Retém Loja Distribuidora.</p>
          </div>
          <Link
            href="/distribuidora"
            className="campaign-button campaign-button-outline"
          >
            Acessar a distribuidora{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
