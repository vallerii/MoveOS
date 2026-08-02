import type { Dictionary, PainSlug } from "@/lib/i18n/types";
import Reveal from "./Reveal";

type Props = { dict: Dictionary; pain: PainSlug };

/**
 * Facts section — a sticky serif heading on the left, a stack of neutral
 * cards on the right, with the final fact promoted to the page's single
 * Accent Peach card.
 *
 * That peach card is the one chromatic surface on a pain page, which is why
 * the "featured" treatment here used to be a dark ink card and no longer
 * is: the system's only dark surface is the filled pill button, and cards
 * never take drop shadows. The per-fact icons are gone too — colour and
 * iconography at this density fought the editorial restraint the layout is
 * built on. Numbering carries the sequence instead.
 */
export default function DidYouKnow({ dict, pain }: Props) {
  const { heading, subheading, facts: factsByPain } = dict.didYouKnow;
  const facts = factsByPain[pain];

  return (
    <section id="didyouknow" className="scroll-mt-24 bg-paper py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mt-6 max-w-sm text-body text-slate">{subheading}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid gap-4">
              {facts.map(({ q, a }, i) => {
                const featured = i === facts.length - 1;
                const index = String(i + 1).padStart(2, "0");

                if (featured) {
                  return (
                    <Reveal key={q} delay={i * 90} direction="right">
                      <div className="relative overflow-hidden card-neutral">
                        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                          <div
                            className="absolute left-[-20%] bottom-[-30%] h-[420px] w-[520px]  rounded-full opacity-70 blur-[70px]"
                            style={{ background: "radial-gradient(closest-side, #98c0eecc, transparent)" }}
                          />
                          <div
                            className="absolute left-[28%] bottom-[-40%] h-[320px] w-[400px] rounded-full opacity-50 blur-[70px]"
                            style={{ background: "radial-gradient(closest-side, #ac9fee, transparent)" }}
                          />
                        </div>
                        <p className="text-meta text-sienna/60 z-10 relative ">{index}</p>
                        <p className="mt-4 text-heading-sm font-w450 text-ink z-10 relative">{q}</p>
                        <p className="mt-3 text-caption text-slate z-10 relative">{a}</p>
                      </div>
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={q} delay={i * 90} direction="right">
                    <div className="card-neutral h-full">
                      <p className="tag">{index}</p>
                      <p className="mt-4 text-heading-sm text-ink">{q}</p>
                      <p className="mt-3 text-caption text-slate">{a}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
