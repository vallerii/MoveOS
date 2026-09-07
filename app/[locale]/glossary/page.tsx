import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import { getGlossaryCopy } from "@/lib/i18n/glossary";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const { hub } = getGlossaryCopy(locale);
  const path = `/${locale}/glossary`;

  return {
    title: `${hub.metaTitle}${dict.meta.titleSuffix}`,
    description: hub.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/glossary`])),
        "x-default": `/${DEFAULT_LOCALE}/glossary`,
      },
    },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      type: "website",
      url: path,
      images: ["/og-image.png"],
    },
  };
}

/**
 * Glossary hub — the parent of every /[locale]/glossary/[term] page.
 *
 * Two groups rather than one alphabetical wall: a tenant reading about
 * their deposit and an owner checking their cédula are looking for
 * different halves of the same vocabulary, and the split is what makes the
 * list scannable. Order inside each group is the authored order in
 * lib/i18n/glossary.ts (most-asked first), not alphabetical.
 */
export default function GlossaryHubPage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const copy = getGlossaryCopy(locale);
  const { hub } = copy;

  const ownerTerms = copy.terms.filter((t) => copy.ownerTerms.includes(t.slug));
  const tenantTerms = copy.terms.filter((t) => !copy.ownerTerms.includes(t.slug));

  const groups = [
    { heading: hub.tenantsHeading, terms: tenantTerms },
    { heading: hub.ownersHeading, terms: ownerTerms },
  ].filter((g) => g.terms.length > 0);

  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: hub.eyebrow }]} />

      <section className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="tag">{hub.eyebrow}</p>
          <h1 className="mt-4 font-display text-heading-lg text-ink">{hub.h1}</h1>
          <p className="mt-6 text-body text-slate">{hub.intro}</p>
        </div>

        {groups.map((group) => (
          <div key={group.heading} className="mt-16">
            <h2 className="font-display text-heading-sm text-ink">{group.heading}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.terms.map((term) => (
                <Reveal key={term.slug}>
                  <Link
                    href={`/${locale}/glossary/${term.slug}`}
                    className="card-neutral block h-full transition-colors hover:bg-[#eaeaec]"
                  >
                    <h3 className="font-display text-heading-sm text-ink">{term.term}</h3>
                    {term.alsoKnownAs && <p className="mt-1 text-meta text-ash">{term.alsoKnownAs}</p>}
                    <p className="mt-4 text-caption text-slate">{term.definition}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
