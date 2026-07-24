import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n/types";

type Props = { dict: Dictionary };

export default function WhyTrustUs({ dict }: Props) {
  const { heading, p1, p2, cards } = dict.whyTrustUs;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">{heading}</h2>
            <p className="mt-6 text-lg text-brand-ink/70">{p1}</p>
            <p className="mt-4 text-lg text-brand-ink/70">{p2}</p>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {cards.map(({ emoji, title, body, span, featured }, i) => (
                <Reveal key={title} delay={i * 80} className={span ? "sm:col-span-2" : undefined}>
                  <div
                    className={
                      featured
                        ? "relative overflow-hidden rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-7 shadow-[0_0_0_1px_rgba(14,165,168,0.08),0_20px_45px_-15px_rgba(14,165,168,0.35)] transition duration-300 hover:-translate-y-1"
                        : "card h-full"
                    }
                  >
                    {featured && (
                      <div className="pointer-events-none absolute -bottom-14 -right-10 h-56 w-56 rounded-full bg-brand-primary/20 blur-3xl" />
                    )}
                    <div className={featured ? "relative" : undefined}>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{emoji}</span>
                        {featured && (
                          <span className="text-brand-accent" aria-hidden="true">
                            ⭐
                          </span>
                        )}
                      </div>
                      <p className={featured ? "mt-3 text-lg font-semibold text-brand-ink" : "mt-3 font-semibold text-brand-ink"}>
                        {title}
                      </p>
                      <p className="mt-2 text-sm text-brand-ink/70">{body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
