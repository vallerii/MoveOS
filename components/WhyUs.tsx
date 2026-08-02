import Reveal from "./Reveal";
import { StatArtifact, TimelineArtifact } from "./Artifacts";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";
import Glow from "./Glow";

type Props = { dict: Dictionary; pain: PainSlug };

/**
 * Positioning statement — a 2-column text + product-UI layout, the standard
 * feature-section pattern in this system.
 *
 * Previously this was a full-bleed dark ink section with animated dashed
 * wave lines behind it. Both are out: ink is reserved for type and the
 * filled pill button, and there are no abstract background graphics. The
 * per-pain body line now carries the section as a serif pull-quote instead
 * of accent-coloured text.
 */
export default function WhyUs({ dict, pain }: Props) {
  const { heading, intro, body } = dict.whyUs;

  return (
    <section className=" bg-[#98c0ee]/30 py-20 sm:py-section">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mt-6 max-w-md text-body text-slate">{intro}</p>
              <p className="mt-10 max-w-md border-t border-hairline pt-10 font-display text-heading text-ink">
                {body[pain]}
              </p>
            </div>
          </Reveal>

          {/* Product artifacts stand in for the section image — cropped UI
              fragments floating on the fog band, per the imagery rules. */}
          <Reveal delay={120} direction="right">
            <div aria-hidden className="relative mx-auto hidden h-[320px] w-full max-w-md sm:block">
              <Glow
                blooms={["peach", "lavender"]}
                scale={0.65}
                intensity={0.65}
                className="absolute right-[50%] top-[30%]"
              />
              <div className="absolute left-0 top-4 animate-drift">
                <StatArtifact value="1 840 €" delta="↑ 3.2×" />
              </div>
              <div className="absolute bottom-4 right-0">
                <TimelineArtifact />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
