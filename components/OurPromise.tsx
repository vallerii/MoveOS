import Reveal from "./Reveal";

export default function OurPromise() {
  return (
    <section className="bg-brand-ink py-20 text-brand-background sm:py-28">
      <div className="container-page text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            We won&apos;t give generic advice.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-background/70">
            We&apos;ll review your specific situation and tell you exactly what to do before you
            hand back the keys.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-xl font-semibold text-brand-accent">
            Our promise: help you maximise your chances of getting your full deposit back.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
