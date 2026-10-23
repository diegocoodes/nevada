"use client";
import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, ArrowUpRight, ZoomIn } from "lucide-react";
import type { Product } from "@/types/store";
import { money, contactUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/quantity-selector";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useCart } from "@/stores/cart";
export function ProductDetail({
  product: p,
  whatsapp,
}: {
  product: Product;
  whatsapp: string;
}) {
  const [image, setImage] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [variantId, setVariantId] = useState(p.variants[0]?.id || "");
  const [quantity, setQuantity] = useState(1);
  const add = useCart((s) => s.add);
  const variant = p.variants.find((v) => v.id === variantId);
  const available =
    !!variant?.inventory?.available && variant.inventory.quantity !== 0;
  const main = p.images[image] || { url: "/images/hero.jpg", alt: p.name };
  return (
    <div className="product-detail">
      <div>
        <button
          className="gallery-main"
          onClick={() => setZoom(true)}
          aria-label="Ampliar imagem do produto"
        >
          <Image
            src={main.url}
            alt={main.alt}
            fill
            priority
            sizes="(max-width: 800px) 100vw, 50vw"
          />
          <ZoomIn size={24} />
        </button>
        <div className="gallery-thumbs">
          {p.images.map((i, n) => (
            <button
              key={i.url + n}
              aria-label={`Ver imagem ${n + 1}`}
              aria-pressed={n === image}
              onClick={() => setImage(n)}
            >
              <Image src={i.url} alt={i.alt} width={90} height={90} />
            </button>
          ))}
        </div>
      </div>
      <div className="detail-copy">
        <p className="eyebrow">{p.category.name}</p>
        <h1>{p.name}</h1>
        <p className="muted">{p.description}</p>
        <fieldset className="variant-selector">
          <legend>Escolha sua variação</legend>
          {p.variants.map((v) => (
            <label key={v.id} className={v.id === variantId ? "selected" : ""}>
              <input
                type="radio"
                name="variant"
                value={v.id}
                checked={v.id === variantId}
                onChange={() => {
                  setVariantId(v.id);
                  setQuantity(1);
                }}
              />
              <span>
                <strong>{v.name}</strong>
                <small>
                  {Object.entries(v.attributes)
                    .map(([k, val]) => `${k}: ${val}`)
                    .join(" · ")}
                </small>
              </span>
              <span>{money(v.priceCents)}</span>
            </label>
          ))}
        </fieldset>
        {variant && (
          <>
            <p className="availability">
              <span
                className={available ? "status-dot" : "status-dot unavailable"}
              />
              {available
                ? variant.inventory?.quantity !== null
                  ? `${variant.inventory?.quantity} unidades disponíveis`
                  : "Disponível para solicitação"
                : "Indisponível no momento"}
            </p>
            <div className="detail-price">
              <strong>{money(variant.priceCents)}</strong>
              <span className="small muted">
                {variant.priceCents !== null
                  ? "por unidade · frete a confirmar"
                  : "Confirme o valor no atendimento"}
              </span>
            </div>
            <div className="detail-buy">
              <QuantitySelector
                value={quantity}
                max={variant.inventory?.quantity ?? 999}
                onChange={setQuantity}
              />
              <Button
                disabled={!available}
                onClick={() =>
                  add({
                    productId: p.id,
                    variantId: variant.id,
                    productName: p.name,
                    variantName: variant.name,
                    priceCents: variant.priceCents,
                    image: p.images[0]?.url || "/images/hero.jpg",
                    quantity,
                  })
                }
              >
                <ShoppingBag size={18} />
                Adicionar ao carrinho
              </Button>
            </div>
          </>
        )}
        <Button asChild variant="outline">
          <a
            href={`${contactUrl(whatsapp)}?text=${encodeURIComponent(`Olá, Retém Loja! Gostaria de consultar ${p.name}${variant ? `, ${variant.name}` : ""}.`)}`}
          >
            Falar com especialista <ArrowUpRight size={18} />
          </a>
        </Button>
        <details className="technical" open>
          <summary>Informações técnicas</summary>
          <p>
            {p.technical ||
              "Consulte a loja para obter a ficha técnica desta variação."}
          </p>
        </details>
        <p className="muted small">
          A seleção não reserva estoque. Disponibilidade, entrega e pagamento
          são confirmados no atendimento.
        </p>
      </div>
      <Dialog open={zoom} onOpenChange={setZoom}>
        <DialogContent className="store-dialog image-zoom">
          <DialogTitle className="sr-only">{p.name}</DialogTitle>
          <DialogDescription className="sr-only">
            Imagem ampliada do produto
          </DialogDescription>
          <Image src={main.url} alt={main.alt} fill sizes="90vw" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
