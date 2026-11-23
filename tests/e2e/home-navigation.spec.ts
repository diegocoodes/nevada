import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ reducedMotion: "reduce" });

test("início abre a estética diretamente e mantém o acesso à distribuidora", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("header.header")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Seu carro merece",
  );
  await expect(page.locator(".experience-entry")).toHaveCount(0);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^http:\/\/localhost:3100\/?$/,
  );
  await expect(page.locator(".storefront")).toHaveAttribute(
    "data-brand",
    "studio",
  );
  await page.locator("header .brand").click();
  await expect(page).toHaveURL("/");
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Loja Distribuidora", exact: true })
    .click();
  await expect(page).toHaveURL(/\/distribuidora$/);
  await expect(page.locator(".storefront")).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)",
  );
  await expect(page.locator(".origin-line")).toHaveCount(7);
  await page
    .locator(".origin-line")
    .filter({
      has: page.getByRole("heading", {
        name: "Origin Black — Nano Cerâmica",
        exact: true,
      }),
    })
    .getByRole("link", { name: "Escolher variação" })
    .click();
  await expect(page).toHaveURL(/\/produtos\/origin-black$/);
  await page
    .getByRole("radio", { name: /Tonalidade 35% · 7,5 metros/ })
    .check();
  await expect(page.locator(".detail-price strong")).toHaveText(/562,25/);
  await expect(page.locator(".technical")).toContainText("Garantia: Vitalícia");
  const consultation = new URL(
    (await page
      .getByRole("link", { name: "Falar com especialista" })
      .getAttribute("href"))!,
  );
  expect(consultation.searchParams.get("text")).toContain("Tonalidade 35%");
  expect(consultation.searchParams.get("text")).toContain("7,5 metros");
  await page
    .getByRole("button", { name: "Adicionar ao carrinho", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Origin Black");
  await expect(page.getByRole("dialog")).toContainText("Tonalidade 35%");
  await expect(page.getByRole("dialog")).toContainText("7,5 metros");
  await expect(
    page.getByRole("dialog").locator(".cart-line-total"),
  ).toContainText("562,25");
});

test("site principal e distribuidora funcionam sem JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const [name, destination] of [
    ["Loja Distribuidora", "/distribuidora"],
    ["Estética Premium", "/"],
  ]) {
    await page
      .locator(".desktop-nav")
      .getByRole("link", { name, exact: true })
      .click();
    await expect(page).toHaveURL(destination);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await context.close();
});

test("endereço antigo redireciona para o site principal e preserva parâmetros", async ({
  page,
  request,
}) => {
  const response = await request.get("/retem?origem=link-antigo", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/?origem=link-antigo");
  await page.goto("/retem#servicos");
  await expect(page).toHaveURL("/#servicos");
  await expect(page.locator("#servicos")).toBeInViewport();
});

test("site principal é acessível e cabe em celular, tablet e desktop", async ({
  page,
}) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      audit.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map(({ target }) => target),
      })),
    ).toEqual([]);
  }
});
