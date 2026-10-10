import { money } from "@/lib/utils";
import type { z } from "zod";
import type { customerSchema } from "@/lib/validation";
export type OrderSnapshot = {
  productName: string;
  variantName: string;
  quantity: number;
  unitPriceCents: number | null;
  subtotalCents: number | null;
  sku: string;
  attributes: Record<string, string>;
};
export function buildMessage(
  customer: z.infer<typeof customerSchema>,
  items: OrderSnapshot[],
) {
  const total = items.reduce((sum, item) => sum + (item.subtotalCents ?? 0), 0);
  const quote = items.some((item) => item.unitPriceCents === null);
  return [
    "Olá! Gostaria de fazer um pedido pela distribuidora Nevada.",
    "",
    "PRODUTOS",
    "",
    ...items.flatMap((item) => [
      `Produto: ${item.productName}`,
      `Variação: ${item.variantName}`,
      `SKU: ${item.sku}`,
      ...Object.entries(item.attributes).map(
        ([key, value]) => `${key}: ${value}`,
      ),
      `Quantidade: ${item.quantity}`,
      `Valor unitário: ${money(item.unitPriceCents)}`,
      `Subtotal: ${money(item.subtotalCents)}`,
      "",
    ]),
    "RESUMO",
    `Total de itens: ${items.reduce((sum, i) => sum + i.quantity, 0)}`,
    `${quote ? "Subtotal dos itens com preço" : "Subtotal do pedido"}: ${money(total)}`,
    ...(quote ? ["Há itens sob consulta. Total final a confirmar."] : []),
    "",
    "DADOS DO CLIENTE",
    `Nome: ${customer.name}`,
    `Telefone: ${customer.phone}`,
    `Cidade/UF: ${customer.city}/${customer.state}`,
    ...(customer.postalCode ? [`CEP: ${customer.postalCode}`] : []),
    ...(customer.notes ? [`Observações: ${customer.notes}`] : []),
    "",
    "Gostaria de confirmar a disponibilidade, o frete e as formas de pagamento.",
  ].join("\n");
}
