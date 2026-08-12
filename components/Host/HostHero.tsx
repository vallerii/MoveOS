import Reveal from "../Reveal";
import Glow from "../Glow";
import PillButton from "../PillButton";

type Props = {
  eyebrow: string;
  h1: string;
  subheading: string;
  cta: string;
};

/**
 * /host's own hero — deliberately not the pain-page Hero (that component is
 * built around PainSlug: PainIllustration pairs, dict.pains[pain] lookups).
 * Same voice (centred serif headline, one Reveal-staggered column, the
 * bloom wash under it) but a plainer shape: no drawings, no badge row, one
 * CTA rather than a filled+ghost pair — this page's draft only ever asks
 * for one action at a time.
 */
export default function HostHero({ eyebrow, h1, subheading, cta }: Props) {
  return (
    <section className="relative flex min-h-[85svh] flex-col justify-center overflow-hidden bg-paper py-24">
      <Glow scale={0.85} intensity={0.8} />

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
              <PillButton href="#calculate" className="w-full sm:w-auto">
                {cta}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
