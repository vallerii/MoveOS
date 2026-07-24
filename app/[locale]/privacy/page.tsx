import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCALES, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  const dict = getDictionary(params.locale as Locale);
  return { title: `${dict.privacy.title}${dict.meta.titleSuffix}` };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const dict = getDictionary(params.locale as Locale);

  return (
    <main className="container-page py-24">
      <h1 className="text-3xl font-bold text-brand-ink">{dict.privacy.title}</h1>
      <p className="mt-6 max-w-2xl text-brand-ink/70">{dict.privacy.intro}</p>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-brand-ink/70">
        {dict.privacy.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
