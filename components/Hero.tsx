import Image from "next/image";
import { CheckCircleIcon, ClockIcon, PhoneCallIcon, ShieldCheckIcon, MapPinIcon } from "./icons";
import Reveal from "./Reveal";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  pain: PainSlug;
  dict: Dictionary;
};

const badgeIcons = [MapPinIcon, CheckCircleIcon, ClockIcon, PhoneCallIcon, ShieldCheckIcon];

export default function Hero({ pain, dict }: Props) {
  const copy = dict.pains[pain];

  return (
    <section className="overflow-hidden py-8 sm:pb-10 sm:pt-24 relative min-h-[90vh]">
      <Image
        src="/city.png"
        alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
        width={2000}
        height={800}
        className="absolute top-0 right-[-100px] w-[200%] h-[340px] sm:h-[480px] h-auto max-w-none md:min-h-[90vh] md:h-[100%] md:bottom-0 object-cover lg:object-contain object-right "
      />
      <Image
        src="/route.png"
        alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
        width={2000}
        height={1000}
        className="absolute animate-float bottom-[25%] sm:top-[-20%] right-[-80px] w-[200%] sm:w-[100%] h-[340px] sm:h-[480px] h-auto max-w-none md:min-h-[50vh] md:h-[80%] md:top-0 md:bottom-0 object-contain object-right "
      />
      <div className="container-page flex md:grid items-center justify-center gap-10 md:grid-cols-[2fr_1fr] lg:gap-16">
        <div className="order-1 text-center md:text-left ">
          <Reveal>
            <span className="eyebrow">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-primary" />
              </span>
              {copy.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-brand-ink sm:text-6xl">
              {copy.h1}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 whitespace-pre-line text-lg text-brand-ink/70 sm:text-xl">{copy.subheading}</p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex  justify-center md:justify-start">
              <a href="#quiz" className="btn-primary w-full sm:w-auto">
                <span className="sm:hidden">{copy.heroCtaMobile ?? copy.heroCta}</span>
                <span className="hidden sm:inline">{copy.heroCta}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={400}>
        <div className="container-page mt-14 lg:mt-20">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start gap-x-6 gap-y-4 rounded-2xl border border-black/5 bg-white/70 px-5 py-4 shadow-card backdrop-blur sm:justify-between sm:gap-x-10 sm:gap-y-5 sm:px-8 sm:py-6">
            {dict.heroTrustBadges.map((label, i) => {
              const Icon = badgeIcons[i] ?? CheckCircleIcon;
              return (
                <div key={label} className="flex items-center gap-3 text-base font-semibold text-brand-ink sm:text-lg">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                    <Icon className="h-6 w-6 text-brand-primary" />
                  </span>
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
