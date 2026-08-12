import Reveal from "../Reveal";
import PillButton from "../PillButton";

type Item = { title: string; body: string; list?: string[] };
type Props = {
  heading: string;
  intro: string;
  items: Item[];
  cta: string;
};

/**
 * "Передайте нам ключи. Остальное организуем мы." — the service breakdown.
 * Same card grid as WhatYouGet (card-neutral, 3-up on desktop), but each
 * card carries a full title+body rather than a badge+title pair, and the
 * last card (Отчётность) grows a bullet list — the one item in the draft
 * that isn't just a paragraph.
 */
export default function HostServices({ heading, intro, items, cta }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
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
              <div className="card-neutral flex h-full flex-col bg-paper">
                <p className="text-heading-sm text-ink">{item.title}</p>
                <p className="mt-3 whitespace-pre-line text-caption text-slate">{item.body}</p>
                {item.list && (
                  <ul className="mt-4 space-y-2">
                    {item.list.map((li) => (
                      <li key={li} className="flex gap-3 text-caption text-slate">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ash" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={items.length * 60}>
          <div className="mt-16 flex justify-center">
            <PillButton href="#calculate">{cta}</PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
