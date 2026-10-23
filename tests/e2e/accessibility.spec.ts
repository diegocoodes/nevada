import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("home e produto acessíveis, imagens carregadas e layouts responsivos", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/retem");
    await page
      .locator(".hero-photo")
      .evaluate((image: HTMLImageElement) => image.decode());
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
    if (width !== 768)
      await page.screenshot({
        path: `.local/home-${width}.png`,
        fullPage: true,
      });
  }
  await page.goto("/produtos/ppf-nevada-gloss");
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    audit.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});
