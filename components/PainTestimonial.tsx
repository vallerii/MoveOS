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
 * Tenant testimonial block for the pain pages.
 *
 * Primary path: dict.testimonial.items[pain] — 2-3 short quotes authored
 * specifically for this pain, rendered as a static card row, same pattern
 * as /host's HostTestimonials and /host/first-time's
 * HostFirstTimeTestimonials (heading centred above a sm:grid-cols-3 of
 * hook/quote/name cards). Static rather than an auto-advancing carousel on
 * purpose — this section sits right before the page's FAQ/booking ask, so
 * the visitor should be able to scan every proof point at their own pace
 * rather than have the content change under them mid-read.
 *
 * Fallback: a locale/pain without its own `items` yet (see lib/i18n/types.ts)
 * falls back to the single shared quote from HomeCopy.situations.quotes
 * (lib/i18n/home.ts, index-matched 1:1 to PAIN_SLUGS) in the original
 * heading-beside-a-card layout — so EN/ES keep rendering something
 * meaningful until they get their own authored set.
 *
 * Placed between WhyUs and FAQ/the closing contact block: last piece of
 * social proof right before the page's ask, same position Testimonials
 * has on /host and /host/first-time.
 */
export default function PainTestimonial({ dict, locale, pain }: Props) {
  const items = dict.testimonial.items?.[pain];

  if (items && items.length > 0) {
    return (
      <section className="bg-fog py-20 sm:py-section">
        <div className="container-page">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-center font-display text-heading-lg text-ink">
              {dict.testimonial.heading}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {items.map((item, i) => (
              <Reveal key={item.name} delay={i * 70}>
                <div className="card-neutral flex h-full flex-col bg-paper">
                  <p className="font-display text-heading-sm text-ink">{item.hook}</p>
                  <p className="mt-4 flex-1 text-caption text-slate">{item.quote}</p>
                  <p className="mt-6 border-t border-hairline pt-4 text-meta text-ash">{item.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
