import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts, getSettings } from "@/lib/store-data";
import { ProductDetail } from "@/features/catalog/product-detail";
import { ProductCard } from "@/components/product-card";
import { getSiteUrl } from "@/lib/site-url";
export const dynamicParams = false;
export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = (await getProducts()).find((p) => p.slug === slug);
  return p
    ? {
        title: p.name,
        description: p.description.slice(0, 160),
        alternates: { canonical: `/produtos/${p.slug}` },
        openGraph: {
          title: p.name,
          images: p.images.map((i) => ({ url: i.url })),
        },
      }
    : { title: "Produto não encontrado" };
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, s] = await Promise.all([getProducts(), getSettings()]);
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const structured = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.map((i) => new URL(i.url, getSiteUrl()).href),
    brand: { "@type": "Brand", name: "Nevada Protection Films" },
    category: p.category.name,
  };
  return (
    <div className="container">
      <nav className="breadcrumbs" aria-label="Caminho da página">
        <Link href="/">Início</Link>
        <span>/</span>
        <Link href="/produtos">Produtos</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      {!s.demoMode && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structured).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ProductDetail product={p} whatsapp={s.whatsapp} />
      <section className="section">
        <div className="section-heading">
          <h2>Complete sua seleção.</h2>
          <Link href="/produtos">Ver catálogo</Link>
        </div>
        <div className="product-grid">
          {products
            .filter(
              (other) => other.id !== p.id && other.categoryId === p.categoryId,
            )
            .slice(0, 4)
            .map((other) => (
              <ProductCard key={other.id} product={other} />
            ))}
        </div>
      </section>
    </div>
  );
}
