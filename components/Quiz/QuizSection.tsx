import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";
import Reveal from "../Reveal";
import BarcelonaSkyline from "../BarcelonaSkyline";
import QuizWizard from "./QuizWizard";

type Props = {
  locale: Locale;
  pain: PainSlug;
  dict: Dictionary;
};

export default function QuizSection({ locale, pain, dict }: Props) {
  return (
    <section id="quiz" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-brand-accent/20 blur-3xl" />
        <BarcelonaSkyline className="absolute inset-x-0 bottom-[-20px] h-40 w-full animate-float text-brand-ink/[0.07] sm:h-56 md:h-72" />
      </div>

      <div className="container-page relative z-10">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-extrabold tracking-tight text-brand-ink text-section">
              {dict.quizIntro.heading}
            </h2>
            <p className="mt-4 text-subheading text-brand-ink/70">{dict.quizIntro.subheading}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white/70 p-4 shadow-card backdrop-blur sm:p-10">
            <QuizWizard locale={locale} pain={pain} dict={dict} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
