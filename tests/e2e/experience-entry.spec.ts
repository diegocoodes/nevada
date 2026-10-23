import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ reducedMotion: "reduce" });

test("entrada oferece as duas experiências e mantém cada navegação em sua área", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("header.header")).toHaveCount(0);
  await page.getByRole("link", { name: /Entrar no site Retém/ }).click();
  await expect(page).toHaveURL(/\/retem$/);
  await expect(page.locator(".storefront")).toHaveAttribute(
    "data-brand",
    "studio",
  );
  await page.locator("header .brand").click();
  await expect(page).toHaveURL(/\/retem$/);
  await page.goto("/");
  await page.getByRole("link", { name: /Entrar na Retém Loja/ }).click();
  await expect(page).toHaveURL(/\/distribuidora$/);
  await expect(page.locator(".storefront")).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)",
  );
  await expect(page.locator(".origin-line")).toHaveCount(6);
  await page
    .locator(".origin-line")
    .filter({
      has: page.getByRole("heading", { name: "Origin Black", exact: true }),
    })
    .getByRole("link", { name: "Escolher tonalidade" })
    .click();
  await expect(page).toHaveURL(/\/produtos\/origin-black$/);
  await page.getByRole("radio", { name: /Tonalidade 35%/ }).check();
  const consultation = new URL(
    (await page
      .getByRole("link", { name: "Falar com especialista" })
      .getAttribute("href"))!,
  );
  expect(consultation.searchParams.get("text")).toContain("Tonalidade 35%");
  await page
    .getByRole("button", { name: "Adicionar ao carrinho", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toContainText("Origin Black");
  await expect(page.getByRole("dialog")).toContainText("Tonalidade 35%");
});

test("as duas escolhas funcionam sem JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const [name, destination] of [
    [/Entrar no site Retém/, "/retem"],
    [/Entrar na Retém Loja/, "/distribuidora"],
  ] as const) {
    await page.goto("/");
    await page.getByRole("link", { name }).click();
    expect(new URL(page.url()).pathname).toBe(destination);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await context.close();
});

test("entrada é acessível e cabe em celular, tablet e desktop", async ({
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
