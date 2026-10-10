import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSettings } from "@/lib/store-data";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Sobre nós",
  alternates: { canonical: "/sobre" },
};
export default async function About() {
  const s = await getSettings();
  return (
    <div className="container section">
      <p className="eyebrow">{s.name}</p>
      <div className="editorial">
        <div className="editorial-copy">
          <h1>
            O cuidado começa
            <br />
            na escolha.
          </h1>
          <p className="muted pre-line">{s.aboutText}</p>
          <Button asChild>
            <Link href="/produtos">
              Conhecer os produtos <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
        <div className="editorial-image">
          <Image
            src="/images/editorial.jpg"
            alt="Carro esportivo com pintura preservada"
            fill
            sizes="(max-width:800px) 100vw,50vw"
          />
        </div>
      </div>
    </div>
  );
}
