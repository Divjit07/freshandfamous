import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { findAsset } from "@/lib/assets";
import "./globals.css";

const ogImage = findAsset("og");

export const metadata: Metadata = {
  title: {
    default: "Fresh & Famous — 6ES™ Extrait de Parfum",
    template: "%s · Fresh & Famous",
  },
  description:
    "6ES™ Extrait de Parfum. Born in Toronto, built for the world. Luxury isn't a luxury here — it's the baseline.",
  metadataBase: new URL("https://www.freshandfamous.com"),
  openGraph: {
    title: "Fresh & Famous — 6ES™ Extrait de Parfum",
    description: "Born to Stand Out. Built to Be Fresh. Toronto.",
    locale: "en_CA",
    type: "website",
    ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
  },
  ...(ogImage ? { twitter: { card: "summary_large_image", images: [ogImage] } } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-foreground text-background">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
