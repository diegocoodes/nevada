"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, ArrowUpRight } from "lucide-react";
import { useCart } from "@/stores/cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { money } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/quantity-selector";
export function CartDrawer() {
  const cart = useCart();
  const hydrated = useHydrated();
  useEffect(() => {
    useCart.persist.rehydrate();
  }, []);
  if (!hydrated) return null;
  const quote = cart.items.some((i) => i.priceCents === null);
  const total = cart.items.reduce(
    (sum, i) => sum + (i.priceCents ?? 0) * i.quantity,
    0,
  );
  return (
    <Dialog open={cart.open} onOpenChange={cart.setOpen}>
      <DialogContent className="store-dialog cart-drawer">
        <div>
          <span className="eyebrow">SUA SELEÇÃO</span>
          <DialogTitle className="h3">
            Carrinho{" "}
            <span className="muted">
              ({cart.items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </DialogTitle>
          <DialogDescription className="muted">
            Confira seus produtos antes de solicitar o pedido.
          </DialogDescription>
        </div>
        <div className="cart-items" aria-live="polite">
          {cart.items.length === 0 ? (
            <div className="empty">
              <ShoppingBag size={40} />
              <h3>Seu próximo projeto começa aqui.</h3>
              <p>Explore o catálogo e adicione os produtos que precisa.</p>
              <Button onClick={() => cart.setOpen(false)} asChild>
                <Link href="/produtos">Explorar produtos</Link>
              </Button>
            </div>
          ) : (
            cart.items.map((item) => (
              <article key={item.variantId} className="cart-item">
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={90}
                  height={110}
                />
                <div>
                  <h3>{item.productName}</h3>
                  <p className="muted small">{item.variantName}</p>
                  <p>
                    {money(item.priceCents)}{" "}
                    <span className="muted small">/ unidade</span>
                  </p>
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(n) => cart.quantity(item.variantId, n)}
                  />
                  <span className="small">
                    Subtotal:{" "}
                    {money(
                      item.priceCents === null
                        ? null
                        : item.priceCents * item.quantity,
                    )}
                  </span>
                </div>
                <button
                  className="icon-button"
                  aria-label={`Remover ${item.productName}`}
                  onClick={() => cart.remove(item.variantId)}
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))
          )}
        </div>
        {cart.items.length > 0 && (
          <div className="cart-summary">
            <button className="text-button muted" onClick={cart.clear}>
              Esvaziar carrinho
            </button>
            <div className="between">
              <span>{quote ? "Subtotal com preço" : "Subtotal"}</span>
              <strong className="h3">{money(total)}</strong>
            </div>
            <p className="muted small">
              {quote ? "Itens sob consulta serão cotados no atendimento. " : ""}
              Frete e pagamento a confirmar.
            </p>
            <Button asChild onClick={() => cart.setOpen(false)}>
              <Link href="/checkout">
                Continuar para o pedido <ArrowUpRight size={18} />
              </Link>
            </Button>
            <button className="text-button" onClick={() => cart.setOpen(false)}>
              Continuar comprando
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
