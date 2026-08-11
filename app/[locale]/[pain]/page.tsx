import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCALES, PAIN_SLUGS, DEFAULT_LOCALE, type Locale, type PainSlug } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import DidYouKnow from "@/components/DidYouKnow";
import HowItWorks from "@/components/HowItWorks";
import RepairShowcase from "@/components/RepairShowcase";
import FurnitureNotes from "@/components/FurnitureNotes";
import RelatedPains from "@/components/RelatedPains";
import FAQ from "@/components/FAQ";
import WhyUs from "@/components/WhyUs";
import QuizSection from "@/components/Quiz/QuizSection";

type Params = { locale: string; pain: string };

function isValid(params: Params): params is { locale: Locale; pain: PainSlug } {
  return LOCALES.includes(params.locale as Locale) && PAIN_SLUGS.includes(params.pain as PainSlug);
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => PAIN_SLUGS.map((pain) => ({ locale, pain })));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isValid(params)) return {};
  const { locale, pain } = params;
  const dict = getDictionary(locale);
  const p = dict.pains[pain];
  // metaTitle/metaDescription are dedicated, short copy for search snippets
  // and social cards — h1/subheading are written for the hero and run well
  // past what Google displays (~60 / ~155 chars) before truncating.
  const title = `${p.metaTitle}${dict.meta.titleSuffix}`;
  const { metaDescription: description } = p;
  const path = `/${locale}/${pain}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/${pain}`])),
        "x-default": `/${DEFAULT_LOCALE}/${pain}`,
      },
    },
    openGraph: {
      title: p.metaTitle,
      description,
      type: "website",
      url: path,
      images: ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: p.metaTitle,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default function PainPage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const { locale, pain } = params;
  const dict = getDictionary(locale);
  const { howItWorks, secondaryHowItWorks, furnitureNotes, relatedPains, faq } = dict.pains[pain];

  return (
    <main>
      <Hero locale={locale} pain={pain} dict={dict} />
      <DidYouKnow dict={dict} pain={pain} />
      <WhatYouGet dict={dict} pain={pain} />

      {howItWorks &&
        (pain === "repair" ? (
          <RepairShowcase
            heading={howItWorks.heading}
            intro={howItWorks.intro}
            steps={howItWorks.steps}
            ctaText={howItWorks.subheading}
            ctaLabel={dict.pains[pain].heroCta}
          />
        ) : (
          <HowItWorks pain={pain} {...howItWorks} />
        ))
      }
      {relatedPains && <RelatedPains locale={locale} dict={dict} {...relatedPains} />}

      {/* repair-only: the plain numbered-list "Как это работает" every other
          pain page uses for its process steps — repair's `howItWorks` above
          is spent on the RepairShowcase card grid instead. */}
      {secondaryHowItWorks && <HowItWorks pain={pain} {...secondaryHowItWorks} />}
      {furnitureNotes && <FurnitureNotes {...furnitureNotes} />}
      <WhyUs dict={dict} pain={pain} />
      {/* Objection-handling, right before the ask — last chance to resolve
          cost/timeline/"what if I disagree" doubts before the quiz. */}
      {faq && <FAQ {...faq} />}
      <QuizSection locale={locale} dict={dict} pain={pain} />
    </main>
  );
}
