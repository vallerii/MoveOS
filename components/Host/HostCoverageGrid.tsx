import Reveal from "../Reveal";

type Item = { title: string; body: string };
type Props = {
  heading: string;
  items: Item[];
};

/**
 * "Всё управление — в одном месте" — an 8-cell summary grid, deliberately
 * plain (no icons) to match how WhatYouGet/DidYouKnow already ration
 * iconography on this system: colour and per-card icons at this density
 * fight the editorial restraint the rest of the page is built on.
 */
export default function HostCoverageGrid({ heading, items }: Props) {
  return (
    <section className="bg-[#98c0ee]/30 py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-heading-lg text-ink">{heading}</h2>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
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
