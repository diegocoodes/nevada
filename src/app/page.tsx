import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSettings } from "@/lib/store-data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: "Retém | Estética Premium e Loja Distribuidora",
    description:
      "Escolha sua experiência: conheça os serviços da Retém Estética Premium ou explore Nevada Films e Origin Películas na Retém Loja.",
    alternates: { canonical: "/" },
    robots: settings.demoMode ? { index: false, follow: false } : undefined,
  };
}

export default function EntrancePage() {
  return (
    <main className="experience-entry" id="main">
      <header className="entry-heading">
        <Image
          src="/images/retem-logo.svg"
          alt="Retém"
          width={1000}
          height={260}
          preload
        />
        <p>O MESMO CUIDADO. DUAS EXPERIÊNCIAS.</p>
        <h1>Como podemos cuidar do seu próximo projeto?</h1>
        <span>Escolha por onde começar.</span>
      </header>

      <nav className="entry-options" aria-label="Escolha sua experiência Retém">
        <Link href="/retem" className="entry-option entry-studio">
          <Image
            className="entry-photo"
            src="/images/retem-hero-profile.webp"
            alt=""
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            preload
          />
          <div className="entry-option-content">
            <span className="entry-number" aria-hidden="true">
              01 / ESTÉTICA PREMIUM
            </span>
            <div>
              <h2>Para o que é seu.</h2>
              <p>
                Películas, PPF e estética premium. Um cuidado especial para seu
                carro, casa ou empresa.
              </p>
              <span className="entry-button">
                Entrar no site Retém{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>

        <Link href="/distribuidora" className="entry-option entry-shop">
          <div className="entry-option-content">
            <span className="entry-number" aria-hidden="true">
              02 / LOJA DISTRIBUIDORA
            </span>
            <Image
              className="entry-shop-logo"
              src="/images/retem-re.svg"
              alt=""
              width={820}
              height={360}
            />
            <div>
              <h2>Para quem aplica.</h2>
              <p>
                Nevada Films e Origin Películas. Encontre a proteção e o
                acabamento para cada projeto.
              </p>
              <span className="entry-button">
                Entrar na Retém Loja{" "}
                <ArrowUpRight size={20} aria-hidden="true" />
              </span>
            </div>
          </div>
        </Link>
      </nav>
      <footer className="entry-footer">
        RETÉM · VILA VELHA / ES <span>Cuidado em cada detalhe.</span>
      </footer>
    </main>
  );
}
