"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Product } from "@/types/store";
import { money } from "@/lib/utils";
import { useCart } from "@/stores/cart";
import { FilmPerformance } from "@/components/film-performance";
import { FilmArtwork } from "@/components/film-artwork";
export function ProductCard({
  product: p,
  imageSizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 25vw",
}: {
  product: Product;
  imageSizes?: string;
}) {
  const add = useCart((s) => s.add);
  const available = p.variants.filter(
    (v) => v.inventory?.available && v.inventory.quantity !== 0,
  );
  const prices = p.variants.flatMap((v) =>
    v.priceCents === null ? [] : [v.priceCents],
  );
  const image = p.images[0]?.url || "/images/hero.jpg";
  const quickAdd = available.length === 1 ? available[0] : null;
  return (
    <article className="product-card">
      <Link
        href={`/produtos/${p.slug}`}
        className={`product-image${p.artwork ? " film-product-image" : ""}`}
        data-artwork-brand={p.artwork ? p.brand : undefined}
      >
        {p.artwork ? (
          <FilmArtwork product={p} sizes={imageSizes} />
        ) : (
          <Image
            src={image}
            alt={p.images[0]?.alt || p.name}
            fill
            sizes={imageSizes}
          />
        )}
        {!p.artwork && (
          <span className="product-badge">
            {available.length ? p.category.name : "Indisponível"}
          </span>
        )}
        <span className="product-image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      {p.performance && (
        <FilmPerformance performance={p.performance} brand={p.brand} compact />
      )}
      <div className="product-info">
        <p className="eyebrow">{p.category.name}</p>
        <Link href={`/produtos/${p.slug}`}>
          <h3>{p.name}</h3>
        </Link>
        <div className="between product-price">
          <div>
            {prices.length > 0 ? (
              <>
                <span className="small muted">
                  {p.variants.length > 1 ? "A partir de" : "Valor unitário"}
                </span>
                <strong>{money(Math.min(...prices))}</strong>
              </>
            ) : (
              <strong>Sob consulta</strong>
            )}
          </div>
          {quickAdd ? (
            <button
              className="add-button"
              aria-label={`Adicionar ${p.name} ao carrinho`}
              onClick={() =>
                add({
                  productId: p.id,
                  variantId: quickAdd.id,
                  productName: p.name,
                  variantName: quickAdd.name,
                  image,
                  priceCents: quickAdd.priceCents,
                  quantity: 1,
                })
              }
            >
              <span className="product-action-label">Adicionar ao pedido</span>
              <Plus size={20} />
            </button>
          ) : (
            <Link
              className="add-button"
              aria-label={`Selecionar variação de ${p.name}`}
              href={`/produtos/${p.slug}`}
            >
              <span className="product-action-label">Escolher variação</span>
              <ArrowUpRight size={20} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
