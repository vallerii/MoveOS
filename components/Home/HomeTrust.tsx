import Link from "next/link";
import Reveal from "../Reveal";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

/**
 * A handful of concrete, sourced facts (not manufactured social proof) to
 * build urgency before the "how it works" step, on a Fog band.
 *
 * The fourth cell is the homepage's single Accent Peach card — the one
 * chromatic surface here, and the only clickable one, which is what earns
 * it the accent. It sits on Fog rather than a colour, per the placement
 * rule for peach. The old gold-glow treatment and the watermark icons
 * behind each fact are both gone.
 */
export default function HomeTrust({ copy }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-heading-lg text-ink">{copy.trust.heading}</h2>
            <p className="mt-6 max-w-xl text-body text-slate">{copy.trust.subheading}</p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {copy.trust.facts.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 80} direction="right">
              {/* Mist cards on a Fog band — the reference pattern for an
                  alternating section; the tonal step is deliberately slight. */}
              <div className="card-neutral flex h-full flex-col">
                <span className="tag">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 text-heading-sm text-ink">{q}</p>
                <p className="mt-3 text-caption text-slate">{a}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={copy.trust.facts.length * 80} direction="right">
            <Link
              href="#quiz"
              className="card-peach group flex h-full flex-col justify-between !p-8 transition-opacity hover:opacity-90"
            >
              <span className="text-meta text-sienna/60">{copy.trust.ctaCard.badge}</span>
              <div className="mt-10">
                <p className="font-display text-heading-sm text-sienna">{copy.trust.ctaCard.text}</p>
                <span
                  aria-hidden
                  className="mt-6 inline-block text-sienna transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
