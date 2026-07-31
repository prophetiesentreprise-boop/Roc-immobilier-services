import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { getSiteSettings } from "@/lib/site-settings";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Roc Immobilier SErvices — Agence immobilière à Abidjan",
  description:
    "Vente, achat, location et gestion locative à Abidjan et en Côte d'Ivoire. Estimation gratuite en ligne, recherche de biens et accompagnement personnalisé.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${jakarta.variable} ${plexMono.variable} antialiased`}>
        <Header logoUrl={settings.logo_url} />
        <main>{children}</main>
        <Footer tagline={settings.footer_tagline} logoUrl={settings.logo_url} />
        <Chatbot />
      </body>
    </html>
  );
}
