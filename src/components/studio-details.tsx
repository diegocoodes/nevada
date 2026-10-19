import { ArrowUpRight, MapPin, Phone, Plus } from "lucide-react";
import Image from "next/image";
import { serviceQuestions } from "@/data/services";
import type { Settings } from "@/types/store";
import { contactUrl } from "@/lib/utils";

export function StudioDetails({ settings }: { settings: Settings }) {
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("RETÉM Rodovia do Sol 1528 Praia de Itaparica Vila Velha ES")}`;

  return (
    <>
      <section
        className="studio-brands"
        aria-label="Marcas com que trabalhamos"
      >
        <div className="container studio-brands-inner">
          <p>
            O cuidado começa
            <br />
            na escolha dos materiais.
          </p>
          <a
            href="https://www.instagram.com/originpeliculas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>ORIGIN</strong>
            <span>
              PELÍCULAS <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </a>
          <a
            href="https://www.instagram.com/gyeon_brasil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>GYEON</strong>
            <span>
              COAT CERÂMICA <ArrowUpRight size={14} aria-hidden="true" />
            </span>
          </a>
        </div>
      </section>
      <section
        id="galeria"
        className="section studio-social"
        aria-labelledby="social-title"
      >
        <div className="container studio-information-grid">
          <div>
            <p className="eyebrow">UM OLHAR PARA OS DETALHES</p>
            <h2 id="social-title">
              O acabamento fala.
              <br />
              <span>O cuidado permanece.</span>
            </h2>
          </div>
          <div className="studio-information-copy">
            <p>
              Veja os trabalhos, as aplicações e os bastidores do nosso cuidado
              no perfil oficial da RETÉM.
            </p>
            <a
              className="studio-text-link"
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver trabalhos no @retem.es{" "}
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <div className="container atelier-gallery-grid">
        <figure>
          <div>
            <Image
              src="/images/retem-workshop-real.webp"
              alt="Detalhe da aplicação de película de proteção na carroceria"
              fill
              sizes="(max-width: 600px) 90vw, 58vw"
            />
          </div>
          <figcaption>
            <span>Precisão em cada curva.</span>
          </figcaption>
        </figure>
        <figure>
          <div>
            <Image
              src="/images/retem-porsche-black.webp"
              alt="Esportivo preto com destaque para o acabamento da pintura"
              fill
              sizes="(max-width: 600px) 90vw, 38vw"
            />
          </div>
          <figcaption>
            <span>Presença em cada reflexo.</span>
          </figcaption>
        </figure>
        <p className="atelier-gallery-note">
          Imagens ilustrativas. Conheça nossos trabalhos no Instagram @retem.es.
        </p>
      </div>
      <section
        id="faq"
        className="section studio-faq"
        aria-labelledby="faq-title"
      >
        <div className="container studio-information-grid">
          <div>
            <p className="eyebrow">PODE PERGUNTAR</p>
            <h2 id="faq-title">
              Uma boa escolha
              <br />
              <span>começa por aqui.</span>
            </h2>
          </div>
          <div className="studio-questions">
            {serviceQuestions.map(({ question, answer }) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={18} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section
        id="localizacao"
        className="section studio-location"
        aria-labelledby="location-title"
      >
        <div className="container studio-information-grid">
          <div>
            <p className="eyebrow">VILA VELHA · GRANDE VITÓRIA · ES</p>
            <h2 id="location-title">
              Seu próximo cuidado
              <br />
              <span>tem endereço.</span>
            </h2>
          </div>
          <div className="studio-information-copy">
            <address>{settings.address}</address>
            <p>{settings.hours}</p>
            <div className="studio-location-actions">
              <a
                className="button button-primary"
                href={directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={18} aria-hidden="true" /> Como chegar
              </a>
              <a className="studio-text-link" href="tel:+5527992315115">
                <Phone size={17} aria-hidden="true" /> (27) 99231-5115
              </a>
            </div>
            <a
              className="studio-text-link"
              href={contactUrl(settings.whatsapp)}
            >
              Solicitar orçamento pelo WhatsApp{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
