import "server-only";
import { cache } from "react";
import { categories, products, settings } from "@/data/store";

export const getSettings = cache(async () => settings);
export const getCategories = cache(async () =>
  categories
    .filter((category) => category.active)
    .sort((a, b) => a.position - b.position),
);
export const getProducts = cache(async () =>
  products
    .filter((product) => product.active && product.category.active)
    .map((product) => ({
      ...product,
      variants: product.variants.filter((variant) => variant.active),
    })),
);
