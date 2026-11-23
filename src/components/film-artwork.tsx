import Image from "next/image";
import type { Product } from "@/types/store";
import styles from "./film-artwork.module.css";

export function FilmArtwork({
  product,
  sizes,
  preload = false,
}: {
  product: Pick<Product, "name" | "brand" | "artwork" | "images">;
  sizes: string;
  preload?: boolean;
}) {
  if (!product.artwork) return null;
  const isOrigin = product.brand === "origin";

  return (
    <div
      className={`${styles.artwork}${isOrigin ? ` ${styles.origin}` : ""}`}
      role="img"
      aria-label={
        product.images[0].alt ||
        `${product.name} — composição ilustrativa de apresentação`
      }
      data-artwork-brand={product.brand}
    >
      <Image
        className={styles.background}
        src={product.images[0].url}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
      />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.copy} aria-hidden="true">
        <Image
          className={styles.logo}
          src={
            isOrigin
              ? "/images/origin-logo-official.png"
              : "/images/nevada-logo-2026.png"
          }
          alt=""
          width={isOrigin ? 1177 : 982}
          height={isOrigin ? 303 : 182}
          sizes="(max-width: 640px) 150px, 220px"
        />
        <p className={styles.title}>
          <span>{product.artwork.headline}</span>
          <strong>{product.artwork.technology}</strong>
          {product.artwork.edition && (
            <em className={styles.edition}>{product.artwork.edition}</em>
          )}
        </p>
      </div>
    </div>
  );
}
