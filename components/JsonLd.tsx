import { SITE_URL, CONTACT_EMAIL } from "@/lib/config";
import { LOCALES, type Locale } from "@/lib/i18n/types";

/**
 * Structured data (schema.org JSON-LD).
 *
 * Rendered as a plain <script type="application/ld+json"> rather than through
 * next/script: Google's crawler reads the initial HTML, and next/script's
 * default strategy injects after hydration, which the parser can miss.
 *
 * dangerouslySetInnerHTML is unavoidable for JSON-LD — React escapes text
 * children, which would corrupt the JSON. Every value below is authored in
 * this repo (no user input reaches it), and JSON.stringify escapes `<` so a
 * stray "</script>" in copy can't break out of the tag.
 */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Organization — the entity behind the site. This is what feeds a knowledge
 * panel and, more immediately, what tells Google that "Movingo" is a brand
 * name rather than a typo of "moving". That matters more than usual right
 * now: the site was MoveOS until this rebrand, and the old name still has
 * whatever authority it accumulated. An explicit `name` + `url` + `logo`
 * triple is the strongest signal available for the new one.
 */
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Movingo",
        url: `${SITE_URL}/${locale}`,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-image.png`,
        email: CONTACT_EMAIL,
        areaServed: {
          "@type": "City",
          name: "Barcelona",
          address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
        },
        // The three locales the site actually serves — mirrors LOCALES so
        // this can't drift from the hreflang set the pages declare.
        availableLanguage: LOCALES.map((l) => l.toUpperCase()),
      }}
    />
  );
}

/**
 * WebSite — pairs with Organization and gives the homepage a name distinct
 * from the org's, which is what search engines use for the sitelinks title.
 */
export function WebSiteJsonLd({ locale, name }: { locale: Locale; name: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/${locale}`,
        name,
        inLanguage: locale,
        publisher: { "@id": `${SITE_URL}/#organization` },
      }}
    />
  );
}

/**
 * FAQPage — the one piece of markup here with a visible payoff: it can earn
 * an expandable FAQ block in the result. Only emit it where the questions
 * and answers are genuinely on the page (see the `faq` guard at each call
 * site); marking up content a visitor can't see is a structured-data
 * violation, not a shortcut.
 */
export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }}
    />
  );
}
