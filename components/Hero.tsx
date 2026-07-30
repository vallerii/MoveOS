import Image from "next/image";
import {
  BanknotesIcon,
  CameraIcon,
  ClipboardCheckIcon,
  ClockIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "./icons";
import Reveal from "./Reveal";
import GlareButton from "./GlareButton";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  pain: PainSlug;
  dict: Dictionary;
};

// Icons for the 3 hero badges, matched 1:1 by index to each pain's
// `badges` copy in the dictionaries — chosen to fit that pain's outcome.
const badgeIcons: Record<PainSlug, [typeof BanknotesIcon, typeof BanknotesIcon, typeof BanknotesIcon]> = {
  deposit: [BanknotesIcon, ClockIcon, ShieldCheckIcon],
  admin: [ClipboardCheckIcon, ClipboardCheckIcon, ClockIcon],
  belongings: [ClipboardCheckIcon, BanknotesIcon, ShieldCheckIcon],
  urgent: [ShieldCheckIcon, BanknotesIcon, ClockIcon],
  buyout: [DocumentTextIcon, BanknotesIcon, ShieldCheckIcon],
  repair: [BanknotesIcon, WrenchIcon, CameraIcon],
};

export default function Hero({ pain, dict }: Props) {
  const copy = dict.pains[pain];

  return (
    <section className="overflow-hidden py-8 sm:pb-10 sm:pt-24 relative min-h-[90vh]">
      <div className="container-page relative z-10 flex md:grid items-center justify-center gap-10 md:grid-cols-[2fr_1fr] lg:gap-16">
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
            <h1 className="mt-6 font-extrabold tracking-tight text-brand-ink text-hero">
              {copy.h1}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 whitespace-pre-line text-subheading text-brand-ink/70">{copy.subheading}</p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex  justify-center md:justify-start">
              <GlareButton href="#quiz" className="w-full sm:w-auto">
                {/* Only split into two responsive spans when there's an
                    actually-different mobile label — otherwise both spans
                    would render identical text into the DOM (one hidden via
                    CSS, not from the accessibility tree), which reads as a
                    duplicated/copy-pasted button label to anything that
                    extracts page text without applying CSS. */}
                {copy.heroCtaMobile && copy.heroCtaMobile !== copy.heroCta ? (
                  <>
                    <span className="sm:!hidden">{copy.heroCtaMobile}</span>
                    <span className="hidden sm:!inline-flex">{copy.heroCta}</span>
                  </>
                ) : (
                  copy.heroCta
                )}
              </GlareButton>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Mobile: a normal in-flow image between the CTA and the badges row.
          sm+: switches to an absolutely-positioned decorative graphic behind
          the badges/next to the copy instead — same pattern as HomeHero, so
          the pain pages don't get the overflow the old always-absolute
          image caused on small screens. */}
      <Image
        src={copy.img}
        alt=""
        aria-hidden="true"
        width={1000}
        height={1000}
        className="relative z-0 w-full block h-auto mx-auto max-w-[320px] object-contain sm:absolute sm:z-0 sm:mx-0 sm:mt-0 sm:top-[10%] sm:right-[-5%] sm:h-auto sm:w-auto sm:max-w-[50%] sm:object-right lg:top-[10%]"
      />

      <Reveal delay={400}>
        <div className="container-page mt-14 lg:mt-20">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start gap-x-6 gap-y-4 rounded-2xl border border-black/5 bg-white/70 px-5 py-4 shadow-card backdrop-blur sm:justify-between sm:gap-x-10 sm:gap-y-5 sm:px-8 sm:py-6">
            {copy.badges.map((label, i) => {
              const Icon = badgeIcons[pain][i];
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
