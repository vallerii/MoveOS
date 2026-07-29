import Reveal from "./Reveal";
import WhyUsBackground from "./WhyUsBackground";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";

type Props = { dict: Dictionary; pain: PainSlug };

export default function WhyUs({ dict, pain }: Props) {
  const { heading, intro, body } = dict.whyUs;

  return (
    <section className="relative overflow-hidden bg-brand-ink py-20 text-brand-background sm:py-28">
      <WhyUsBackground />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-extrabold tracking-tight text-section">{heading}</h2>
            <p className="mt-5 text-body text-brand-background/70">{intro}</p>
            <p className="mt-10 text-subheading text-brand-accent">{body[pain]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
