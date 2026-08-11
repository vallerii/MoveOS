import Reveal from "./Reveal";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";
import Glow from "./Glow";
import WhyUsScene from "./WhyUsScene";

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
        <div className="grid items-center gap-14 lg:grid-cols-[2.5fr_1fr] lg:gap-16">
          <Reveal>
            <div>
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              {intro[pain] && <p className="mt-6 max-w-md text-body text-slate">{intro[pain]}</p>}
              <p
                className={`whitespace-pre-line font-display text-ink ${
                  // Without the intro line, this paragraph is standing in as
                  // the section's main copy rather than a short pull-quote
                  // under it — the pull-quote size (text-heading) reads too
                  // heavy for two full sentences, so it steps down a size.
                  intro[pain] ? "mt-10 border-t border-hairline pt-10 text-heading" : "mt-6 text-heading-sm"
                }`}
              >
                {body[pain]}
              </p>
            </div>
          </Reveal>

          {/* The section image is a drawing of what the sentence beside it
              promises, and it changes with that sentence. It used to be the
              same two product artifacts on all six pages, under six different
              promises — which is exactly the copy-paste feel these pages were
              supposed to lose. */}
          <Reveal delay={120} direction="right">
            <div aria-hidden className="relative mx-auto u-hidden w-full max-w-md sm:block">
              <Glow
                blooms={["peach", "lavender"]}
                scale={0.65}
                intensity={0.65}
                className="absolute right-[50%] top-[40%]"
              />
              <WhyUsScene pain={pain} className="relative z-10 w-full text-ink" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
