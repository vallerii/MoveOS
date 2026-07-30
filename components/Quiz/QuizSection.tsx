import type { Dictionary, Locale } from "@/lib/i18n/types";
import Reveal from "../Reveal";
import BarcelonaSkyline from "../BarcelonaSkyline";
import QuizWizard from "./QuizWizard";
import Image from "next/image";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function QuizSection({ locale, dict }: Props) {
  return (
    <section id="quiz" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28 md:py-32">
   <Image
           src="/city.png"
           alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
           width={2000}
           height={800}
           className="absolute top-0 right-[-100px] w-[200%] h-[340px] sm:h-[480px] h-auto max-w-none md:min-h-[90vh] md:h-[100%] md:bottom-0 object-cover lg:object-contain object-right "
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
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white/70 p-4 shadow-card backdrop-blur sm:p-10">
            <QuizWizard locale={locale} dict={dict} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
