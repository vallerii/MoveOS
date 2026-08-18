import Reveal from "../Reveal";

type Item = { title: string; body: string };
type Props = {
  heading: string;
  items: Item[];
};

// Column span per item index — hand-picked against the actual copy (items
// 0/4/6/7: Airbnb & Booking, Control, Pricing, Reporting) rather than an
// every-other pattern, so the wide cards land where the extra width earns
// its keep. The four wide (span-2) + four narrow (span-1) cards sum to 12
// column-units, exactly three full rows of the desktop 4-col grid
// (2+1+1, 1+2+1, 2+2) — nothing is left dangling in its own half-empty row.
const WIDE_INDICES = new Set([0, 4, 6, 7]);

/**
 * "Всё управление — в одном месте" — an 8-cell summary grid, deliberately
 * plain (no icons) to match how WhatYouGet/DidYouKnow already ration
 * iconography on this system: colour and per-card icons at this density
 * fight the editorial restraint the rest of the page is built on.
 *
 * Used to sit beside the heading as a plain, uniform 2-column grid. Moved
 * the heading above instead (full width, same pattern as HowItWorks) and
 * gave four of the eight cards a double column span — a heading squeezing
 * the grid into a narrow half-column would leave a "wide" card nowhere to
 * actually be wide. `grid-flow-row-dense` backfills whatever gap the wide
 * cards leave on the 2-column mobile grid too, so the varied layout holds
 * at both widths without an empty cell or anything overflowing its card.
 */
export default function HostCoverageGrid({ heading, items }: Props) {
  return (
    <section className="bg-[#98c0ee]/30 py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-heading-lg text-ink">{heading}</h2>
        </Reveal>

        <div className="mt-12 grid grid-flow-row-dense grid-cols-2 gap-4 sm:grid-cols-4">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 50}
              className={WIDE_INDICES.has(i) ? "col-span-2" : "col-span-1"}
            >
              <div className="card-neutral h-full">
                <p className="text-heading-sm text-ink">{item.title}</p>
                <p className="mt-3 text-caption text-slate">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
