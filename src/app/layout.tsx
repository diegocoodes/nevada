import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Nevada | Proteção para cada projeto",
    template: "%s | Nevada Distribuidora",
  },
  description:
    "Selecione PPF, películas e produtos de aplicação Nevada. Monte seu pedido e confirme as condições pelo WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Nevada | Proteção para cada projeto",
    images: [{ url: "/images/hero.jpg", width: 1600, height: 1000 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
