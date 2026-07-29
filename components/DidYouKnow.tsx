import Image from "next/image";
import Reveal from "./Reveal";
import GlareCard from "./GlareCard";
import {
  BanknotesIcon,
  ClockIcon,
  ScaleIcon,
  CameraIcon,
  MapPinIcon,
  MailIcon,
  GiftIcon,
  ClipboardCheckIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  WrenchIcon,
  ShieldCheckIcon,
} from "./icons";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";

type Props = { dict: Dictionary; pain: PainSlug };

// Icon per fact is a design choice, not a translated string, so it's mapped
// here by position rather than stored in the dictionaries. Each pain has
// exactly 4 facts, in the same fixed order across all locales.
const iconsByPain: Record<PainSlug, (typeof SparklesIcon)[]> = {
  deposit: [BanknotesIcon, ClockIcon, ScaleIcon, CameraIcon],
  admin: [BanknotesIcon, ClockIcon, MapPinIcon, MailIcon],
  belongings: [GiftIcon, ClockIcon, BanknotesIcon, ClipboardCheckIcon],
  urgent: [ScaleIcon, DocumentTextIcon, ClockIcon, MagnifyingGlassIcon],
  buyout: [BanknotesIcon, ClockIcon, MagnifyingGlassIcon, ShieldCheckIcon],
  repair: [ScaleIcon, WrenchIcon, CameraIcon, ClipboardCheckIcon],
};

export default function DidYouKnow({ dict, pain }: Props) {
  const { heading, subheading, facts: factsByPain } = dict.didYouKnow;
  const facts = factsByPain[pain];
  const icons = iconsByPain[pain];

  return (
    <section className="bg-white py-20 sm:py-28 relative ">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/city-didyouknow.png"
          alt="Isometric city block illustration with a highlighted route from a key chip to a home chip"
          width={2000}
          height={800}
          className="absolute opacity-30  bottom-0 left-0 w-[200%] h-[100%] h-auto max-w-none md:min-h-[90vh] md:h-[100%] object-cover lg:object-contain object-left "
        />

      </div>
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="text-center lg:sticky lg:top-28 lg:text-left">
              <h2 className="font-extrabold tracking-tight text-brand-ink text-section">{heading}</h2>
              <p className="mt-4 text-subheading text-brand-ink/70">{subheading}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <div className="grid gap-5">
              {facts.map(({ q, a }, i) => {
                const featured = i === facts.length - 1;
                const Icon = icons[i] ?? SparklesIcon;

                if (featured) {
                  return (
                    <Reveal key={q} delay={i * 90} direction="right">
                      <GlareCard
                        className="rounded-2xl bg-brand-ink p-5 text-brand-background sm:p-8 relative "
                        glareClassName="h-64 w-64 rounded-full bg-brand-accent/25 blur-3xl"
                        defaultPosition={{ x: "100%", y: "100%" }}
                      >
                        <Icon className="absolute -right-4 -top-2 h-20 w-20 text-brand-accent opacity-20" />
                        <div className="pr-12 sm:pr-16 mt-6">
                          <Icon className="h-6 w-6 text-brand-accent mb-2" />
                          <p className="text-card-title">{q}</p>
                          <p className="mt-2 text-small text-brand-background/70">{a}</p>
                        </div>
                      </GlareCard>
                    </Reveal>
                  );
                }

                return (
                  <Reveal key={q} delay={i * 90} direction="right">
                    <div className="card relative flex h-full flex-col overflow-hidden">
                      <Icon className="absolute -right-4 -top-2 h-20 w-20 text-brand-primary opacity-20" />
                      <Icon className="h-6 w-6 text-brand-primary mt-6" />
                      <p className="mt-2 pr-12 text-card-title text-brand-ink">{q}</p>
                      <p className="mt-3 text-small text-brand-ink/70">{a}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
