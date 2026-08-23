import Link from "next/link";
import Reveal from "../Reveal";
import ArrowLink from "../ArrowLink";
import PainQuotesCarousel from "./PainQuotesCarousel";
import { ChecklistArtifact } from "../Artifacts";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";
import { KeyIcon, CalendarIcon } from "../icons";
import type { HomeCopy } from "@/lib/i18n/home";
import type { Dictionary, Locale } from "@/lib/i18n/types";

// Icon per owner card slug — same idea as PAIN_ICONS, but there are only
// two of these and they're not part of the per-pain Dictionary, so a small
// local map is simpler than widening lib/pains.ts for one component.
const OWNER_ICONS: Record<"host" | "host/first-time", typeof KeyIcon> = {
  "host/first-time": KeyIcon,
  host: CalendarIcon,
};

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
      className="relative z-30 -mt-12 scroll-mt-24 rounded-t-[2.5rem] bg-paper py-20 shadow-[0_-30px_60px_-30px_rgba(23,25,28,0.13)] sm:-mt-16 sm:py-section"
    >
      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            {/* `overflow-hidden` only from lg — below that the artifact
                deliberately bleeds past the card's top-right corner (see
                below), and clipping it there is what caused it to read as
                "cut off". At lg+ it sits flush inside the bottom-right
                corner instead, where clipping the odd sub-pixel of overlap
                is the point. */}
            <div className="card-neutral relative flex h-full min-h-[22rem] flex-col justify-center lg:overflow-hidden">
              {/* Checklist artifact. Below lg it's a normal (non-flying)
                  static graphic, deliberately placed ABOVE the copy and
                  anchored to the card's own top-right corner: `-mr-4 -mt-4`
                  cancels exactly the card's mobile padding (p-4) so the
                  unscaled corner sits flush on the card's outer edge, then
                  `scale-[0.72]` with `origin-top-right` shrinks it toward
                  that same corner — the net effect is the card peeking out
                  over the top and right edge rather than sitting inside the
                  text flow or, worse, absolutely centered on top of it.
                  From lg it's the landing pad for the version flown in from
                  the hero (see HomeStage) — position must match
                  data-fly-target="0" below exactly. */}
              <div
                aria-hidden
                className="pointer-events-none relative z-0 -mr-4 -mt-4 mb-6 ml-auto w-fit origin-top-right scale-[0.72] sm:scale-90 lg:absolute lg:inset-auto lg:-right-6 lg:bottom-8 lg:top-auto lg:z-0 lg:m-0 lg:w-auto lg:scale-100"
              >
                <ChecklistArtifact />
              </div>

              {/* Narrower from lg, where the checklist artifact occupies the
                  panel's bottom-right corner — at max-w-md the body copy runs
                  straight under the card. */}
              <div className="relative z-10 max-w-md lg:max-w-sm">
                <h3 className="font-display text-heading text-ink">{whatWeDo.heading}</h3>
                <p className="mt-5 text-caption text-slate">{whatWeDo.body}</p>
                {/* Jumps to the in-page "what's included" breakdown, not the
                    external booking calendar. The owner link that used to
                    sit here moved to the teaser block below the quotes/links
                    row — this card is tenant-only now. */}
                <div className="mt-8 flex flex-col gap-3">
                  <ArrowLink href="#included">{whatWeDo.cta}</ArrowLink>
                </div>
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
              {/* Both audiences side by side, one flat row, same size for
                  both numbers — the heading above already says the words
                  "arendatorov"/"vladel'tsev", so the count alone (6 vs 2)
                  is what earns the "transparent for landlords" half of it.
                  Stats-only: no links here, those live in HomeOwners. */}
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
          {/* Left column is now two stacked cards, not one stretched to
              match the links panel's height. The quote card used to be the
              lone occupant and relied on grid stretch + its own glow
              graphic to fill the dead space below a short quote (see
              PainQuotesCarousel) — that dead space is now the owner teaser
              instead, so the quote card sizes to its own content and the
              teaser (flex-1) absorbs the rest, keeping the column's total
              height matched to the links panel beside it. */}
          <div className="flex flex-col gap-4">
            <Reveal delay={120} className="min-h-[400px]">
              <PainQuotesCarousel quotes={quotes} />
            </Reveal>

            {/* Owner bridge — shares this column with the quote card rather
                than running full-width below both, so it fills the space a
                short quote used to leave empty instead of adding a new row
                to the section. Same anchor and label (`owners.badge`) as the
                link that used to live in the whatWeDo card above. Renders
                nothing for a locale without owner copy yet.

                `flex flex-1` goes on the Reveal wrapper itself (via
                className), not the card inside it — Reveal's own div is the
                actual flex item in the `flex flex-col` column above, so
                that's the element that has to grow to fill the leftover
                space; flex-1 on a nested div does nothing when its immediate
                parent (Reveal's div) isn't itself a flex container. The
                card then gets `flex-1` too, to fill 100% of that grown
                wrapper rather than just sizing to its own content. */}
            {copy.owners && (
              <Reveal delay={160} className="flex flex-1">
                <div className="card-neutral flex flex-1 flex-col justify-center gap-6 sm:flex-row  sm:justify-between">
                  <div>
                    <h3 className="font-display text-heading text-ink">{copy.owners.teaser.heading}</h3>
                    <p className="mt-3 text-caption text-slate">{copy.owners.teaser.body}</p>
                  </div>
                  <ArrowLink href="#for-owners" className="shrink-0 items-end">
                    {copy.owners.badge}
                  </ArrowLink>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={200}>
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

              {/* Owner scenarios, appended below the six tenant links in
                  the same card — same row markup (icon chip, label, hover
                  arrow) so they read as part of one system rather than a
                  bolted-on extra. Own Reveal + delay so they fade in a
                  beat after the tenant list above, and no data-fly-target:
                  that hero-flying-icon rig is wired to exactly the six
                  PAIN_SLUGS positions in HomeHero/HomeStage, and retrofitting
                  two more slots there is a separate piece of work, not this
                  one. Renders nothing for a locale without owner copy yet. */}
              {copy.owners && (
                <Reveal delay={80}>
                  <div className="mt-2 border-t border-ink/[0.07] pt-2">
                    <p className="pt-4 text-meta text-ash">{copy.owners.badge}</p>
                    <nav className="flex flex-col">
                      {copy.owners.cards.map((card, i) => {
                        const Icon = OWNER_ICONS[card.slug];
                        return (
                          <Link
                            key={card.slug}
                            href={`/${locale}/${card.slug}`}
                            className={`group flex items-center gap-4 py-3.5 text-base text-ink transition-colors hover:text-slate ${
                              i > 0 ? "border-t border-ink/[0.07]" : ""
                            }`}
                          >
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-mist">
                              <Icon className="h-[18px] w-[18px] text-ink" />
                            </span>
                            <span className="flex-1">{card.title}</span>
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
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
