import Reveal from "../Reveal";
import WhyUsBackground from "../WhyUsBackground";
import WhyUsGraphic from "./WhyUsGraphic";
import type { HomeCopy } from "@/lib/i18n/home";


type Props = {
  copy: HomeCopy;
};

// Homepage-only version of WhyUs: same dark bg-brand-ink section as before
// (per-pain WhyUs.tsx/WhyUsBackground are untouched), but "Почему MoveOS" is
// now the big two-tone headline itself (no small pill eyebrow, no separate
// accent statement line below it) paired with a dark "what we do" graphic
// card instead of the plain centered paragraph.
export default function HomeWhyUs({ copy }: Props) {
  // Every locale's eyebrow ends with the untranslated brand name — split it
  // off so "MoveOS" renders in accent teal, the rest in light ink.
  const eyebrowPrefix = copy.whyUs.eyebrow.replace(/MoveOS\s*$/, "");

  return (
    <section className="relative overflow-hidden bg-brand-ink py-20 sm:py-28">
      <WhyUsBackground />

      <div className="container-page relative grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <div className="text-center lg:text-left">
            <h2 className="font-extrabold tracking-tight text-section text-brand-background">
              {eyebrowPrefix}
              <span className="text-brand-primary">MoveOS</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-body text-brand-background/70 lg:mx-0">{copy.whyUs.intro}</p>
          </div>
        </Reveal>

        <Reveal delay={100} direction="right">
          <WhyUsGraphic advantages={copy.whyUs.advantages} />
        </Reveal>
      </div>
    </section>
  );
}
