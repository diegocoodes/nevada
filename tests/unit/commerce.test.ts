import { test } from "node:test";
import assert from "node:assert/strict";
import { prepareWhatsAppOrder } from "../../src/features/checkout/prepare-order";
import { products, settings } from "../../src/data/store";
import { customerSchema, orderSchema } from "../../src/lib/validation";

const customer = {
  name: "Ana",
  phone: "11999999999",
  city: "São Paulo",
  state: "SP" as const,
  postalCode: "",
  notes: "A&B / aplicação + proteção?",
};
const gloss = products.find((product) => product.slug === "ppf-nevada-gloss")!;
const satin = products.find((product) => product.slug === "ppf-nevada-satin")!;
const line = (product = gloss, quantity = 1) => ({
  productId: product.id,
  variantId: product.variants[0].id,
  quantity,
  priceCents: product.variants[0].priceCents,
});
const prepare = (items = [line()]) =>
  prepareWhatsAppOrder(customer, items, products, settings.whatsapp);

test("WhatsApp usa o número exato, todas as seleções e caracteres especiais", () => {
  const result = prepare([line(gloss, 2), line(satin, 1)]);
  const url = new URL(result.whatsappUrl);
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5527988014117");
  assert.equal(url.searchParams.get("text"), result.message);
  assert.ok(result.message.includes(gloss.name));
  assert.ok(result.message.includes(satin.name));
  assert.ok(result.message.includes(gloss.variants[0].name));
  assert.ok(result.message.includes(gloss.variants[0].sku));
  assert.ok(result.message.includes("Acabamento: Brilhante"));
  assert.ok(result.message.includes(customer.notes));
  assert.match(result.message, /Quantidade: 2/);
  assert.match(result.message, /Total de itens: 3/);
  assert.match(result.message, /Sob consulta/);
  assert.match(result.message, /Total final a confirmar/);
  assert.equal(
    result.items[0].subtotalCents,
    2 * gloss.variants[0].priceCents!,
  );
});

test("pedido usa nomes e preços do catálogo, não texto adulterado no carrinho", () => {
  const item = {
    ...line(),
    productName: "Outro produto",
    variantName: "Inventada",
  };
  const result = prepare([item]);
  assert.ok(result.message.includes(gloss.name));
  assert.ok(!result.message.includes("Inventada"));
  assert.throws(
    () => prepare([{ ...line(), priceCents: 1 }]),
    /preço de um item mudou/,
  );
});

test("pedido Nevada preserva o preço de 7,5 m e soma comprimentos diferentes", () => {
  const graphite = products.find(
    (product) => product.slug === "nevada-graphite-nano-ceramica-plus",
  )!;
  const clear = products.find(
    (product) => product.slug === "nevada-clear-ppf",
  )!;
  const result = prepare([
    {
      productId: graphite.id,
      variantId: graphite.variants[1].id,
      quantity: 2,
      priceCents: 56225,
    },
    {
      productId: clear.id,
      variantId: clear.variants[3].id,
      quantity: 1,
      priceCents: 1140000,
    },
  ]);

  assert.equal(result.items[0].variantName, "7,5 metros");
  assert.equal(result.items[0].subtotalCents, 112450);
  assert.equal(result.items[1].variantName, "30 metros");
  assert.equal(result.items[1].subtotalCents, 1140000);
  assert.match(result.message.replace(/\u00a0/g, " "), /R\$ 12\.524,50/);
  assert.equal(new URL(result.whatsappUrl).pathname, "/5527988014117");
});

test("pedido Origin inclui tonalidade, comprimento, garantia e valores comerciais", () => {
  const black = products.find((product) => product.slug === "origin-black")!;
  const professional = products.find(
    (product) => product.slug === "origin-profissional",
  )!;
  const blackVariant = black.variants.find(
    (variant) =>
      variant.attributes.Tonalidade === "35%" &&
      variant.attributes.Comprimento === "7,5 metros",
  )!;
  const result = prepare([
    {
      productId: black.id,
      variantId: blackVariant.id,
      quantity: 2,
      priceCents: 56225,
    },
    {
      productId: professional.id,
      variantId: professional.variants[1].id,
      quantity: 1,
      priceCents: 16500,
    },
    {
      productId: professional.id,
      variantId: professional.variants[2].id,
      quantity: 1,
      priceCents: 33000,
    },
  ]);

  assert.equal(result.items[0].subtotalCents, 112450);
  assert.match(result.message, /Tonalidade: 35%/);
  assert.match(result.message, /Comprimento: 7,5 metros/);
  assert.match(result.message, /Garantia: Vitalícia/);
  assert.match(result.message, /Garantia: 5 anos/);
  assert.match(result.message.replace(/\u00a0/g, " "), /R\$ 1\.619,50/);
  assert.throws(
    () =>
      prepare([
        {
          productId: black.id,
          variantId: "origin-black-35",
          quantity: 1,
          priceCents: null,
        },
      ]),
    /preço de um item mudou/,
  );
  const reflect = products.find(
    (product) => product.slug === "origin-reflect",
  )!;
  assert.match(prepare([line(reflect)]).message, /Sob consulta/);
});

test("rejeita carrinho vazio, itens inexistentes e quantidades inválidas", () => {
  assert.throws(() => prepare([]), /Revise/);
  assert.throws(
    () => prepare([{ ...line(), variantId: "inexistente" }]),
    /indisponível/,
  );
  assert.throws(() => prepare([line(gloss, 1.5)]), /Revise/);
  assert.throws(() => prepare([line(gloss, 0)]), /Revise/);
  assert.throws(() => prepare([line(gloss, 21)]), /quantidade excede/);
});

test("linhas duplicadas são somadas sem ultrapassar a disponibilidade", () => {
  assert.equal(prepare([line(gloss, 2), line(gloss, 3)]).items[0].quantity, 5);
  assert.throws(
    () => prepare([line(gloss, 15), line(gloss, 15)]),
    /quantidade excede/,
  );
});

test("valida cliente, CEP obrigatório e destino antes de abrir conversa", () => {
  assert.equal(
    customerSchema.safeParse({ ...customer, state: "XX" }).success,
    false,
  );
  assert.equal(
    orderSchema.safeParse({ customer, items: [{ ...line(), priceCents: -1 }] })
      .success,
    false,
  );
  assert.throws(
    () =>
      prepareWhatsAppOrder(
        customer,
        [line()],
        products,
        settings.whatsapp,
        true,
      ),
    /CEP/,
  );
  assert.throws(
    () => prepareWhatsAppOrder(customer, [line()], products, ""),
    /WhatsApp/,
  );
});
