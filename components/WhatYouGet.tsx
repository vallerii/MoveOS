import Reveal from "./Reveal";
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
          <div className="mt-4 flex flex-col gap-6 rounded-card bg-mist p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <span className="tag shrink-0">{resultLabel}</span>
            <p className="max-w-2xl font-display text-heading text-ink">{resultText}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
