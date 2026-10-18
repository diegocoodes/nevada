import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/header";
import type { Category, Settings } from "@/types/store";
import { contactUrl } from "@/lib/utils";
export function Footer({
  settings: s,
  categories,
}: {
  settings: Settings;
  categories: Category[];
}) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Brand name={s.name} logo={s.logo} />
          <p className="muted">
            Cuidado em cada detalhe.
            <br />
            Proteção para o que é seu.
          </p>
          <p className="small muted">{s.name}</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/#servicos">Nossos serviços</Link>
          <Link href="/distribuidora">Retém Loja Distribuidora</Link>
          <Link href="/produtos">Todos os produtos</Link>
          <Link href="/sobre">Sobre nós</Link>
          <Link href="/contato">Contato</Link>
          <Link href="/privacidade">Privacidade</Link>
        </div>
        <div>
          <h3>Na distribuidora</h3>
          <Link href="/produtos?marca=nevada">Nevada Films</Link>
          <Link href="/produtos?marca=origin">Origin Películas</Link>
          {categories.map((c) => (
            <Link key={c.id} href={`/produtos?categoria=${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Vamos conversar</h3>
          <a href={contactUrl(s.whatsapp)}>
            Atendimento comercial <ArrowUpRight size={14} />
          </a>
          {s.email && <a href={`mailto:${s.email}`}>{s.email}</a>}
          {s.instagram && (
            <a href={s.instagram} target="_blank" rel="noopener noreferrer">
              Instagram <ArrowUpRight size={14} />
            </a>
          )}
          {s.hours && <p className="muted small">{s.hours}</p>}
          {s.address && <p className="muted small">{s.address}</p>}
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {s.name}. Todos os direitos reservados.
        </span>
        <span>Estética Premium & Loja Distribuidora.</span>
      </div>
    </footer>
  );
}
