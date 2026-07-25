import Reveal from "./Reveal";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";

type Props = { dict: Dictionary; pain: PainSlug };

export default function WhyUs({ dict, pain }: Props) {
  const { heading, intro, body } = dict.whyUs;

  return (
    <section className="relative overflow-hidden bg-brand-ink py-20 text-brand-background sm:py-28">
      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{heading}</h2>
            <p className="mt-5 text-brand-background/70">{intro}</p>
            <p className="mt-10 text-lg font-semibold text-brand-accent">{body[pain]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
