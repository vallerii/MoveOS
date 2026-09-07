import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { legalMetadata } from "@/lib/i18n/legal";
import LegalDocument from "@/components/LegalDocument";

// Cookie policy — required by art. 22.2 LSSI-CE because of the Meta Pixel.
// The document's copy lives in lib/i18n/legal.ts; the page itself is
// rendered by components/LegalDocument.tsx, shared with the other three.
const SLUG = "cookies" as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return legalMetadata(params.locale, SLUG);
}

export default function Page({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  return <LegalDocument locale={params.locale as Locale} slug={SLUG} />;
}
