import Reveal from "../Reveal";
import PillButton from "../PillButton";
import { BOOKING_URL } from "@/lib/config";

type Item = { title: string; body: string };
type Props = {
  heading: string;
  intro: string;
  items: Item[];
  cta: string;
};

/**
 * "Что мы берём на себя" — a plain 3-up card-neutral grid on Paper, the
 * same idiom WhatYouGet/HostEarnings use elsewhere in the system.
 *
 * Deliberately NOT HostServices' sticky-reversed single-column list: this
 * page's services are six short, parallel commitments (screening, contract,
 * deposit, reminders...) rather than a narrative sequence, so a flat grid
 * reads faster than a pinned scroll. Reusing HostServices' exact shape here
 * would also make the two landlord pages feel like one page with swapped
 * copy, which is the thing to avoid.
 */
export default function HostFirstTimeServices({ heading, intro, items, cta }: Props) {
  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            <p className="mx-auto mt-6 max-w-xl text-body text-slate">{intro}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="card-neutral h-full">
                <p className="text-heading-sm text-ink">{item.title}</p>
                <p className="mt-3 text-caption text-slate">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={items.length * 60}>
          <div className="mt-16 flex justify-center">
            <PillButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {cta}
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
