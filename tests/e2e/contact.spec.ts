import { test, expect } from "@playwright/test";

test("seção de contato da home prepara a conversa com nome e e-mail", async ({
  page,
}) => {
  let message = "";
  await page.route("https://wa.me/**", async (route) => {
    const url = new URL(route.request().url());
    expect(url.pathname).toBe("/5527992315115");
    message = url.searchParams.get("text") || "";
    await route.fulfill({
      contentType: "text/html",
      body: "<h1>Conversa preparada</h1>",
    });
  });
  await page.goto("/retem");
  const contact = page.getByRole("region", {
    name: "Entre em contato",
    exact: true,
  });
  await contact.getByLabel("Seu nome").fill("Diego Silva");
  await contact.getByLabel("Seu e-mail").fill("diego@example.com");
  await expect(contact.locator("textarea")).toHaveCount(0);
  await contact.getByRole("button", { name: "Vamos conversar" }).click();
  await expect(page).toHaveURL(/wa\.me\/5527992315115/);
  expect(message).toContain("Nome: Diego Silva");
  expect(message).toContain("E-mail: diego@example.com");
});

test("contato prepara a conversa com os dados do projeto no WhatsApp da loja", async ({
  page,
}) => {
  let message = "";
  await page.route("https://wa.me/**", async (route) => {
    const url = new URL(route.request().url());
    expect(url.pathname).toBe("/5527992315115");
    message = url.searchParams.get("text") || "";
    await route.fulfill({
      contentType: "text/html",
      body: "<h1>Conversa preparada</h1>",
    });
  });
  await page.goto("/contato");
  await page.getByLabel("Seu nome").fill("Diego Silva");
  await page.getByLabel("Seu e-mail").fill("diego+projeto@example.com");
  await page
    .getByLabel("Sobre seu projeto")
    .fill("PPF & Layer / acabamento?\nAplicação para 2 carros.");
  await page.getByRole("button", { name: "Vamos conversar" }).click();
  await expect(page).toHaveURL(/wa\.me\/5527992315115/);
  expect(message).toContain("Nome: Diego Silva");
  expect(message).toContain("E-mail: diego+projeto@example.com");
  expect(message).toContain(
    "Projeto: PPF & Layer / acabamento?\nAplicação para 2 carros.",
  );
});

test("contato exige nome e e-mail válidos e se adapta ao celular", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contato");
  const button = page.getByRole("button", { name: "Vamos conversar" });
  await button.click();
  await expect(page.getByLabel("Seu nome")).toBeFocused();
  await page.getByLabel("Seu nome").fill("Diego");
  await page.getByLabel("Seu e-mail").fill("email-invalido");
  await button.click();
  await expect(page.getByLabel("Seu e-mail")).toBeFocused();
  await page.getByLabel("Seu e-mail").fill("diego@example.com");
  await page.getByLabel("Seu nome").fill("  ");
  await button.click();
  await expect(page.getByLabel("Seu nome")).toBeFocused();
  await expect(page).toHaveURL(/\/contato$/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
