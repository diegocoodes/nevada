import { test, expect } from "@playwright/test";

test("produtos e passos rolam horizontalmente no mobile sem overflow da página", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/distribuidora");
    for (const selector of [
      ".featured-section .product-grid",
      ".purchase-grid",
    ]) {
      const carousel = page.locator(selector);
      await carousel.scrollIntoViewIfNeeded();
      expect(
        await carousel.evaluate(
          (element) => element.scrollWidth > element.clientWidth,
        ),
      ).toBe(true);
      await carousel.focus();
      await page.keyboard.press("ArrowRight");
      await expect
        .poll(() => carousel.evaluate((element) => element.scrollLeft))
        .toBeGreaterThan(0);
      await carousel.evaluate((element) =>
        element.scrollTo({ left: element.scrollWidth, behavior: "instant" }),
      );
      await expect(carousel.locator("article").last()).toBeInViewport({
        ratio: 0.95,
      });
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("desktop mantém as grades e as etapas sem numeração decorativa", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/distribuidora");
  await page.locator(".purchase-grid").scrollIntoViewIfNeeded();
  for (const selector of [
    ".featured-section .product-grid",
    ".purchase-grid",
  ]) {
    expect(
      await page
        .locator(selector)
        .evaluate((element) => element.scrollWidth <= element.clientWidth),
    ).toBe(true);
  }
  const cards = page.locator(".purchase-card");
  await expect(cards).toHaveCount(3);
  const positions = await cards.evaluateAll((elements) =>
    elements.map((element) => {
      const number = element
        .querySelector(".purchase-number")!
        .getBoundingClientRect();
      const title = element.querySelector("h3")!.getBoundingClientRect();
      return number.top < title.top;
    }),
  );
  expect(positions).toEqual([true, true, true]);
  await expect(page.locator(".step-number")).toHaveCount(0);
});
