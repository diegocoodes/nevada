import { test, expect } from "@playwright/test";

test("faixa entre linhas e seleção mantém movimento contínuo sem controles", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const band = page.locator(".brand-marquee");
  const track = band.locator(".brand-marquee-track");
  await band.scrollIntoViewIfNeeded();
  expect(
    await band.evaluate(
      (element) =>
        element.previousElementSibling?.id === "linhas" &&
        element.nextElementSibling?.classList.contains("featured-section"),
    ),
  ).toBe(true);

  const transform = () =>
    track.evaluate((element) => getComputedStyle(element).transform);
  const initial = await transform();
  await expect.poll(transform).not.toBe(initial);
  await expect(band.getByRole("button")).toHaveCount(0);
});

test("movimento reduzido mantém a faixa estática e legível no celular", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const band = page.locator(".brand-marquee");
  await band.scrollIntoViewIfNeeded();
  await expect(band.locator(".brand-marquee-item").first()).toBeVisible();
  await expect(band.getByRole("button")).toHaveCount(0);
  expect(
    await band
      .locator(".brand-marquee-track")
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
