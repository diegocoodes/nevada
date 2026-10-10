"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { customerSchema, states } from "@/lib/validation";
import { money } from "@/lib/utils";
import { useCart } from "@/stores/cart";
import { useHydrated } from "@/hooks/use-hydrated";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/store";
import { prepareWhatsAppOrder } from "@/features/checkout/prepare-order";
export function WhatsAppCheckout({
  postalCodeRequired,
  whatsapp,
  products,
}: {
  postalCodeRequired: boolean;
  whatsapp: string;
  products: Product[];
}) {
  const cart = useCart();
  const hydrated = useHydrated();
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState<{
    whatsappUrl: string;
  } | null>(null);
  const configured = /^\d{10,15}$/.test(whatsapp);
  const form = useForm<z.infer<typeof customerSchema>>({
    resolver: zodResolver(customerSchema),
    defaultValues: { name: "", phone: "", city: "", postalCode: "", notes: "" },
  });
  const submit = form.handleSubmit((customer) => {
    setError("");
    if (postalCodeRequired && !customer.postalCode) {
      form.setError("postalCode", { message: "Informe seu CEP" });
      return;
    }
    try {
      const result = prepareWhatsAppOrder(
        customer,
        cart.items,
        products,
        whatsapp,
        postalCodeRequired,
      );
      setPrepared(result);
      window.location.assign(result.whatsappUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Falha ao preparar o pedido.");
    }
  });
  if (!hydrated) return <p>Carregando seu carrinho...</p>;
  if (!cart.items.length)
    return (
      <div className="empty">
        <h2>Seu carrinho está vazio.</h2>
        <Button asChild>
          <Link href="/produtos">Explorar produtos</Link>
        </Button>
      </div>
    );
  const total = cart.items.reduce(
    (sum, i) => sum + (i.priceCents ?? 0) * i.quantity,
    0,
  );
  const quote = cart.items.some((i) => i.priceCents === null);
  return (
    <div className="checkout-grid">
      <form className="panel checkout-form" onSubmit={submit}>
        <h2 className="h3">Seus dados</h2>
        <div className="form-grid">
          {(
            [
              { name: "name", label: "Nome", auto: "name" },
              { name: "phone", label: "Telefone", auto: "tel" },
              { name: "city", label: "Cidade", auto: "address-level2" },
            ] as const
          ).map((f) => (
            <label key={f.name}>
              {f.label} *
              <input
                {...form.register(f.name)}
                autoComplete={f.auto}
                type={f.name === "phone" ? "tel" : "text"}
                aria-invalid={!!form.formState.errors[f.name]}
              />
              <span className="field-error">
                {form.formState.errors[f.name]?.message}
              </span>
            </label>
          ))}
          <label>
            Estado *
            <select
              {...form.register("state")}
              autoComplete="address-level1"
              aria-label="Estado *"
            >
              <option value="">Selecione</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <span className="field-error">
              {form.formState.errors.state?.message}
            </span>
          </label>
          <label>
            CEP {postalCodeRequired ? "*" : "(opcional)"}
            <input
              {...form.register("postalCode")}
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={9}
            />
            <span className="field-error">
              {form.formState.errors.postalCode?.message}
            </span>
          </label>
          <label className="full">
            Observações (opcional)
            <textarea {...form.register("notes")} maxLength={1000} rows={3} />
          </label>
        </div>
        <p className="small muted">
          Seus dados serão usados para atender esta solicitação e compartilhados
          com o WhatsApp ao abrir a conversa.{" "}
          <Link href="/privacidade">Leia a política de privacidade.</Link>
        </p>
        {!configured && (
          <p className="notice">
            O WhatsApp comercial ainda não foi configurado pela loja.
          </p>
        )}
        {error && (
          <p role="alert" className="field-error">
            {error}
          </p>
        )}
        {prepared && (
          <div role="status" className="notice">
            Sua seleção está pronta. Envie a mensagem na conversa do WhatsApp
            para continuar com a loja.
            <a className="link-arrow" href={prepared.whatsappUrl}>
              Abrir WhatsApp novamente <ArrowUpRight size={16} />
            </a>
          </div>
        )}
        <Button
          type="submit"
          disabled={!configured || form.formState.isSubmitting}
        >
          <MessageCircle size={19} />
          {form.formState.isSubmitting
            ? "Preparando pedido..."
            : "Finalizar pelo WhatsApp"}
          <ArrowUpRight size={18} />
        </Button>
        <p className="small muted">
          Seus itens continuarão no carrinho. Nenhum pagamento é realizado aqui.
        </p>
      </form>
      <aside className="panel checkout-summary">
        <div className="between">
          <h2 className="h3">Seu pedido</h2>
          <button className="text-button" onClick={() => cart.setOpen(true)}>
            Editar
          </button>
        </div>
        {cart.items.map((i) => (
          <div className="summary-line" key={i.variantId}>
            <div>
              <strong>{i.productName}</strong>
              <span className="small muted">
                {i.variantName} · {i.quantity} unidades
              </span>
              <span className="small muted">
                Unitário: {money(i.priceCents)}
              </span>
            </div>
            <span>
              {money(i.priceCents === null ? null : i.priceCents * i.quantity)}
            </span>
          </div>
        ))}
        <div className="between subtotal">
          <span>{quote ? "Subtotal com preço" : "Subtotal"}</span>
          <strong className="h3">{money(total)}</strong>
        </div>
        <p className="small muted">
          {quote && "Itens sob consulta não estão incluídos no subtotal. "}
          Frete, disponibilidade e formas de pagamento serão confirmados no
          atendimento.
        </p>
      </aside>
    </div>
  );
}
