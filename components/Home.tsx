import QuizSection from "./Quiz/QuizSection";
import HomeStage from "./Home/HomeStage";
import HomeHero from "./Home/HomeHero";
import HomeSituations from "./Home/HomeSituations";
import HomeTrust from "./Home/HomeTrust";
import HomeHowItWorks from "./Home/HomeHowItWorks";
import HomeIncluded from "./Home/HomeIncluded";
import HomeWhyUs from "./Home/HomeWhyUs";
import HomeOwners from "./Home/HomeOwners";
import FAQ from "./FAQ";
import { HOME_COPY } from "@/lib/i18n/home";
import { getTrustArticles } from "@/lib/datocms";
import type { Dictionary, Locale } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Homepage — assembled from per-block components in components/Home/.
// Order after the hero: situation picker first (gets an anxious visitor to
// their specific problem as fast as possible), then trust articles, how it
// works, what's included, and the positioning statement — the tenant
// journey end to end. HomeOwners is the one section for the other
// audience, placed after the tenant journey completes rather than spliced
// into it, so the tested tenant funnel above stays untouched. FAQ and the
// quiz close the page for both audiences.
export default async function Home({ locale, dict }: Props) {
  const copy = HOME_COPY[locale];
  const trustArticles = await getTrustArticles(locale);

  return (
    <main>
      {/* Hero and situations share one scroll stage: the product artifacts
          fly out of the hero and land in the section below, so both have to
          sit inside the same coordinate space. See HomeStage. */}
      <HomeStage>
        <HomeHero copy={copy} />
        <HomeSituations locale={locale} dict={dict} copy={copy} />
      </HomeStage>
      <HomeTrust copy={copy} locale={locale} articles={trustArticles} />
      <HomeHowItWorks copy={copy} />
      <HomeIncluded copy={copy} />
      <HomeWhyUs copy={copy} />
      {/* Tenant journey ends at HomeWhyUs — this is the one section that
          sends an owner visitor to /host or /host/first-time instead of
          leaving the nav dropdown as the only way to find them. Renders
          nothing for a locale without owner copy yet (see HomeOwners). */}
      <HomeOwners copy={copy} locale={locale} />
      <FAQ {...copy.faq} />

      {/* Closing contact block — the same static booking card every pain
          page ends on now (see components/Quiz/QuizSection.tsx): a real
          path to booking a call for anyone who scrolls this far without
          picking a card above. */}
      <QuizSection locale={locale} dict={dict} />
    </main>
  );
}
