import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { HOST_COPY, HOST_LOCALES } from "@/lib/i18n/host";
import HostHero from "@/components/Host/HostHero";
import HostEarnings from "@/components/Host/HostEarnings";
import HostServices from "@/components/Host/HostServices";
import HostControlFlow from "@/components/Host/HostControlFlow";
import HostDetailRows from "@/components/Host/HostDetailRows";
import HowItWorks from "@/components/HowItWorks";
import HostCoverageGrid from "@/components/Host/HostCoverageGrid";
import HostTestimonials from "@/components/Host/HostTestimonials";
import HostLeadForm from "@/components/Host/HostLeadForm";
import HostClosingCta from "@/components/Host/HostClosingCta";

type Params = { locale: string };

// Only locales with an entry in HOST_COPY get a real page — /en/host and
// /es/host 404 until translated, rather than silently falling back to
// Russian copy. See lib/i18n/host.ts.
function isValid(params: Params): params is { locale: Locale } {
  return HOST_LOCALES.includes(params.locale as Locale);
}

export function generateStaticParams() {
  return HOST_LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isValid(params)) return {};
  const { locale } = params;
  const copy = HOST_COPY[locale];
  if (!copy) return {};
  const path = `/${locale}/host`;

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(HOST_LOCALES.map((l) => [l, `/${l}/host`])),
        "x-default": `/${DEFAULT_LOCALE}/host`,
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

// Landlord-facing short-term-rental management page. Not part of the
// tenant pain-page funnel: no PAIN_SLUGS, no shared Dictionary, no quiz —
// a different audience with a different single ask (a property estimate),
// which is why the layout and every component here is bespoke to
// components/Host/ rather than reused from the pain-page assembly.
export default function HostPage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const { locale } = params;
  const copy = HOST_COPY[locale];
  if (!copy) notFound();

  return (
    <main>
      <HostHero {...copy.hero} />
      <HostEarnings {...copy.earnings} />
      <HostServices {...copy.services} />
      <HostControlFlow {...copy.control} />
      <HostDetailRows items={copy.details.items} />
      <HowItWorks
        heading={copy.howItWorks.heading}
        subheading=""
        steps={copy.howItWorks.steps}
        cta={copy.howItWorks.cta}
      />
      <HostCoverageGrid {...copy.coverage} />
      <HostTestimonials {...copy.testimonials} />
      <HostLeadForm locale={locale} {...copy.leadForm} />
      <HostClosingCta {...copy.closingCta} />
    </main>
  );
}
