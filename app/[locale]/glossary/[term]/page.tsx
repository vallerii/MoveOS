import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import { getGlossaryCopy, getGlossarySlugs, getGlossaryTerm } from "@/lib/i18n/glossary";
import { BOOKING_URL } from "@/lib/config";
import Breadcrumbs from "@/components/Breadcrumbs";
import PillButton from "@/components/PillButton";

type Params = { locale: string; term: string };

function isValid(params: Params): params is { locale: Locale; term: string } {
  return (
    LOCALES.includes(params.locale as Locale) &&
    getGlossarySlugs(params.locale as Locale).includes(params.term)
  );
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => getGlossarySlugs(locale).map((term) => ({ locale, term })));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isValid(params)) return {};
  const { locale } = params;
  const dict = getDictionary(locale as Locale);
  const term = getGlossaryTerm(locale as Locale, params.term)!;
  const path = `/${locale}/glossary/${term.slug}`;

  return {
    title: `${term.metaTitle}${dict.meta.titleSuffix}`,
    description: term.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/glossary/${term.slug}`])),
        "x-default": `/${DEFAULT_LOCALE}/glossary/${term.slug}`,
      },
    },
    openGraph: {
      title: term.metaTitle,
      description: term.metaDescription,
      type: "article",
      url: path,
      images: ["/og-image.png"],
    },
  };
}

/**
 * One glossary term, one page — definition first, then why it matters, then
 * the pages on this site that continue the topic (the Glossar template in
 * SEO_CONTENT_SYSTEM.md).
 *
 * The DefinedTerm markup is worth the four lines: it states plainly that
 * this page defines one thing, which is what both search engines and
 * answer engines are looking for on a page like this.
 */
export default function GlossaryTermPage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const locale = params.locale as Locale;
  const copy = getGlossaryCopy(locale);
  const term = getGlossaryTerm(locale, params.term)!;
  const t = copy.term;

  const seeAlso = (term.seeAlso ?? [])
    .map((slug) => copy.terms.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: copy.hub.h1,
      url: `/${locale}/glossary`,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd).replace(/</g, "\\u003c") }}
      />

      <Breadcrumbs
        locale={locale}
        items={[{ label: copy.hub.eyebrow, href: "/glossary" }, { label: term.term }]}
      />

      <article className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="font-display text-heading-lg text-ink">{term.term}</h1>
          {term.alsoKnownAs && <p className="mt-3 text-caption text-ash">{term.alsoKnownAs}</p>}

          <h2 className="mt-12 font-display text-heading-sm text-ink">{t.definitionHeading}</h2>
          <p className="mt-4 text-body text-slate">{term.definition}</p>

          <h2 className="mt-12 font-display text-heading-sm text-ink">{t.whyHeading}</h2>
          {term.whyItMatters.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-caption text-slate">
              {paragraph}
            </p>
          ))}

          {term.example && (
            <>
              <h2 className="mt-12 font-display text-heading-sm text-ink">{t.exampleHeading}</h2>
              <p className="mt-4 text-caption text-slate">{term.example}</p>
            </>
          )}

          <h2 className="mt-12 font-display text-heading-sm text-ink">{t.relatedHeading}</h2>
          <ul className="mt-4 border-t border-hairline">
            {term.related.map((link) => (
              <li key={link.href} className="border-b border-hairline">
                <Link
                  href={`/${locale}${link.href}`}
                  className="block py-4 text-caption text-slate transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {seeAlso.length > 0 && (
            <>
              <h2 className="mt-12 font-display text-heading-sm text-ink">{t.seeAlsoHeading}</h2>
              <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {seeAlso.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/${locale}/glossary/${other.slug}`}
                    className="text-caption text-slate underline underline-offset-4 transition-colors hover:text-ink"
                  >
                    {other.term}
                  </Link>
                ))}
              </nav>
            </>
          )}

          {term.sources && (
            <div className="mt-12 border-t border-hairline pt-6">
              <p className="tag">{t.sourcesHeading}</p>
              <ul className="mt-3 space-y-1">
                {term.sources.map((source) => (
                  <li key={source} className="text-meta text-ash">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-meta text-ash">{t.disclaimer}</p>

          <div className="card-neutral mt-16">
            <h2 className="font-display text-heading-sm text-ink">{t.ctaHeading}</h2>
            <p className="mt-3 max-w-xl text-caption text-slate">{t.ctaBody}</p>
            <div className="mt-8">
              <PillButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                {t.ctaButton}
              </PillButton>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
