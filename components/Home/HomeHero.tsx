import Image from "next/image";
import Reveal from "../Reveal";
import GlareButton from "../GlareButton";
import { ShieldCheckIcon, MapPinIcon, ClockIcon } from "../icons";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

// Local to the homepage only — every other badge/icon set in the app is
// mapped from components/icons.tsx, but "multiple languages" isn't a
// concept any existing icon covers, so a small one-off in the same visual
// style (24x24, currentColor stroke, rounded caps) lives here rather than
// widening the shared icon file for a single usage.
function GlobeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
    </svg>
  );
}

const heroBadgeIcons = [ShieldCheckIcon, MapPinIcon, ClockIcon, GlobeIcon];

export default function HomeHero({ copy }: Props) {
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
              {copy.hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-extrabold tracking-tight text-brand-ink text-hero">
              {copy.hero.h1.map((line, i) => (
                <span key={i} className="block">
                  {line.map((segment, j) =>
                    segment.accent ? (
                      <span key={j} className="text-brand-primary">
                        {segment.text}
                      </span>
                    ) : (
                      <span key={j}>{segment.text}</span>
                    )
                  )}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-md whitespace-pre-line text-subheading text-brand-ink/70 md:mx-0">
              {copy.hero.subheading}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex justify-center md:justify-start">
              <GlareButton href="#situations" className="w-full sm:w-auto">
                {copy.hero.cta}
              </GlareButton>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Mobile: a normal in-flow image between the CTA and the badges row.
          sm+: switches to an absolutely-positioned decorative graphic behind
          the badges/next to the copy instead (it was previously *always*
          absolute with no width cap, which is what made it misbehave and
          cause horizontal overflow on small screens). */}
      <Image
        src="/heroapartment.png"
        alt=""
        aria-hidden="true"
        width={1000}
        height={1000}
        className="relative z-0 mx-auto mt-10 block h-auto w-[70%] max-w-[220px] object-contain sm:absolute sm:z-0 sm:mx-0 sm:mt-0 sm:bottom-0 sm:right-0 sm:h-auto sm:w-auto sm:max-w-none sm:object-right lg:top-[10%]"
      />

      <Reveal delay={400}>
        <div className="container-page mt-14 lg:mt-20">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-start gap-x-6 gap-y-4 rounded-2xl border border-black/5 bg-white/70 px-5 py-4 shadow-card backdrop-blur sm:justify-between sm:gap-x-10 sm:gap-y-5 sm:px-8 sm:py-6">
            {copy.hero.badges.map((label, i) => {
              const Icon = heroBadgeIcons[i] ?? ShieldCheckIcon;
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
