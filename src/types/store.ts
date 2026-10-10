export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  position: number;
  active: boolean;
};
export type Variant = {
  id: string;
  name: string;
  sku: string;
  attributes: Record<string, string>;
  priceCents: number | null;
  active: boolean;
  inventory: { available: boolean; quantity: number | null } | null;
};
export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  technical: string;
  categoryId: string;
  category: Category;
  active: boolean;
  featured: boolean;
  images: { url: string; alt: string; position: number }[];
  variants: Variant[];
};
export type Settings = {
  name: string;
  logo: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
  hours: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  aboutText: string;
  postalCodeRequired: boolean;
  demoMode: boolean;
};
export type CartLine = {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  image: string;
  priceCents: number | null;
  quantity: number;
};
