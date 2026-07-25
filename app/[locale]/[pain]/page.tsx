import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCALES, PAIN_SLUGS, type Locale, type PainSlug } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import Hero from "@/components/Hero";
import WhatYouGet from "@/components/WhatYouGet";
import DidYouKnow from "@/components/DidYouKnow";
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
  const dict = getDictionary(params.locale);
  const p = dict.pains[params.pain];
  return {
    title: `${p.h1}${dict.meta.titleSuffix}`,
    description: p.subheading,
    openGraph: { title: p.h1, description: p.subheading, type: "website" },
  };
}

export default function PainPage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const { locale, pain } = params;
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero locale={locale} pain={pain} dict={dict} />
      <DidYouKnow dict={dict} pain={pain} />
      <WhatYouGet dict={dict} pain={pain} />
      <WhyUs dict={dict} pain={pain} />
      <QuizSection locale={locale} pain={pain} dict={dict} />
    </main>
  );
}
