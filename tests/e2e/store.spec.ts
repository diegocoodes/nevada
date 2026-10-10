import { test, expect } from "@playwright/test";

test("seleção persiste e finaliza sem API no WhatsApp correto com todos os itens", async ({
  page,
}) => {
  await page.goto("/produtos/ppf-nevada-gloss");
  await page.getByRole("button", { name: "Aumentar quantidade" }).click();
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  const drawer = page.getByRole("dialog");
  await expect(drawer.getByLabel("Quantidade", { exact: true })).toHaveText(
    "2",
  );
  await drawer.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.goto("/produtos/ppf-nevada-satin");
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  await drawer.getByRole("button", { name: "Fechar", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Abrir carrinho, 3 itens" }).click();
  await drawer.getByRole("link", { name: "Continuar para o pedido" }).click();
  await page.getByLabel("Nome *", { exact: true }).fill("Cliente de teste");
  await page.getByLabel("Telefone *", { exact: true }).fill("11999999999");
  await page.getByLabel("Cidade *", { exact: true }).fill("São Paulo");
  await page.getByLabel("Estado *", { exact: true }).selectOption("SP");
  await page
    .getByLabel("Observações (opcional)")
    .fill("A&B + proteção / película?");
  let message = "";
  const apiPosts: string[] = [];
  page.on("request", (request) => {
    if (
      request.method() === "POST" &&
      new URL(request.url()).pathname.startsWith("/api/")
    )
      apiPosts.push(request.url());
  });
  await page.route("https://wa.me/**", async (route) => {
    const url = new URL(route.request().url());
    expect(url.pathname).toBe("/558186020710");
    message = url.searchParams.get("text") || "";
    await route.fulfill({
      contentType: "text/html",
      body: "<h1>Conversa preparada para teste</h1>",
    });
  });
  await page.getByRole("button", { name: "Finalizar pelo WhatsApp" }).click();
  await expect(page).toHaveURL(/wa\.me\/558186020710/);
  expect(message).toContain("PPF Nevada Gloss");
  expect(message).toContain("PPF Nevada Satin");
  expect(message).toContain("Acabamento: Brilhante");
  expect(message).toContain("Quantidade: 2");
  expect(message).toContain("Total de itens: 3");
  expect(message).toContain("Total final a confirmar");
  expect(message).toContain("Cliente de teste");
  expect(message).toContain("A&B + proteção / película?");
  expect(apiPosts).toEqual([]);
  await page.goto("/checkout");
  await expect(
    page.getByText("PPF Nevada Gloss", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("PPF Nevada Satin", { exact: true }),
  ).toBeVisible();
});

test("catálogo filtra categoria, pesquisa e preço", async ({ page }) => {
  await page.goto("/produtos");
  await page.getByPlaceholder("Nome do produto").fill("Gloss");
  await expect(page.getByText("1 produtos encontrados")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "PPF Nevada Gloss" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  await page.getByLabel("Produtos de aplicação", { exact: true }).check();
  await expect(page.getByText("4 produtos encontrados")).toBeVisible();
  await page.getByPlaceholder("Até", { exact: true }).fill("100");
  await expect(page.getByText("2 produtos encontrados")).toBeVisible();
  await page.getByPlaceholder("Nome do produto").fill("inexistente");
  await expect(
    page.getByRole("heading", { name: "Nenhum produto encontrado." }),
  ).toBeVisible();
});

test("mobile sem overflow, menu e drawer com teclado", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Produtos", exact: true })
    .click();
  await page.getByRole("button", { name: "Filtros", exact: true }).click();
  await page.getByLabel("PPF", { exact: true }).check();
  await expect(page.getByText("3 produtos encontrados")).toBeVisible();
  await page.getByRole("button", { name: "Abrir carrinho, 0 itens" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Abrir carrinho, 0 itens" }),
  ).toBeFocused();
});

test("carrinho vazio e dados inválidos não abrem conversa", async ({
  page,
}) => {
  await page.goto("/checkout");
  await expect(
    page.getByRole("heading", { name: "Seu carrinho está vazio." }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Finalizar pelo WhatsApp" }),
  ).toHaveCount(0);
  await page.goto("/produtos/ppf-nevada-gloss");
  await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Continuar para o pedido" })
    .click();
  await page.getByRole("button", { name: "Finalizar pelo WhatsApp" }).click();
  await expect(page.getByText("Informe seu nome")).toBeVisible();
  await expect(page).toHaveURL(/\/checkout$/);
});

test("rotas antigas de banco e administração não estão disponíveis", async ({
  request,
}) => {
  expect((await request.get("/admin")).status()).toBe(404);
  expect((await request.post("/api/orders", { data: {} })).status()).toBe(404);
});
