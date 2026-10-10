# Recorte do carro da hero

Ferramenta: imagegen integrada, modo de edição com fundo transparente.

Entrada: `public/images/hero-luxury.png`.
Saída: `public/images/hero-car-cutout.png`, PNG com transparência, 1659 × 948 pixels.

O arquivo original foi preservado. A hero mantém seu posicionamento, tamanho e animação.

Prompt utilizado:

```text
Use case: background-extraction. Input image: EDIT TARGET, the current Nevada website hero photograph. Create a precise transparent PNG cutout of ONLY the existing silver sports car. Remove the entire floor, wet ground, scattered reflections and especially the mirrored car reflection below the wheels; remove all black background too. Keep the actual car intact, including both tires, underside, silver body, windows, mirrors and every highlight on its body. Preserve the car's exact original appearance, perspective, lighting, silhouette and wheel design. CRITICAL composition invariant: preserve the full original wide canvas (1659 x 948 pixels, same aspect ratio) and all transparent empty space; keep the car at exactly the same location and size on that canvas. The car currently occupies roughly x=155 through 1510, y=410 through 763: its front faces left, it sits in the lower middle of the original canvas, with substantial empty space above and below. Do not center the cutout, crop, zoom, rotate or move the car. Outside the actual car silhouette use genuine alpha transparency, including every pixel below the tires. No ground plane, shadow below the wheels, floor texture, reflected car, gradient, halo, new objects, text, logos or watermark. This will replace the hero artwork while leaving the existing HTML image dimensions and position unchanged.
```
