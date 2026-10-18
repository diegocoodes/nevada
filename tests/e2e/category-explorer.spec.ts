import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/distribuidora");
});

test("selecionar uma linha troca a informação e a imagem na distribuidora", async ({
  page,
}) => {
  const section = page.locator("#linhas");
  const preview = section.locator(".lines-preview");
  const ppf = section.getByRole("button", { name: "PPF", exact: true });
  await expect(ppf).toHaveAttribute("aria-pressed", "true");
  await expect(
    preview.getByRole("img", { name: "PPF", exact: true }),
  ).toBeVisible();

  await section
    .getByRole("button", { name: "Películas solares", exact: true })
    .click();
  await expect(ppf).toHaveAttribute("aria-pressed", "false");
  await expect(
    section.getByRole("region", { name: "Películas solares", exact: true }),
  ).toContainText("Conforto para dirigir");
  await expect(
    preview.getByRole("img", { name: "Películas solares", exact: true }),
  ).toHaveAttribute("src", /solar-film\.webp/);
  await expect(page).toHaveURL(/\/distribuidora$/);

  await section
    .getByRole("button", { name: "Produtos de aplicação", exact: true })
    .click();
  await expect(
    preview.getByRole("img", { name: "Produtos de aplicação", exact: true }),
  ).toHaveAttribute("src", /application-products\.webp/);
  await section
    .getByRole("link", {
      name: "Explorar a linha Produtos de aplicação",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/produtos\?categoria=produtos-aplicacao$/);
  await expect(page.getByText("4 produtos encontrados")).toBeVisible();
});

test("lista funciona com teclado e mantém o conteúdo acessível no celular", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const section = page.locator("#linhas");
  const ppf = section.getByRole("button", { name: "PPF", exact: true });
  await ppf.focus();
  await page.keyboard.press("Tab");
  await expect(
    section.getByRole("link", { name: "Explorar a linha PPF", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  const color = section.getByRole("button", {
    name: "Nevada Color",
    exact: true,
  });
  await expect(color).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(color).toHaveAttribute("aria-pressed", "true");
  await expect(
    section.getByRole("region", { name: "Nevada Color", exact: true }),
  ).toContainText("Cor e proteção");
  await expect(section.locator(".lines-preview img")).toHaveAttribute(
    "alt",
    "Nevada Color",
  );

  await ppf.focus();
  await page.keyboard.press("Space");
  await expect(ppf).toHaveAttribute("aria-pressed", "true");
  await expect(section.locator(".lines-preview img")).toHaveAttribute(
    "alt",
    "PPF",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const audit = await new AxeBuilder({ page })
    .include("#linhas")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    audit.violations.map((violation) => ({
      id: violation.id,
      targets: violation.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});
