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
    default: "Retém Estética Premium | PPF e Películas Automotivas",
    template: "%s | Retém",
  },
  description:
    "Conheça a Retém Estética Premium: cuidado automotivo com foco em PPF e películas. Acesse também a Retém Loja Distribuidora, com Nevada Films e Origin Películas.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Retém Estética Premium | PPF e Películas Automotivas",
    siteName: "Retém",
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
