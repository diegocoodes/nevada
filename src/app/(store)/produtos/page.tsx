import type { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/store-data";
import { Catalog } from "@/features/catalog/catalog";
export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Explore produtos, filtre por linha e encontre a variação para sua aplicação.",
  alternates: { canonical: "/produtos" },
};
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const [products, categories, params] = await Promise.all([
    getProducts(),
    getCategories(),
    searchParams,
  ]);
  return (
    <div className="container section">
      <div className="page-heading">
        <p className="eyebrow">CATÁLOGO NEVADA</p>
        <h1>Proteção para cada projeto.</h1>
        <p className="muted">
          Selecione seus produtos. A gente continua a conversa pelo WhatsApp.
        </p>
      </div>
      <Catalog
        products={products}
        categories={categories}
        initialQuery={params.q || ""}
        initialCategory={params.categoria || ""}
      />
    </div>
  );
}
