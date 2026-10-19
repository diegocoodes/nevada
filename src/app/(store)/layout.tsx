import { getSettings, getCategories } from "@/lib/store-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { BrandShell } from "@/components/brand-shell";
import { PageAtmosphere } from "@/components/page-atmosphere";
export async function generateMetadata() {
  const settings = await getSettings();
  return settings.demoMode ? { robots: { index: false, follow: false } } : {};
}
export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, categories] = await Promise.all([
    getSettings(),
    getCategories(),
  ]);
  return (
    <BrandShell>
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header logo={settings.logo} name={settings.name} />
      <main id="main">
        <PageAtmosphere>{children}</PageAtmosphere>
      </main>
      <Footer settings={settings} categories={categories} />
      <CartDrawer />
    </BrandShell>
  );
}
