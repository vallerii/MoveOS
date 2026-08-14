import Reveal from "./Reveal";
import PainQuotesCarousel from "./Home/PainQuotesCarousel";
import { PAIN_SLUGS } from "@/lib/i18n/types";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";
import { HOME_COPY } from "@/lib/i18n/home";

type Props = {
  dict: Dictionary;
  locale: Locale;
  pain: PainSlug;
};

/**
 * Tenant testimonial block for the pain pages — same shape as
 * /host/first-time's HostFirstTimeTestimonials (heading beside a
 * PainQuotesCarousel card, not a title-then-grid stack), reused here for
 * the tenant side rather than rebuilt: same component, same card, same
 * dot-pagination mechanics.
 *
 * The one real difference is content, not layout: each pain page only has
 * ONE illustrative quote of its own — HomeCopy.situations.quotes
 * (lib/i18n/home.ts) already carries exactly six, index-matched 1:1 to
 * PAIN_SLUGS ("Разобрали процедуру и сроки. Депозит защищён." is quotes[0],
 * for `deposit`, and so on) — rather than author six more per-pain quotes
 * (×3 locales) that would just be near-duplicates of ones already
 * illustrating the same situation on the homepage. PainQuotesCarousel takes
 * an array, so this passes a single-item one: the dot row collapses to one
 * dot and the 5s auto-advance is a no-op, which is fine — the component
 * doesn't need a single-item special case to look right.
 *
 * Placed between WhyUs and FAQ/the closing contact block: last piece of
 * social proof right before the page's ask, same position Testimonials
 * has on /host and /host/first-time.
 */
export default function PainTestimonial({ dict, locale, pain }: Props) {
  const quote = HOME_COPY[locale].situations.quotes[PAIN_SLUGS.indexOf(pain)];
  if (!quote) return null;

  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-heading-lg text-ink">{dict.testimonial.heading}</h2>
          </Reveal>

          <Reveal delay={100} direction="right" className="lg:col-span-8">
            <PainQuotesCarousel quotes={[quote]} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
