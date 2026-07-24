import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n/types";

type Props = { dict: Dictionary };

export default function OurPromise({ dict }: Props) {
  const { h2, p1, p2 } = dict.ourPromise;

  return (
    <section className="bg-brand-ink py-20 text-brand-background sm:py-28">
      <div className="container-page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">{h2}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-background/70">{p1}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-xl font-semibold text-brand-accent">{p2}</p>
        </Reveal>
      </div>
    </section>
  );
}
