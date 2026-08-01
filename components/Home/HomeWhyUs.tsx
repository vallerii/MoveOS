import Reveal from "../Reveal";
import Glow from "../Glow";
import WhyUsGraphic from "./WhyUsGraphic";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

/**
 * Homepage positioning section — the standard 2-column text + UI feature
 * layout on a Fog band.
 *
 * Previously this was a full-bleed dark ink section with "MoveOS" picked
 * out in accent teal. Neither survives: ink is reserved for type and the
 * filled pill, and headline type is never tinted. The brand name simply
 * sits in the serif heading like the rest of the line.
 */
export default function HomeWhyUs({ copy }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section bg-[#98c0ee]/30">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-heading-lg text-ink">{copy.whyUs.eyebrow}</h2>
              <p className="mt-6 max-w-md text-body text-slate">{copy.whyUs.intro}</p>
            </div>
          </Reveal>

          {/* The card is a white floating artifact on a Fog band, which
              leaves it fairly flat. Two of the hero's blooms sit under it —
              not all three, that's a hero-scale gesture — so the card reads
              as lit from behind. The layer is inset well past the card's own
              edges so the light spills out around it rather than stopping at
              them, and it's scaled back with `intensity` since it's lighting
              one card, not a whole viewport. */}
          <div className="relative">
            <Glow
              blooms={["peach", "lavender"]}
              intensity={0.6}
              className="absolute right-[50%] top-[10%]"
            />
            <Reveal delay={120} direction="right" className="relative z-10">
              <WhyUsGraphic advantages={copy.whyUs.advantages} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
