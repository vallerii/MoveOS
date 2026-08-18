import Reveal from "./Reveal";
import Glow from "./Glow";
import PillButton from "./PillButton";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";
import { BOOKING_URL } from "@/lib/config";

type Props = {
  dict: Dictionary;
  pain: PainSlug;
};

/**
 * "What you get" — a 3-column grid of neutral feature cards under a serif
 * section heading, with the outcome line promoted to a full-width row.
 *
 * The topographic background image, the connector-dot rail, the icon per
 * card, and the gold glow card are all gone. This section sits on Paper, and
 * DidYouKnow already spends the page's one peach card, so the result row
 * here is a Mist card differentiated by scale and a rule — not by colour.
 */
export default function WhatYouGet({ dict, pain }: Props) {
  const { heading, subheading, items, resultLabel, resultText } = dict.whatYouGet;
  const { heroCta, heroCtaMobile } = dict.pains[pain];

  // Only show the mistakes actually relevant to this pain's page — a deposit
  // page doesn't need to also carry utilities/furniture/early-exit cards.
  const relevantItems = items.filter((item) => item.pains.includes(pain));

  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            <p className="mt-6 max-w-xl text-body text-slate mx-auto">{subheading}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relevantItems.map(({ badge, title }, i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="card-neutral flex h-full flex-col">
                <span className="tag">{badge}</span>
                <p className="mt-6 text-heading-sm text-ink">{title}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={relevantItems.length * 70}>
          {/* The outcome line closes the section, so it gets light the
              feature cards above it don't — enough to separate it from them
              without spending the page's one peach card on it. Clipped to
              the card's own radius, sat under the type at z-0, and at half
              intensity: this is a short full-width band, not a viewport, and
              the blooms are sized for the latter. */}
          <div className="relative mt-4 overflow-hidden card-peach">
            {/* Scaled right down: this card is ~240px tall and the blooms are
                sized for a viewport, so at full size only their pale outer
                edge lands inside it. Shrinking brings the saturated centre
                into the box, which is what actually makes it read as light
                rather than as a grey tint. */}
            
            <div className="relative z-10 flex flex-col gap-8 p-8 sm:flex-row sm:items-start sm:justify-between sm:p-10">
              <span className="tag shrink-0 text-sienna/50">{resultLabel}</span>
              {/* Text and button share one left-aligned column so the CTA
                  sits directly under the payoff line it belongs to, rather
                  than floating at the card's own right edge — this banner is
                  the emotional high point of the page (the reward, right
                  after three cards of what goes wrong), so the ask belongs
                  in the same breath as the outcome, not several scrolls
                  further down. Ghost/outline, not filled — this is the
                  page's second CTA (the hero already carries the one filled
                  button), so it reads as "also here" rather than competing
                  with it. */}
              <div className="flex max-w-2xl flex-col items-start gap-6">
                <p className="font-display text-heading text-sienna">{resultText[pain]}</p>
                <PillButton
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  aria-label={heroCta}
                  className="w-full border-sienna/40 text-sienna sm:w-auto"
                >
                  <span aria-hidden className="sm:!hidden">
                    {heroCtaMobile ?? heroCta}
                  </span>
                  <span aria-hidden className="hidden sm:!inline">
                    {heroCta}
                  </span>
                </PillButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
