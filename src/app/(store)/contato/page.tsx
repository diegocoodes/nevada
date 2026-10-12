import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { getSettings } from "@/lib/store-data";
import { ContactForm } from "@/components/contact-form";
import { contactUrl } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Contato",
  alternates: { canonical: "/contato" },
};
export default async function Contact() {
  const s = await getSettings();
  return (
    <div className="contact-page">
      <div className="container contact-composition">
        <h1 className="contact-title">CONTATO</h1>
        <section
          className="contact-intro-panel"
          aria-labelledby="contact-intro-title"
        >
          <div className="contact-form-column">
            <p className="contact-kicker">NEVADA PROTECTION FILMS</p>
            <h2 id="contact-intro-title">Vamos falar do seu projeto.</h2>
            <p className="contact-description">
              Conte o que você precisa. A conversa continua pelo WhatsApp.
            </p>
            {/^\d{10,15}$/.test(s.whatsapp) ? (
              <ContactForm whatsapp={s.whatsapp} />
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
        </section>
        <div className="contact-meta">
          <span>Produtos, disponibilidade e condições para o seu pedido.</span>
          {/^\d{10,15}$/.test(s.whatsapp) && (
            <a href={contactUrl(s.whatsapp)}>
              Falar direto pelo WhatsApp{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
        {(s.email || s.hours || s.address || s.instagram) && (
          <div className="contact-details">
            {s.email && (
              <p>
                <a href={`mailto:${s.email}`}>{s.email}</a>
              </p>
            )}
            {s.hours && <p className="pre-line">{s.hours}</p>}
            {s.address && <address>{s.address}</address>}
            {s.instagram && (
              <a
                className="link-arrow"
                href={s.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
