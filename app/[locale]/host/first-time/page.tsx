import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { HOST_FIRST_TIME_COPY, HOST_FIRST_TIME_LOCALES } from "@/lib/i18n/hostFirstTime";
import { BOOKING_URL } from "@/lib/config";
import HostFirstTimeHero from "@/components/HostFirstTime/HostFirstTimeHero";
import HostFirstTimeServices from "@/components/HostFirstTime/HostFirstTimeServices";
import HostFirstTimeTrust from "@/components/HostFirstTime/HostFirstTimeTrust";
import FAQ from "@/components/FAQ";
import HowItWorks from "@/components/HowItWorks";
import HostFirstTimeTestimonials from "@/components/HostFirstTime/HostFirstTimeTestimonials";
import HostClosingCta from "@/components/Host/HostClosingCta";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getDictionary } from "@/lib/i18n";

type Params = { locale: string };

// Only locales with an entry in HOST_FIRST_TIME_COPY get a real page —
// same 404-rather-than-fallback gating as /[locale]/host (see
// lib/i18n/host.ts). Currently ru-only.
function isValid(params: Params): params is { locale: Locale } {
  return HOST_FIRST_TIME_LOCALES.includes(params.locale as Locale);
}

export function generateStaticParams() {
  return HOST_FIRST_TIME_LOCALES.map((locale) => ({ locale }));
}

/** Breadcrumb label — matches the header's "For Owners" dropdown wording. */
const CRUMB: Record<Locale, string> = {
  en: "First-Time Landlord",
  es: "Primer alquiler",
  ru: "Первая сдача",
};

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isValid(params)) return {};
  const { locale } = params;
  const copy = HOST_FIRST_TIME_COPY[locale];
  if (!copy) return {};
  const path = `/${locale}/host/first-time`;

  return {
    title: `${copy.meta.title}${getDictionary(locale).meta.titleSuffix}`,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(HOST_FIRST_TIME_LOCALES.map((l) => [l, `/${l}/host/first-time`])),
        "x-default": `/${DEFAULT_LOCALE}/host/first-time`,
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      type: "website",
      url: path,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.meta.title,
      description: copy.meta.description,
      images: ["/og-image.png"],
    },
  };
}

/**
 * Landlord-facing "first time renting out" landing page — hypothesis 2
 * (see the product brief: an owner who's never rented before, doesn't know
 * the process, and is specifically afraid of a bad tenant and okupas).
 *
 * Sibling to /[locale]/host, not a variant of it: same design system and
 * several literally-shared components (FAQ, HowItWorks, HostClosingCta,
 * and PainQuotesCarousel via HostFirstTimeTestimonials), but a deliberately
 * different composition and rhythm — an asymmetric two-column hero instead
 * of a centred one, a plain services grid instead of a sticky-reversed
 * list, an accordion FAQ instead of open editorial rows, a stats-led trust
 * block instead of a "control flow" statement, and a heading-beside-carousel
 * testimonials row instead of a static 3-card grid. See the per-component
 * comments in components/HostFirstTime/ for the specific "why not just
 * reuse Host's version" reasoning.
 *
 * No lead form on this page (HostFirstTimeLeadForm was removed) — every
 * CTA points straight at BOOKING_URL instead of scrolling to one, same
 * pattern the rest of the site now uses for its old "#quiz" buttons (see
 * components/Quiz/QuizSection.tsx). HowItWorks and HostClosingCta default
 * their own CTA to the in-page "#calculate" anchor for /host's benefit
 * (it still has HostLeadForm), so this page overrides both explicitly.
 */
export default function HostFirstTimePage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const { locale } = params;
  const copy = HOST_FIRST_TIME_COPY[locale];
  if (!copy) notFound();

  return (
    <main>
      {/* Flat trail rather than Home / Short-Term Rental / First-Time
          Landlord: the URL nests this page under /host, but the two pages
          are siblings aimed at different owners, so a trail implying it's a
          sub-page of short-term rental would mislead the reader. */}
      <Breadcrumbs locale={locale} items={[{ label: CRUMB[locale] }]} />
      <HostFirstTimeHero {...copy.hero} />
      <HostFirstTimeServices {...copy.services} />
      <HostFirstTimeTrust {...copy.trust} />
      <FAQ heading={copy.faq.heading} items={copy.faq.items} align="left" />
      <HowItWorks
        heading={copy.howItWorks.heading}
        subheading=""
        steps={copy.howItWorks.steps}
        cta={copy.howItWorks.cta}
        ctaHref={BOOKING_URL}
        ctaTarget="_blank"
        ctaRel="noopener noreferrer"
      />
      <HostFirstTimeTestimonials {...copy.testimonials} />
      <HostClosingCta
        {...copy.closingCta}
        ctaHref={BOOKING_URL}
        ctaTarget="_blank"
        ctaRel="noopener noreferrer"
        withTopPadding
        glow
      />
    </main>
  );
}
