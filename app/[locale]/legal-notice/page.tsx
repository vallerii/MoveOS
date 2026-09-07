import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { legalMetadata } from "@/lib/i18n/legal";
import LegalDocument from "@/components/LegalDocument";

// Aviso Legal — the provider-identity page required by art. 10 LSSI-CE.
// The document's copy lives in lib/i18n/legal.ts; the page itself is
// rendered by components/LegalDocument.tsx, shared with the other three.
const SLUG = "legal-notice" as const;

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
