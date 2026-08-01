import Link from "next/link";
import Reveal from "../Reveal";
import { MagnifyingGlassIcon } from "../icons";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

/**
 * A handful of concrete, sourced facts (not manufactured social proof) to
 * build urgency before the "how it works" step, on a Fog band.
 *
 * Laid out with a deliberate size hierarchy, following the reference: three
 * compact Mist cards and the Accent Peach card share one row, with the
 * accent card wider and taller than the facts beside it. Keeping it last
 * preserves the reading order — facts first, then the invitation — while
 * size and colour still make it the thing the eye lands on. It's the page's
 * single peach surface and the only clickable cell here, which is what earns
 * it the accent.
 *
 * Each grey card leads with a short topic label rather than the fact
 * sentence itself. Those sentences run to three lines at heading size, which
 * made the cards tall and the row heavy; as body copy under a two-word
 * heading they read faster and the cards stay small.
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

        {/* One row of nine columns: the three facts share six, the accent
            card takes three. That's what makes it the biggest cell without
            moving it out of reading order.

            `items-end` on the outer row rather than the default stretch —
            stretching would pull the grey cards up to the accent card's
            height and erase the size difference this layout exists for.
            Aligning the bottoms keeps the row tidy while letting the accent
            card run taller than the facts.

            The facts then sit in their own nested grid, which DOES stretch,
            so the three of them equalise against each other and their
            bottoms line up. A fixed min-height would have done it too, but
            not across three locales with three different text lengths. */}
        <div className="mt-16 grid items-end gap-4 lg:grid-cols-9">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-3">
            {copy.trust.facts.map(({ label, q, a }, i) => (
              <Reveal key={q} delay={i * 80} direction="right" className="h-full">
                <div className="card-neutral flex h-full flex-col !p-6">
                  <p className="text-heading-sm text-ink">{label}</p>
                  <p className="mt-4 text-caption text-ink">{q}</p>
                  <p className="mt-3 text-meta text-slate">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={copy.trust.facts.length * 80} direction="right" className="lg:col-span-3">
            <Link
              href="#quiz"
              className="card-peach group relative flex flex-col justify-between overflow-hidden !p-8 transition-opacity hover:opacity-90"
            >
              {/* The one icon in this section, and it sits in the background
                  rather than in the content flow: centred vertically, nudged
                  right of centre, and tinted far down so the headline reads
                  straight over it. Decorative, so it's hidden from assistive
                  tech — the link's own text already says where it goes. */}
              <MagnifyingGlassIcon
                aria-hidden
                className="pointer-events-none absolute left-[58%] top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 text-sienna/[0.09]"
              />

              <span className="relative z-10 text-meta text-sienna/60">{copy.trust.ctaCard.badge}</span>

              <p className="relative z-10 mt-28 font-display text-heading text-sienna">
                {copy.trust.ctaCard.text}
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
