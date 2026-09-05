import Reveal from "../Reveal";
import Glow from "../Glow";
import PillButton from "../PillButton";
import { BOOKING_URL } from "@/lib/config";

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
 *
 * The section wash (bg-fog + a soft blue tint) and the peach/lavender glow
 * behind the heading match HomeWhyUs's "Почему Movingo" treatment exactly —
 * same highlight, applied to this page's own lead line.
 */
export default function HostServices({ heading, intro, items, cta }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section bg-[#98c0ee]/30">
      <div className="container-page relative z-10">

        <div className="flex flex-col lg:flex-row-reverse lg:items-start lg:gap-16">
          <Reveal className="relative lg:sticky lg:top-32 lg:shrink-0">
            
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mx-auto mt-6 max-w-xl text-body text-slate">{intro}</p>
              <Reveal delay={items.length * 60}>
                <div className="mt-16 flex justify-center">
                  <PillButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    {cta}
                  </PillButton>
                </div>
              </Reveal>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="card-neutral flex h-full flex-col bg-paper relative overflow-hidden">
                  {i === items.length - 1 && (
                    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                      <div
                        className="absolute right-[-20%] bottom-[-30%] h-[320px] w-[420px]  rounded-full opacity-70 blur-[70px]"
                        style={{ background: "radial-gradient(closest-side, #98c0eecc, transparent)" }}
                      />
                      <div
                        className="absolute right-[28%] bottom-[-40%] h-[220px] w-[400px] rounded-full opacity-50 blur-[70px]"
                        style={{ background: "radial-gradient(closest-side, #ac9fee, transparent)" }}
                      />
                    </div>
                  )}
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
        </div>
        
      </div>
    </section>
  );
}
