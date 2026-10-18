import { test, expect } from "@playwright/test";

test.use({ launchOptions: { args: ["--enable-unsafe-swiftshader"] } });

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

const shaderTime = async (canvas: import("@playwright/test").Locator) =>
  canvas.evaluate((element: HTMLCanvasElement) => {
    const gl = element.getContext("webgl")!;
    const program = gl.getParameter(gl.CURRENT_PROGRAM) as WebGLProgram;
    return (
      gl.getUniform(
        program,
        gl.getUniformLocation(program, "u_scene")!,
      ) as Float32Array
    )[2];
  });

test("título desenha e animações param automaticamente fora da tela", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "RETÉM",
    }),
  ).toBeVisible();
  await expect(page.locator(".draw-line-text")).toHaveAttribute(
    "data-animation",
    "complete",
  );
  const scene = page.locator(".hero-car-scene");
  await expect(scene).toHaveAttribute("data-active", "true");
  await expect(
    page.getByRole("button", { name: /Pausar|Retomar/ }),
  ).toHaveCount(0);

  const canvas = page.locator(".mesh-drift-canvas");
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-renderer", "webgl");
  await expect(canvas).toHaveAttribute("data-motion", "running");
  await expect(scene).toHaveAttribute("data-active", "false");
  expect(
    await canvas.evaluate((element: HTMLCanvasElement) => {
      const canvasBounds = element.getBoundingClientRect();
      const sectionBounds = element
        .closest(".project-background")!
        .getBoundingClientRect();
      return (
        Math.abs(canvasBounds.width - sectionBounds.width) < 1 &&
        Math.abs(canvasBounds.height - sectionBounds.height) < 1 &&
        element.width <= canvasBounds.width * 2 + 1 &&
        element.height <= canvasBounds.height * 2 + 1
      );
    }),
  ).toBe(true);
  const initial = await shaderTime(canvas);
  await expect
    .poll(async () => Math.abs((await shaderTime(canvas)) - initial))
    .toBeGreaterThan(0.1);
  await page.locator(".hero-luxury").scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-motion", "paused");
  await expect(scene).toHaveAttribute("data-active", "true");
  const paused = await shaderTime(canvas);
  await page.waitForTimeout(200);
  expect(await shaderTime(canvas)).toBe(paused);
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-motion", "running");
  await expect
    .poll(async () => Math.abs((await shaderTime(canvas)) - paused))
    .toBeGreaterThan(0.1);
});

test("movimento reduzido mantém título legível e fundo estático", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".draw-line-text")).toHaveAttribute(
    "data-animation",
    "reduced",
  );
  await expect(page.locator(".draw-text-fallback")).toBeVisible();
  await expect(page.locator(".draw-text-svg")).toBeHidden();
  await expect(page.locator(".hero-car-scene")).toHaveAttribute(
    "data-active",
    "false",
  );
  const canvas = page.locator(".mesh-drift-canvas");
  await canvas.scrollIntoViewIfNeeded();
  await expect(canvas).toHaveAttribute("data-renderer", "webgl");
  await expect(canvas).toHaveAttribute("data-motion", "reduced");
  const initial = await shaderTime(canvas);
  await page.waitForTimeout(200);
  expect(await shaderTime(canvas)).toBe(initial);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("sem WebGL a vitrine continua disponível com o degradê de fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (args[0] === "webgl") return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.goto("/");
  const section = page.locator(".retem-distributor-teaser");
  const background = page.locator(".project-background");
  await section.scrollIntoViewIfNeeded();
  await expect(background.locator("canvas")).toHaveAttribute(
    "data-renderer",
    "fallback",
  );
  await expect(
    section.getByRole("link", { name: "Acessar a distribuidora" }),
  ).toBeVisible();
  expect(
    await background.evaluate(
      (element) => getComputedStyle(element).backgroundImage,
    ),
  ).toContain("linear-gradient");
});
