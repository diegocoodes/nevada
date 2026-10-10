import type { Metadata } from "next";
import { getSettings, getProducts } from "@/lib/store-data";
import { WhatsAppCheckout } from "@/features/checkout/whatsapp-checkout";
export const metadata: Metadata = {
  title: "Seu pedido",
  robots: { index: false, follow: false },
};
export default async function CheckoutPage() {
  const [s, products] = await Promise.all([getSettings(), getProducts()]);
  return (
    <div className="section container">
      <div className="page-heading">
        <p className="eyebrow">ÚLTIMO PASSO DA SUA SELEÇÃO</p>
        <h1>Vamos conversar sobre seu pedido.</h1>
        <p className="muted">
          Informe seus dados para continuar o atendimento pelo WhatsApp.
        </p>
      </div>
      <WhatsAppCheckout
        postalCodeRequired={s.postalCodeRequired}
        whatsapp={s.whatsapp}
        products={products}
      />
    </div>
  );
}
