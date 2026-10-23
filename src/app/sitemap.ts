import type { MetadataRoute } from "next";
import { getProducts, getSettings } from "@/lib/store-data";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if ((await getSettings()).demoMode) return [];
  const url = getSiteUrl();
  return [
    ...["", "/retem", "/distribuidora", "/produtos", "/sobre", "/contato"].map(
      (path) => ({
        url: `${url}${path}`,
      }),
    ),
    ...(await getProducts()).map((product) => ({
      url: `${url}/produtos/${product.slug}`,
    })),
  ];
}
