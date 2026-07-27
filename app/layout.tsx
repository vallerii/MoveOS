import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import MetaPixel from "@/components/MetaPixel";
import { SITE_URL } from "@/lib/config";

// metadataBase lets every nested page use relative URLs (og:image, canonical,
// hreflang) and have Next resolve them to absolute ones automatically —
// without it, Next falls back to localhost during build and warns.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MoveOS — Free Move-Out Check for Barcelona Renters",
  description:
    "Free 15-minute call for Barcelona renters moving out: protect your deposit, handle the admin, and know what to do with what you're leaving behind.",
  openGraph: {
    siteName: "MoveOS",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MoveOS — Barcelona" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

// NOTE: this is the single Next.js root layout, so it must contain the
// <html>/<body> tags per the App Router's rules. Locale-specific <html lang>
// is applied client-side in app/[locale]/layout.tsx via SetHtmlLang, since
// nested layouts can't redeclare html/body.
//
// Font: self-hosted via @fontsource/inter (static files, bundled at build
// time) rather than next/font/google, which fetches from Google's CDN during
// the build — a network dependency that can hang or fail in environments
// with restricted egress. @fontsource also ships Cyrillic subsets, needed
// for the Russian locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
