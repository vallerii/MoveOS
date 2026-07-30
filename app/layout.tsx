import type { Metadata } from "next";
// Fonts are imported per subset rather than via the bundled `400.css` /
// `500.css` entrypoints. Those pull in every subset @fontsource ships —
// greek, greek-ext and vietnamese included — none of which this site can
// render, since it only serves en/es/ru. Importing latin + latin-ext +
// cyrillic explicitly keeps the emitted @font-face list to what's actually
// reachable.
//
// Sohne substitute — the body/UI/nav sans. The design system leans on
// half-step weights (430/450/480) for hierarchy; Inter ships static cuts at
// 400/500 only, so those two carry the scale and `font-w430`/`w450`/`w480`
// resolve to the nearest available cut via synthetic weighting.
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/cyrillic-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-ext-500.css";
import "@fontsource/inter/cyrillic-500.css";
// Signifier substitute — display/headline serif, weight 400 only. Italic is
// loaded because the hero pattern italicises one phrase mid-sentence.
import "@fontsource/source-serif-4/latin-400.css";
import "@fontsource/source-serif-4/latin-ext-400.css";
import "@fontsource/source-serif-4/cyrillic-400.css";
import "@fontsource/source-serif-4/latin-400-italic.css";
import "@fontsource/source-serif-4/latin-ext-400-italic.css";
import "@fontsource/source-serif-4/cyrillic-400-italic.css";
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
// Fonts: self-hosted via @fontsource (static files, bundled at build time)
// rather than next/font/google, which fetches from Google's CDN during the
// build — a network dependency that can hang or fail in environments with
// restricted egress. Both families ship Cyrillic subsets, needed for the
// Russian locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink antialiased">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
