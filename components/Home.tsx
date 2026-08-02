import QuizSection from "./Quiz/QuizSection";
import HomeHero from "./Home/HomeHero";
import HomeSituations from "./Home/HomeSituations";
import HomeTrust from "./Home/HomeTrust";
import HomeHowItWorks from "./Home/HomeHowItWorks";
import HomeWhyUs from "./Home/HomeWhyUs";
import HomeIncluded from "./Home/HomeIncluded";
import { HOME_COPY } from "@/lib/i18n/home";
import type { Dictionary, Locale } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Homepage — assembled from per-block components in components/Home/.
// Order after the hero: situation picker first (gets an anxious visitor to
// their specific problem as fast as possible), then trust facts, how it
// works, the positioning statement, a per-situation breakdown of what's
// included (right before the quiz — the last rational objection to answer
// before asking for the quiz commitment), and the quiz itself.
export default function Home({ locale, dict }: Props) {
  const copy = HOME_COPY[locale];

  return (
    <main>
      <HomeHero copy={copy} />
      <HomeSituations locale={locale} dict={dict} copy={copy} />
      <HomeTrust copy={copy} />
      <HomeHowItWorks copy={copy} />
      
      <HomeIncluded copy={copy} />
      <HomeWhyUs copy={copy} />
      {/* QUIZ — the same generic city/timeframe quiz used at the bottom of
          every pain page (QuizWizard doesn't actually branch on `pain`, so
          it works here as-is): a real path to a result for anyone who
          scrolls this far without picking a card above. */}
      <QuizSection locale={locale} dict={dict} />
    </main>
  );
}
