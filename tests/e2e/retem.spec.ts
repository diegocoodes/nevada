import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ reducedMotion: "reduce" });

test("serviços, dúvidas e localização usam os dados da RETÉM", async ({
  page,
}) => {
  await page.goto("/");
  const services = page.locator("#servicos");
  await services
    .getByRole("button", {
      name: "Películas residenciais e comerciais",
      exact: true,
    })
    .click();
  await expect(
    services.getByRole("region", {
      name: "Películas residenciais e comerciais",
      exact: true,
    }),
  ).toContainText("sua casa ou empresa");
  await services
    .getByRole("link", {
      name: "Consultar Películas residenciais e comerciais",
      exact: true,
    })
    .click();
  await expect(page.getByLabel("Sobre seu projeto")).toHaveValue(
    "Gostaria de um orçamento para Películas residenciais e comerciais.",
  );

  await page.goto("/#faq");
  await page
    .getByText("Vocês aplicam películas em casas e empresas?", { exact: true })
    .click();
  await expect(page.locator("#faq details[open]")).toContainText(
    "medidas aproximadas dos vidros",
  );
  await expect(page.locator("#localizacao address")).toContainText("1528");
  await expect(page.locator("#localizacao address")).toContainText("29102-020");
  await expect(page.locator("#galeria a")).toHaveAttribute(
    "href",
    "https://www.instagram.com/retem.es/",
  );
  await expect(
    page
      .locator("#localizacao")
      .getByRole("link", { name: "Solicitar orçamento pelo WhatsApp" }),
  ).toHaveAttribute("href", "https://wa.me/5527992315115");
  const directions = new URL(
    (await page
      .locator("#localizacao")
      .getByRole("link", { name: "Como chegar" })
      .getAttribute("href"))!,
  );
  expect(directions.searchParams.get("query")).toContain("1528");
});

test("estética e distribuidora trocam marca e tema durante a navegação", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Retém Estética Premium/);
  await expect(page.locator(".storefront")).toHaveAttribute(
    "data-brand",
    "studio",
  );
  await expect(page.locator("header .brand-logo")).toHaveAttribute(
    "src",
    "/images/retem-logo.svg",
  );
  await expect(
    page.getByRole("button", { name: /Abrir carrinho/ }),
  ).toHaveCount(0);
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Serviços", exact: true })
    .click();
  await expect(page.locator("#servicos:visible")).toBeInViewport();
  await page
    .locator("#servicos:visible")
    .getByRole("button", { name: "Películas solares", exact: true })
    .click();
  await expect(
    page.locator("#servicos:visible .lines-preview img"),
  ).toHaveAttribute("alt", "Películas solares");
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Loja Distribuidora", exact: true })
    .click();
  await expect(page).toHaveURL(/\/distribuidora$/);
  await expect(page.locator(".storefront")).toHaveAttribute(
    "data-brand",
    "distributor",
  );
  await expect(page.locator("header .brand-logo")).toHaveAttribute(
    "src",
    "/images/retem-re-light.svg",
  );
  await expect(
    page.getByRole("button", { name: /Abrir carrinho/ }),
  ).toBeVisible();
  await page
    .locator(".desktop-nav")
    .getByRole("link", { name: "Estética Premium", exact: true })
    .click();
  await expect(page.locator(".storefront")).toHaveAttribute(
    "data-brand",
    "studio",
  );
});

test("Origin abre consulta e os filtros de marca se atualizam na mesma rota", async ({
  page,
}) => {
  await page.goto("/distribuidora");
  await page.locator(".origin-brand-card").click();
  await expect(page).toHaveURL(/\/produtos\?marca=origin$/);
  await expect(
    page.getByRole("heading", { name: "Conheça a linha Origin Películas." }),
  ).toBeVisible();
  const contact = page.getByRole("link", {
    name: "Consultar Origin Películas",
    exact: true,
  });
  const href = new URL((await contact.getAttribute("href"))!);
  expect(href.hostname).toBe("wa.me");
  expect(href.searchParams.get("text")).toContain("Origin Películas");
  await page
    .locator(".footer")
    .getByRole("link", { name: "Nevada Films", exact: true })
    .click();
  await expect(page.getByLabel("Nevada Films", { exact: true })).toBeChecked();
  await expect(page.locator(".catalog-grid .product-card")).not.toHaveCount(0);
  await page.getByLabel("Origin Películas", { exact: true }).check();
  await page
    .getByRole("button", { name: "Limpar filtros", exact: true })
    .first()
    .click();
  await expect(
    page.getByLabel("Todas as marcas", { exact: true }),
  ).toBeChecked();
});

test("distribuidora e catálogo são acessíveis e cabem no celular", async ({
  page,
}) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/distribuidora", "/produtos?marca=origin"]) {
      await page.goto(route);
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
  }
});
