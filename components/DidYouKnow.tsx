import Reveal from "./Reveal";
import { ArrowDownIcon } from "./icons";
import type { Dictionary } from "@/lib/i18n/types";

type Props = { dict: Dictionary };

export default function DidYouKnow({ dict }: Props) {
  const { heading, subheading, facts } = dict.didYouKnow;

  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="text-center lg:sticky lg:top-28 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">{heading}</h2>
              <p className="mt-4 text-brand-ink/70">{subheading}</p>
            </div>
          </Reveal>

          <Reveal delay={150} className="w-full lg:col-span-8">
            <div className="w-full divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
              {facts.map(({ q, a }) => (
                <details key={q} open className="group w-full p-6">
                  <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-brand-ink marker:content-none">
                    {q}
                  </summary>
                  <ArrowDownIcon className="h-4 w-4 mt-3 shrink-0 text-brand-primary" />
                  <p className="mt-3 text-brand-ink/70">{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
