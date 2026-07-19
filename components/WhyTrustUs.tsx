import Reveal from "./Reveal";

const cards = [
  {
    emoji: "📄",
    title: "Your Contract",
    body: "Every rental agreement is different. We review the clauses that matter for your move-out.",
    span: false,
    featured: false,
  },
  {
    emoji: "⚖️",
    title: "Your Rights",
    body: "We explain what your landlord can and cannot legally deduct.",
    span: false,
    featured: false,
  },
  {
    emoji: "🏠",
    title: "Your Situation",
    body: "Not generic advice. Recommendations based on your apartment, documents and timeline.",
    span: true,
    featured: true,
  },
  {
    emoji: "🎁",
    title: "Free & No Obligation",
    body: "Get practical guidance with no cost and no pressure.",
    span: true,
    featured: false,
  },
];

export default function WhyTrustUs() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* left: the pitch */}
          <Reveal className="lg:col-span-5">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">
              Advice Tailored to Your Situation
            </h2>
            <p className="mt-6 text-lg text-brand-ink/70">
              Moving out isn&apos;t the same for everyone. Your rental contract, landlord,
              apartment condition and timeline all matter.
            </p>
            <p className="mt-4 text-lg text-brand-ink/70">
              That&apos;s why we don&apos;t use generic checklists. During the review, we look
              at your specific situation and explain what matters before you hand back the
              keys.
            </p>
          </Reveal>

          {/* right: the proof, as cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {cards.map(({ emoji, title, body, span, featured }, i) => (
                <Reveal
                  key={title}
                  delay={i * 80}
                  className={span ? "sm:col-span-2" : undefined}
                >
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
                      <p
                        className={
                          featured
                            ? "mt-3 text-lg font-semibold text-brand-ink"
                            : "mt-3 font-semibold text-brand-ink"
                        }
                      >
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
