import { test, expect } from "@playwright/test";

test("entrada da marca termina e não se repete na navegação interna", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/retem", { waitUntil: "domcontentloaded" });
  const intro = page.locator(".site-entrance");
  await expect(intro).toBeVisible();
  await expect(intro).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    /Seu carro merece\s*proteção de verdade\./i,
  );
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Contato" })
    .click();
  await expect(page).toHaveURL(/\/contato$/);
  await expect(page.locator(".contact-form")).toBeVisible();
  await expect(intro).toHaveCount(0);
});

test("entrada respeita movimento reduzido no celular", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/retem");
  await expect(page.locator(".site-entrance")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("entrada libera a tela mesmo com JavaScript desativado", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("/retem");
  await expect(page.locator(".site-entrance")).toBeHidden({ timeout: 6000 });
  await expect(
    page
      .locator(".desktop-nav")
      .getByRole("link", { name: "Loja Distribuidora" }),
  ).toBeVisible();
  await context.close();
});
