import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const path = `/${locale}/privacy`;
  return {
    title: `${dict.privacy.title}${dict.meta.titleSuffix}`,
    description: dict.privacy.intro,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/privacy`])),
        "x-default": `/${DEFAULT_LOCALE}/privacy`,
      },
    },
  };
}

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const dict = getDictionary(params.locale as Locale);

  return (
    <main className="container-page py-24">
      <h1 className="font-extrabold tracking-tight text-brand-ink text-section">{dict.privacy.title}</h1>
      <p className="mt-6 max-w-2xl text-body text-brand-ink/70">{dict.privacy.intro}</p>
      <ul className="mt-4 max-w-2xl list-disc space-y-2 pl-5 text-body text-brand-ink/70">
        {dict.privacy.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
