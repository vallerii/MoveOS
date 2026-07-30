import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";
import Reveal from "../Reveal";
import BarcelonaSkyline from "../BarcelonaSkyline";
import QuizWizard from "./QuizWizard";
import Image from "next/image";

type Props = {
  locale: Locale;
  dict: Dictionary;
  // Forwarded to QuizWizard — set on pain landing pages so the quiz skips
  // the "what do you need help with" step and goes straight to the
  // topic-specific question. Left unset on the homepage.
  pain?: PainSlug;
};

export default function QuizSection({ locale, dict, pain }: Props) {
  return (
    <section id="quiz" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 md:py-32">
   <Image
           src="/city2.png"
           alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
           width={2000}
           height={800}
           className="absolute top-0 bottom-0 right-0  h-auto max-w-none md:min-h-[90vh] md:h-[100%] md:bottom-0 object-cover  object-right opacity-40 "
         />
         {/* <Image
           src="/route.png"
           alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
           width={2000}
           height={1000}
           className="absolute animate-float bottom-[25%] sm:top-[-20%] right-[-80px] w-[200%] sm:w-[100%] h-[340px] sm:h-[480px] h-auto max-w-none md:min-h-[50vh] md:h-[70%] md:top-0 md:bottom-0 object-contain object-right "
         /> */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/mapbg.png"
          alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
          width={2000}
          height={800}
          className="absolute opacity-30  bottom-0 left-0 w-[200%] h-[100%] h-auto max-w-none md:min-h-[90vh] md:h-[100%] object-cover lg:object-contain object-left "
        />

      </div> */}

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
          {/* min-h keeps the card from visibly snapping in height as the
              wizard swaps between question steps and the (bulkier) result
              step — the height still adapts to content, but the floor
              stops the jump from being jarring. */}
          <div className="mx-auto mt-10 min-h-[470px] max-w-2xl rounded-3xl bg-white/70 p-4 shadow-card backdrop-blur sm:min-h-[470px] sm:p-10">
            <QuizWizard locale={locale} dict={dict} pain={pain} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
