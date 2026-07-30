import QuizSection from "./Quiz/QuizSection";
import HomeStage from "./Home/HomeStage";
import HomeHero from "./Home/HomeHero";
import HomeSituations from "./Home/HomeSituations";
import HomeTrust from "./Home/HomeTrust";
import HomeHowItWorks from "./Home/HomeHowItWorks";
import HomeWhyUs from "./Home/HomeWhyUs";
import { HOME_COPY } from "@/lib/i18n/home";
import type { Dictionary, Locale } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Homepage — assembled from per-block components in components/Home/.
// Order after the hero: situation picker first (gets an anxious visitor to
// their specific problem as fast as possible), then trust facts, how it
// works, the positioning statement, and the quiz.
export default function Home({ locale, dict }: Props) {
  const copy = HOME_COPY[locale];

  return (
    <main>
      {/* Hero and situations share one scroll stage: the product artifacts
          fly out of the hero and land in the section below, so both have to
          sit inside the same coordinate space. See HomeStage. */}
      <HomeStage>
        <HomeHero copy={copy} />
        <HomeSituations locale={locale} dict={dict} copy={copy} />
      </HomeStage>
      <HomeTrust copy={copy} />
      <HomeHowItWorks copy={copy} />
      <HomeWhyUs copy={copy} />

      {/* QUIZ — the same generic city/timeframe quiz used at the bottom of
          every pain page (QuizWizard doesn't actually branch on `pain`, so
          it works here as-is): a real path to a result for anyone who
          scrolls this far without picking a card above. */}
      <QuizSection locale={locale} dict={dict} />
    </main>
  );
}
