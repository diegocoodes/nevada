import { getSettings, getCategories } from "@/lib/store-data";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { BrandShell } from "@/components/brand-shell";
import { PageAtmosphere } from "@/components/page-atmosphere";
import { AmbientLights } from "@/components/ambient-lights";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { SiteIntro } from "@/components/site-intro";
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
      <AmbientLights />
      <SiteIntro logo={settings.logo} />
      <a href="#main" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header logo={settings.logo} name={settings.name} />
      <main id="main">
        <PageAtmosphere>{children}</PageAtmosphere>
      </main>
      <Footer settings={settings} categories={categories} />
      <CartDrawer />
      <FloatingWhatsApp whatsapp={settings.whatsapp} />
    </BrandShell>
  );
}
