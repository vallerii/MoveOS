import type { Dictionary, Locale } from "@/lib/i18n/types";
import Reveal from "../Reveal";
import QuizWizard from "./QuizWizard";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Closing quiz section — centred serif heading over the wizard, sat in a
 * floating artifact card on the white canvas.
 *
 * The isometric city illustration and the translucent blurred panel behind
 * the wizard are both gone. The wizard is the one thing on the page that's
 * genuinely a piece of product UI, so it gets the artifact treatment: white
 * surface, 20px radius, the system's only real shadow.
 */
export default function QuizSection({ locale, dict }: Props) {
  return (
    <section id="quiz" className="scroll-mt-24 bg-paper py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-lg text-ink">{dict.quizIntro.heading}</h2>
            <p className="mt-6 text-body text-slate">{dict.quizIntro.subheading}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-artifact mx-auto mt-14 max-w-2xl p-6 sm:p-10">
            <QuizWizard locale={locale} dict={dict} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
