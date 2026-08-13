import Reveal from "../Reveal";
import PillButton from "../PillButton";
import HeroGlow from "../Home/HeroGlow";

type Props = {
  eyebrow: string;
  h1: string;
  subheading: string;
  cta: string;
  ctaMobile?: string;
  badges: string[];
};

/**
 * /host's own hero — deliberately not the pain-page Hero (that component is
 * built around PainSlug: PainIllustration pairs, dict.pains[pain] lookups).
 * Same voice (centred serif headline, one Reveal-staggered column, the
 * bloom wash under it) but a plainer shape: no drawings, one CTA rather
 * than a filled+ghost pair.
 *
 * The badge row under the CTA is HomeHero's exact construction (flex-1
 * divided row — works for any count, not just three) carrying six service
 * labels instead of three outcome badges.
 */
export default function HostHero({ eyebrow, h1, subheading, cta, ctaMobile, badges }: Props) {
  return (
    <section className="relative flex min-h-[85svh] flex-col justify-center overflow-hidden bg-paper py-24">
      <HeroGlow />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="tag">{eyebrow}</p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 whitespace-pre-line font-display text-display text-ink">{h1}</h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl whitespace-pre-line text-body text-slate">{subheading}</p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex justify-center">
              <PillButton href="#calculate" aria-label={cta} className="w-full sm:w-auto">
                <span aria-hidden className="sm:!hidden">
                  {ctaMobile ?? cta}
                </span>
                <span aria-hidden className="hidden sm:!inline">
                  {cta}
                </span>
              </PillButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={400}>
          <div className="mt-16 sm:mt-20">
            {/* Same hairline-divided-cell idea as HomeHero's badge row, just
                a grid instead of a single flex row — six labels wrap to two
                rows of three at sm+ rather than squeezing onto one line the
                way three badges do. Border-collapse trick: the container
                supplies the top/left edge, each cell supplies its own
                bottom/right, so interior lines never double up regardless of
                row/column position. */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 border-l border-t border-hairline sm:grid-cols-3">
              {badges.map((label) => (
                <div key={label} className="border-b border-r border-hairline px-3 py-5 text-center">
                  <p className="text-caption text-slate">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
