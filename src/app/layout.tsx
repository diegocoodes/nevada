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
    default:
      "Retém Estética Premium | Películas, PPF e Coat Cerâmica em Vila Velha",
    template: "%s | Retém",
  },
  description:
    "Películas solares para carro, casa e empresa, PPF, coat cerâmica Gyeon e estética premium. RETÉM em Praia de Itaparica, Vila Velha, ES. Solicite um orçamento.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "RETÉM | Películas, PPF e Estética Premium em Vila Velha",
    description:
      "Proteção para seu carro, casa e empresa. Origin Películas e Gyeon em Praia de Itaparica, Vila Velha, ES.",
    siteName: "Retém",
    images: [
      {
        url: "/images/retem-hero-real.webp",
        alt: "RETÉM · Estética Premium",
      },
    ],
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
