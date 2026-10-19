import { test, expect } from "@playwright/test";

for (const route of ["/", "/distribuidora"]) {
  test(`WhatsApp permanece no canto ao rolar e funciona pelo teclado em ${route}`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    const whatsapp = page.getByRole("link", {
      name: "Falar com a RETÉM pelo WhatsApp",
      exact: true,
    });
    await expect(whatsapp).toHaveAttribute(
      "href",
      "https://wa.me/5527992315115",
    );
    await expect(whatsapp).toHaveAttribute("target", "_blank");
    const before = await whatsapp.boundingBox();
    expect(before).not.toBeNull();
    await page.evaluate(() =>
      window.scrollTo({ top: 1800, behavior: "instant" }),
    );
    const after = await whatsapp.boundingBox();
    expect(after!.x).toBeCloseTo(before!.x, 0);
    expect(after!.y).toBeCloseTo(before!.y, 0);
    await expect
      .poll(() =>
        whatsapp.evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
      )
      .toBe("retem-whatsapp-pulse");
    await whatsapp.focus();
    await expect(whatsapp).toBeFocused();
    const box = await whatsapp.boundingBox();
    expect(
      await page.evaluate(
        ({ x, y }) =>
          document
            .elementFromPoint(x, y)
            ?.closest("a")
            ?.classList.contains("floating-whatsapp"),
        { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 },
      ),
    ).toBe(true);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(() =>
        whatsapp.evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
      )
      .toBe("none");
    await page.setViewportSize({ width: 320, height: 844 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(whatsapp).toBeInViewport();
  });

  test(`títulos se revelam e as luzes respeitam movimento reduzido em ${route}`, async ({
    page,
  }) => {
    const hydrationErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" && /hydrat/i.test(message.text())) {
        hydrationErrors.push(message.text());
      }
    });
    page.on("pageerror", (error) => hydrationErrors.push(error.message));
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(route);
    const title = page.locator(
      route === "/" ? "#home-contact-title" : "#brands-title",
    );
    const words = title.locator(".motion-word");
    await expect
      .poll(() =>
        words.first().evaluate((element) => getComputedStyle(element).opacity),
      )
      .toBe("0");
    await title.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        words.evaluateAll((elements) =>
          elements.every(
            (element) => getComputedStyle(element).opacity === "1",
          ),
        ),
      )
      .toBe(true);
    const light = page.locator(".ambient-light-left");
    await expect
      .poll(() =>
        light.evaluate((element) => getComputedStyle(element).animationName),
      )
      .toBe("retem-light-left");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect
      .poll(() =>
        light.evaluate((element) => getComputedStyle(element).animationName),
      )
      .toBe("none");
    await expect
      .poll(() =>
        page
          .locator(".motion-word")
          .evaluateAll((elements) =>
            elements.every(
              (element) =>
                (element as HTMLElement).style.transform === "" &&
                (element as HTMLElement).style.opacity === "",
            ),
          ),
      )
      .toBe(true);
    await expect(title).toBeVisible();
    await expect(page.locator(".site-entrance")).toBeHidden();
    expect(hydrationErrors).toEqual([]);
  });
}
