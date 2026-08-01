import Link from "next/link";
import Reveal from "../Reveal";
import ArrowLink from "../ArrowLink";
import PainQuotesCarousel from "./PainQuotesCarousel";
import { ChecklistArtifact } from "../Artifacts";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";
import type { HomeCopy } from "@/lib/i18n/home";
import type { Dictionary, Locale } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  copy: HomeCopy;
};

/**
 * Situations block — kept as a bento of four panels, rebuilt in Mist cards
 * at 24px radius with no shadow, no borders, and no gradients.
 *
 * The stat figures moved from oversized teal numerals to serif display
 * numbers, which is where this system puts emphasis: scale and typeface,
 * not colour. The pain links dropped their tinted icon circles for a plain
 * type list — six links don't need six coloured chips.
 */
export default function HomeSituations({ locale, dict, copy }: Props) {
  const { whatWeDo, trustStats, quotes, linksPanel } = copy.situations;

  return (
    // Rides up over the foot of the hero rather than butting against it: a
    // negative top margin plus its own Paper surface, a rounded top edge and
    // a soft upward shadow. As the hero's headline recedes and fades behind
    // it, the effect is of this panel sliding forward over the type.
    //
    // Deliberately a static offset, not a scroll-driven transform — the
    // flight targets live inside this section, and HomeStage measures them
    // with getBoundingClientRect, which includes transforms. Animating the
    // section would move its own landing pads out from under the incoming
    // icons.
    <section
      id="situations"
      className="relative z-30 -mt-12 scroll-mt-24 rounded-t-[2.5rem] bg-paper/50 py-20 shadow-[0_-30px_60px_-30px_rgba(23,25,28,0.13)] sm:-mt-16 sm:py-section"
    >
      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card-neutral relative flex h-full min-h-[22rem] flex-col justify-center overflow-hidden">
              {/* Narrower from lg, where the checklist artifact occupies the
                  panel's bottom-right corner — at max-w-md the body copy runs
                  straight under the card. */}
              <div className="relative z-10 max-w-md lg:max-w-sm">
                <h3 className="font-display text-heading text-ink">{whatWeDo.heading}</h3>
                <p className="mt-5 text-caption text-slate">{whatWeDo.body}</p>
                <div className="mt-8">
                  <ArrowLink href="#quiz" external>
                    {whatWeDo.cta}
                  </ArrowLink>
                </div>
              </div>

              {/* Landing pad for the checklist artifact flown in from the
                  hero (see HomeStage). Below xl nothing flies, so the
                  artifact renders here statically instead. */}
              <div aria-hidden className="pointer-events-none absolute -right-6 bottom-8 hidden lg:block pin:hidden">
                <ChecklistArtifact />
              </div>
              {/* Landing pad for the checklist card. An empty absolutely
                  positioned box, so it's harmless at the breakpoints where
                  nothing flies — no `hidden` needed. */}
              <div
                data-fly-target="0"
                aria-hidden
                className="pointer-events-none absolute -right-6 bottom-8 h-[240px] w-[280px]"
              />
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2">
            <div className="card-neutral flex h-full min-h-[22rem] flex-col justify-between">
              <h3 className="font-display text-heading-sm text-ink">{trustStats.heading}</h3>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                {trustStats.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-heading text-ink">{s.value}</p>
                    <p className="mt-2 text-meta text-slate">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Reveal delay={120}>
            <PainQuotesCarousel quotes={quotes} />
          </Reveal>

          <Reveal delay={160}>
            <div id="situation-links" className="card-neutral h-full scroll-mt-24">
              <h3 className="font-display text-heading-sm text-ink">{linksPanel.heading}</h3>
              <nav className="mt-8 flex flex-col">
                {PAIN_SLUGS.map((slug, i) => {
                  const Icon = PAIN_ICONS[slug];
                  return (
                  <Link
                    key={slug}
                    href={`/${locale}/${slug}`}
                    className={`group flex items-center gap-4 py-3.5 text-base text-ink transition-colors hover:text-slate ${
                      i > 0 ? "border-t border-ink/[0.07]" : ""
                    }`}
                  >
                    {/* Each row's icon is also the landing pad for the
                        matching icon flown down from the hero. The static
                        copy is what shows below xl (and while the flight is
                        still measuring); at xl it's made invisible — not
                        removed — so the row keeps its exact layout and the
                        arriving icon lands on the space it already occupies. */}
                    <span
                      data-fly-target={i + 1}
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-mist"
                    >
                      <Icon className="h-[18px] w-[18px] text-ink pin:invisible" />
                    </span>
                    <span className="flex-1">{dict.pains[slug].shortLabel}</span>
                    <span
                      aria-hidden
                      className="text-ash transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                  );
                })}
              </nav>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
