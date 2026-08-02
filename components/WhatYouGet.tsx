import Reveal from "./Reveal";
import Glow from "./Glow";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";

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

  // Only show the mistakes actually relevant to this pain's page — a deposit
  // page doesn't need to also carry utilities/furniture/early-exit cards.
  const relevantItems = items.filter((item) => item.pains.includes(pain));

  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            <p className="mt-6 max-w-xl text-body text-slate">{subheading}</p>
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
          <div className="relative mt-4 overflow-hidden rounded-card bg-mist">
            {/* Scaled right down: this card is ~240px tall and the blooms are
                sized for a viewport, so at full size only their pale outer
                edge lands inside it. Shrinking brings the saturated centre
                into the box, which is what actually makes it read as light
                rather than as a grey tint. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
              <div
                className="absolute left-[-10%]  h-[420px] w-[520px]  rounded-full opacity-90 blur-[70px]"
                style={{ background: "radial-gradient(closest-side, #98c0eecc, transparent)" }}
              />
              <div
                className="absolute left-[20%]  h-[320px] w-[400px] rounded-full opacity-70 blur-[70px]"
                style={{ background: "radial-gradient(closest-side, #ac9fee, transparent)" }}
              />
            </div>
            {/* <Glow blooms={["lavender", "sky"]} scale={0.34} intensity={1} /> */}
            <div className="relative z-10 flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <span className="tag shrink-0">{resultLabel}</span>
              <p className="max-w-2xl font-display text-heading text-ink">{resultText[pain]}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
