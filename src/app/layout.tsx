import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { BusinessJsonLd } from "@/components/JsonLd";
import { RevealProvider } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Marriage Proposal Planning NYC | Proposal Perfection NYC",
    template: "%s | Proposal Perfection NYC",
  },
  description:
    "Luxury marriage proposal planning in New York City. Flower arches, flower walls, custom signage and full proposal styling — designed, delivered, styled and cleared away by one team.",
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title: "Marriage Proposal Planning NYC | Proposal Perfection NYC",
    description:
      "Flower arches, flower walls and full proposal design across the five boroughs.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <BusinessJsonLd />
        <RevealProvider />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
