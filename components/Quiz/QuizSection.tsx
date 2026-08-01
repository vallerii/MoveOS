import type { Dictionary, Locale } from "@/lib/i18n/types";
import Reveal from "../Reveal";
import QuizWizard from "./QuizWizard";
import Glow from "../Glow";

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
    <section id="quiz" className="scroll-mt-24 bg-paper py-20 sm:py-section relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Peach — the system's own accent, and the largest of the three, so
            the wash resolves as warm rather than pink. Sat directly under the
            headline's last line, not down at the section boundary. */}
        <div
          className="absolute left-1/2 top-[34%] h-[600px] w-[1150px] -translate-x-1/2 rounded-full opacity-100 blur-[80px]"
          style={{ background: "radial-gradient(closest-side, #f7ceb0, transparent)" }}
        />
        {/* Rose, offset right and slightly higher — gives the bloom a centre of
            gravity instead of a symmetrical halo. */}
        <div
          className="absolute right-[10%] top-[20%] h-[500px] w-[700px] rounded-full opacity-95 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, #f4b3a6, transparent)" }}
        />
        {/* Lavender, offset left and lower — the cool counterweight that keeps
            the warm tones from reading as a single orange smear. */}
        <div
          className="absolute left-[35%] top-[30%] h-[460px] w-[660px] -translate-x-1/2 rounded-full opacity-85 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, #98c0eecc, transparent)" }}
        />
        <div
          className="absolute left-[30%] bottom-[-10%] h-[460px] w-[660px] -translate-x-1/2 rounded-full opacity-85 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, #ac9fee, transparent)" }}
        />
        {/* The hero clips its own overflow, which cuts the blooms off with a
            visible horizontal seam at the section boundary. This fade pins the
            wash to Paper White before it reaches that edge, so the transition
            into the next section reads as light falling off rather than as a
            band ending. */}
      </div>
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-heading-lg text-ink">{dict.quizIntro.heading}</h2>
            <p className="mt-6 text-body text-slate">{dict.quizIntro.subheading}</p>
          </div>
        </Reveal>

        {/* Same treatment as the "what we do" card: two of the hero's three
            blooms under the wizard so it reads as lit from behind, inset
            past its edges so the light spills around it, and dialled back
            with `intensity` — this is one card, not a viewport. */}
       
        <div className="relative mx-auto mt-14 max-w-2xl">
          <Reveal delay={100} className="relative z-10">
            <div className="card-artifact min-h-[440px] p-6 sm:p-10">
              <QuizWizard locale={locale} dict={dict} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
