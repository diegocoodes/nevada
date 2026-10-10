import { orderSchema } from "@/lib/validation";
import { buildMessage, type OrderSnapshot } from "@/features/checkout/message";
import type { CartLine, Product } from "@/types/store";
import type { z } from "zod";
import type { customerSchema } from "@/lib/validation";

export function prepareWhatsAppOrder(
  customer: z.infer<typeof customerSchema>,
  cart: Pick<CartLine, "productId" | "variantId" | "quantity" | "priceCents">[],
  products: Product[],
  whatsapp: string,
  postalCodeRequired = false,
) {
  const parsed = orderSchema.safeParse({ customer, items: cart });
  if (!parsed.success)
    throw new Error("Revise seus dados e os itens do carrinho.");
  if (!/^\d{10,15}$/.test(whatsapp))
    throw new Error("WhatsApp da loja inválido.");
  if (postalCodeRequired && !parsed.data.customer.postalCode)
    throw new Error("Informe seu CEP.");
  const selected = new Map<string, OrderSnapshot>();
  for (const line of parsed.data.items) {
    const product = products.find(
      (item) =>
        item.id === line.productId && item.active && item.category.active,
    );
    const variant = product?.variants.find(
      (item) => item.id === line.variantId && item.active,
    );
    const quantity =
      line.quantity + (selected.get(line.variantId)?.quantity ?? 0);
    if (
      !product ||
      !variant ||
      !variant.inventory?.available ||
      variant.inventory.quantity === 0 ||
      quantity > 999 ||
      (variant.inventory.quantity !== null &&
        quantity > variant.inventory.quantity)
    )
      throw new Error(
        "Um item está indisponível ou a quantidade excede o limite. Revise o carrinho.",
      );
    if (line.priceCents !== variant.priceCents)
      throw new Error(
        "O preço de um item mudou. Remova o item e adicione-o novamente para conferir o valor atual.",
      );
    selected.set(variant.id, {
      productName: product.name,
      variantName: variant.name,
      sku: variant.sku,
      attributes: variant.attributes,
      quantity,
      unitPriceCents: variant.priceCents,
      subtotalCents:
        variant.priceCents === null ? null : variant.priceCents * quantity,
    });
  }
  const items = [...selected.values()];
  const message = buildMessage(parsed.data.customer, items);
  return {
    items,
    message,
    whatsappUrl: `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
  };
}
