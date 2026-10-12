"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Trash2, ArrowUpRight, MessageCircle } from "lucide-react";
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
  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Dialog open={cart.open} onOpenChange={cart.setOpen}>
      <DialogContent className="store-dialog cart-drawer">
        <div className="cart-header">
          <div className="cart-heading-icon">
            <ShoppingBag size={24} aria-hidden="true" />
          </div>
          <span className="eyebrow">SEU PRÓXIMO PROJETO</span>
          <DialogTitle className="h3">
            Carrinho{" "}
            <span className="cart-item-count">
              {count} {count === 1 ? "item" : "itens"}
            </span>
          </DialogTitle>
          <DialogDescription className="muted">
            Confira seus produtos antes de solicitar o pedido.
          </DialogDescription>
          <div className="cart-progress" aria-label="Etapas do pedido">
            <span className="cart-progress-current">
              01 <span>Sua seleção</span>
            </span>
            <ArrowUpRight size={14} aria-hidden="true" />
            <span>
              02 <span>Seu pedido</span>
            </span>
          </div>
        </div>
        <p className="sr-only" role="status">
          {count} {count === 1 ? "item no carrinho" : "itens no carrinho"}
        </p>
        <div className="cart-items">
          {cart.items.length === 0 ? (
            <div className="empty">
              <span className="cart-empty-icon">
                <ShoppingBag size={40} aria-hidden="true" />
              </span>
              <h3>Seu próximo projeto começa aqui.</h3>
              <p>Explore o catálogo e adicione os produtos que precisa.</p>
              <Button onClick={() => cart.setOpen(false)} asChild>
                <Link href="/produtos">Explorar produtos</Link>
              </Button>
            </div>
          ) : (
            cart.items.map((item, index) => (
              <article
                key={item.variantId}
                className="cart-item"
                style={{ animationDelay: `${Math.min(index, 5) * 45}ms` }}
              >
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={90}
                  height={110}
                />
                <div className="cart-item-content">
                  <h3>{item.productName}</h3>
                  <p className="muted small">{item.variantName}</p>
                  <p className="cart-unit-price">
                    {money(item.priceCents)}{" "}
                    <span className="muted small">/ unidade</span>
                  </p>
                </div>
                <div className="cart-item-footer">
                  <QuantitySelector
                    value={item.quantity}
                    onChange={(n) => cart.quantity(item.variantId, n)}
                  />
                  <div className="cart-line-total">
                    <span>Subtotal</span>
                    <strong>
                      {money(
                        item.priceCents === null
                          ? null
                          : item.priceCents * item.quantity,
                      )}
                    </strong>
                  </div>
                </div>
                <button
                  className="icon-button cart-remove"
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
            <div className="cart-summary-heading">
              <span>Resumo da seleção</span>
              <button className="text-button muted" onClick={cart.clear}>
                Esvaziar carrinho
              </button>
            </div>
            <div className="between">
              <span>{quote ? "Subtotal com preço" : "Subtotal"}</span>
              <strong className="h3">{money(total)}</strong>
            </div>
            <p className="cart-order-note">
              <MessageCircle size={17} aria-hidden="true" />
              <span>
                {quote
                  ? "Itens sob consulta serão cotados no atendimento. "
                  : ""}
                Frete e pagamento a confirmar.
              </span>
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
