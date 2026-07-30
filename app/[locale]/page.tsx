import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import Home from "@/components/Home";

type Params = { locale: string };

function isValid(params: Params): params is { locale: Locale } {
  return LOCALES.includes(params.locale as Locale);
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isValid(params)) return {};
  const { locale } = params;
  const dict = getDictionary(locale);
  const path = `/${locale}`;

  // Homepage metadata isn't pain-specific, so it uses the site-wide
  // title/description (same og:image as the pain pages) rather than any
  // one pain's metaTitle/metaDescription.
  return {
    title: `MoveOS${dict.meta.titleSuffix}`,
    description: dict.footer.tagline,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}`])),
        "x-default": `/${DEFAULT_LOCALE}`,
      },
    },
    openGraph: {
      title: "MoveOS",
      description: dict.footer.tagline,
      type: "website",
      url: path,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: "MoveOS",
      description: dict.footer.tagline,
      images: ["/og-image.png"],
    },
  };
}

export default function LocaleIndexPage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const { locale } = params;
  const dict = getDictionary(locale);

  return <Home locale={locale} dict={dict} />;
}
