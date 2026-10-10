import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/store-data";
import { Button } from "@/components/ui/button";
import { contactUrl } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Contato",
  alternates: { canonical: "/contato" },
};
export default async function Contact() {
  const s = await getSettings();
  return (
    <div className="container section">
      <div className="page-heading">
        <p className="eyebrow">ATENDIMENTO COMERCIAL</p>
        <h1>Vamos falar do seu projeto.</h1>
        <p className="muted">
          Consulte produtos, disponibilidade e condições para o seu pedido.
        </p>
      </div>
      <div className="contact-grid">
        <section className="panel">
          <MessageCircle size={32} />
          <h2>Uma conversa faz a diferença.</h2>
          <p className="muted">
            Envie sua seleção ou tire suas dúvidas sobre a linha de produtos.
          </p>
          {s.whatsapp ? (
            <Button asChild>
              <a href={contactUrl(s.whatsapp)}>
                Falar pelo WhatsApp <ArrowUpRight size={18} />
              </a>
            </Button>
          ) : (
            <p className="notice">
              O contato comercial será disponibilizado em breve.
            </p>
          )}
        </section>
        <section className="panel">
          <h2 className="h3">Informações da loja</h2>
          <p>{s.name}</p>
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
        </section>
      </div>
    </div>
  );
}
