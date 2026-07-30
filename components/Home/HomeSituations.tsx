import Link from "next/link";
import Reveal from "../Reveal";
import ArrowLink from "../ArrowLink";
import PainQuotesCarousel from "./PainQuotesCarousel";
import { ChecklistArtifact } from "../Artifacts";
import { PAIN_SLUGS } from "@/lib/pains";
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
    <section id="situations" className="scroll-mt-24 bg-paper py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card-neutral relative flex h-full min-h-[22rem] flex-col justify-center overflow-hidden">
              <div className="relative z-10 max-w-md">
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
              <div aria-hidden className="pointer-events-none absolute -right-6 bottom-8 hidden lg:block xl:hidden">
                <ChecklistArtifact />
              </div>
              <div
                data-fly-target="0"
                aria-hidden
                className="pointer-events-none absolute -right-6 bottom-8 hidden w-[280px] xl:block"
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
                {PAIN_SLUGS.map((slug, i) => (
                  <Link
                    key={slug}
                    href={`/${locale}/${slug}`}
                    className={`group flex items-center gap-4 py-3.5 text-base text-ink transition-colors hover:text-slate ${
                      i > 0 ? "border-t border-ink/[0.07]" : ""
                    }`}
                  >
                    {/* The first three rows are where the remaining hero
                        artifacts come to rest. The pad reserves the space
                        at every breakpoint so the list doesn't reflow when
                        the flight kicks in at xl. */}
                    {i < 3 ? (
                      <span data-fly-target={i + 1} aria-hidden className="h-9 w-9 shrink-0 rounded-[10px] bg-ink/[0.04]" />
                    ) : (
                      <span aria-hidden className="h-9 w-9 shrink-0" />
                    )}
                    <span className="flex-1">{dict.pains[slug].shortLabel}</span>
                    <span
                      aria-hidden
                      className="text-ash transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
