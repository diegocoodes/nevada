import type { Metadata } from "next";
import { getProducts, getCategories, getSettings } from "@/lib/store-data";
import { Catalog } from "@/features/catalog/catalog";
import Link from "next/link";
import { contactUrl } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Produtos | Loja Distribuidora",
  description:
    "Explore o catálogo da Retém Loja Distribuidora: Nevada Films e Origin Películas. Filtre por marca e linha e converse com nossa equipe.",
  alternates: { canonical: "/produtos" },
};
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string; marca?: string }>;
}) {
  const [products, categories, params, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    searchParams,
    getSettings(),
  ]);
  return (
    <div className="container section">
      <div className="page-heading">
        <Link href="/distribuidora" className="catalog-back">
          ← Retém Loja Distribuidora
        </Link>
        <p className="eyebrow">NEVADA FILMS & ORIGIN PELÍCULAS</p>
        <h1>Proteção para cada projeto.</h1>
        <p className="muted">
          Selecione seus produtos. A gente continua a conversa pelo WhatsApp.
        </p>
      </div>
      <Catalog
        key={`${params.q || ""}:${params.categoria || ""}:${params.marca || ""}`}
        products={products}
        categories={categories}
        initialQuery={params.q || ""}
        initialCategory={params.categoria || ""}
        initialBrand={
          params.marca === "nevada" || params.marca === "origin"
            ? params.marca
            : ""
        }
        contactHref={`${contactUrl(settings.whatsapp)}?text=${encodeURIComponent("Olá, Retém Loja Distribuidora! Quero conhecer as opções da Origin Películas.")}`}
      />
    </div>
  );
}
