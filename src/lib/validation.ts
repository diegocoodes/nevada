import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
export const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
] as const;
export const customerSchema = z.object({
  name: text(120).min(2, "Informe seu nome"),
  phone: text(30).refine(
    (value) =>
      /^\+?[\d\s()-]{10,25}$/.test(value) &&
      value.replace(/\D/g, "").length >= 10,
    "Informe um telefone válido",
  ),
  city: text(120).min(2, "Informe sua cidade"),
  state: z.enum(states, { error: "Selecione seu estado" }),
  postalCode: text(9).refine(
    (value) => value === "" || /^\d{5}-?\d{3}$/.test(value),
    "CEP inválido",
  ),
  notes: text(1000),
});
export const orderSchema = z.object({
  customer: customerSchema,
  items: z
    .array(
      z.object({
        productId: text(100).min(1),
        variantId: text(100).min(1),
        quantity: z.number().int().min(1).max(999),
        priceCents: z.number().int().min(0).max(100000000).nullable(),
      }),
    )
    .min(1)
    .max(50),
});
