import { test, expect } from "@playwright/test";

test("apresentação mostra o processo e direciona para as marcas oficiais", async ({
  page,
}) => {
  await page.goto("/retem");
  await expect(page.locator(".atelier-process-grid article")).toHaveCount(3);
  await expect(
    page.locator(".studio-brands").getByRole("link", { name: /ORIGIN/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/originpeliculas/");
  await expect(
    page.locator(".studio-brands").getByRole("link", { name: /GYEON/ }),
  ).toHaveAttribute("href", "https://www.instagram.com/gyeon_brasil/");
  await expect(
    page.getByText("Imagens ilustrativas.", { exact: false }),
  ).toBeVisible();
});

test("layout mantém a identidade principal nas páginas sobre e contato", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/sobre", "/contato"]) {
      await page.goto(route);
      await expect(page.locator("header .brand-logo")).toHaveAttribute(
        "src",
        "/images/retem-logo.svg",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator(".mesh-drift-canvas")).toHaveCount(0);
    }
  }
});
