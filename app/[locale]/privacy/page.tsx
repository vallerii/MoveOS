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
    <main className="container-page py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-heading-lg text-ink">{dict.privacy.title}</h1>
        <p className="mt-8 text-body text-slate">{dict.privacy.intro}</p>
        {/* Hairline-divided rows rather than bullets — the same list
            treatment used for steps and checklist items elsewhere. */}
        <ul className="mt-12 border-t border-hairline">
          {dict.privacy.items.map((item) => (
            <li key={item} className="border-b border-hairline py-5 text-caption text-slate">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
