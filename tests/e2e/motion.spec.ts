import { test, expect } from "@playwright/test";

test.use({ launchOptions: { args: ["--enable-unsafe-swiftshader"] } });

test("as duas landings revelam conteúdo ao rolar e desativam o movimento sob demanda", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  for (const [route, selector] of [
    ["/", ".campaign-offer-card"],
    ["/distribuidora", ".origin-brand-card"],
  ]) {
    if (route === "/distribuidora") {
      await page.locator(".desktop-nav").getByRole("link", { name: "Loja Distribuidora", exact: true }).click();
      await expect(page).toHaveURL(/\/distribuidora$/);
    }
    const target = page.locator(selector);
    await expect
      .poll(() =>
        target.evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("0");
    await target.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        target.evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("1");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(() =>
        page
          .locator(".campaign-hero-copy h1")
          .evaluate(
            (element) =>
              element.style.opacity === "" && element.style.transform === "",
          ),
      )
      .toBe(true);
    await expect
      .poll(() =>
        target.evaluate(
          (element) =>
            element.style.opacity === "" && element.style.transform === "",
        ),
      )
      .toBe(true);
    await expect(page.locator(".mesh-drift-canvas,.site-intro")).toHaveCount(0);
    await page.emulateMedia({ reducedMotion: "no-preference" });
  }
});

test("hero apresenta os dois caminhos e a navegação leva aos serviços", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.getByRole("region", { name: /Seu carro merece/i });
  await expect(
    hero.getByRole("link", { name: "Solicitar orçamento", exact: true }),
  ).toHaveAttribute("href", "https://wa.me/5527992315115");
  await expect(hero.locator(".hero-photo")).toBeVisible();
  await hero.getByRole("link", { name: "Explore os serviços" }).click();
  await expect(page.locator("#servicos")).toBeInViewport();
  await expect(page.locator(".mesh-drift-canvas")).toHaveCount(0);
});

test("movimento reduzido mantém a apresentação e o seletor acessíveis no celular", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const service = page
    .locator("#servicos")
    .getByRole("button", { name: "Coat cerâmica e vitrificação", exact: true });
  await service.focus();
  await page.keyboard.press("Enter");
  await expect(service).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("region", {
      name: "Coat cerâmica e vitrificação",
      exact: true,
    }),
  ).toContainText("Gyeon");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".site-intro,.mesh-drift-canvas")).toHaveCount(0);
});

test("cards aparecem ao rolar e mudar para movimento reduzido remove as transformações", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/distribuidora");
  for (const selector of [
    ".featured-section .product-grid",
    ".purchase-grid",
  ]) {
    const grid = page.locator(selector);
    await grid.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        grid
          .locator("article")
          .evaluateAll((elements) =>
            elements.every(
              (element) => getComputedStyle(element).opacity === "1",
            ),
          ),
      )
      .toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      page
        .locator(".purchase-card")
        .evaluateAll((elements) =>
          elements.every(
            (element) =>
              element.style.opacity === "" && element.style.transform === "",
          ),
        ),
    )
    .toBe(true);
});
