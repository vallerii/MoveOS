import Reveal from "../Reveal";
import PainQuotesCarousel from "../Home/PainQuotesCarousel";

type Item = { hook: string; quote: string; name: string };
type Props = {
  heading: string;
  items: Item[];
};

/**
 * "Что говорят владельцы" — on request, rebuilt from HostTestimonials'
 * static 3-card grid into the same auto-advancing single-card carousel the
 * homepage's Situations bento uses (PainQuotesCarousel: numbered tag, serif
 * pull-quote, one line of context, name, dot pagination — 5s auto-advance,
 * clickable dots). Heading sits beside it instead of centred above, so the
 * two read as one row rather than a title-then-grid stack.
 *
 * PainQuotesCarousel's own field names (quote/resolved/name) come from the
 * homepage's pain→resolution framing; this page's data is authored as
 * hook/quote/name (see lib/i18n/hostFirstTime.ts) — mapped 1:1 below rather
 * than renaming the shared component's props, since /repair-style reuse
 * elsewhere in this codebase always adapts the caller's data to the
 * existing component rather than the other way round. Card order stays
 * exactly what it was: the pull-quote first, the underlying situation
 * second, who said it last.
 */
export default function HostFirstTimeTestimonials({ heading, items }: Props) {
  const quotes = items.map(({ hook, quote, name }) => ({ quote: hook, resolved: quote, name }));

  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
          </Reveal>

          <Reveal delay={100} direction="right" className="lg:col-span-8">
            <PainQuotesCarousel quotes={quotes} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
