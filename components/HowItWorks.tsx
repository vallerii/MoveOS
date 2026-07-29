import Image from "next/image";
import Reveal from "./Reveal";
import {
  PhoneCallIcon,
  MagnifyingGlassIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  WrenchIcon,
  ClipboardCheckIcon,
  SparklesIcon,
} from "./icons";
import type { PainSlug } from "@/lib/i18n/types";

type Step = { title: string; body: string };
type Props = {
  pain: PainSlug;
  heading: string;
  subheading: string;
  steps: Step[];
};

// Icons are mapped by position, same convention as DidYouKnow — a design
// choice, not a translated string. Falls back to CheckCircleIcon for any
// pain/index without a dedicated set.
const iconsByPain: Partial<Record<PainSlug, (typeof CheckCircleIcon)[]>> = {
  buyout: [PhoneCallIcon, MagnifyingGlassIcon, BanknotesIcon, DocumentTextIcon, CheckCircleIcon],
  repair: [WrenchIcon, ClipboardCheckIcon, CheckCircleIcon, SparklesIcon, WrenchIcon],
};

export default function HowItWorks({ pain, heading, subheading, steps }: Props) {
  const icons = iconsByPain[pain] ?? [];
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#fff] to-[#EFEFEE]">
      {/* Topographic contour background image — clusters in the top-left
          and bottom-right corners, clear in the middle for text. */}
      <Image
        src="/topo-contour4.png"
        alt=""
        aria-hidden="true"
        fill
        priority={false}
        className="pointer-events-none object-cover opacity-[0.1] "
      />

      {/* Yellow glare — bleeds slightly onto the section below, but must
          stay behind the cards (z-20 < the content wrapper's z-30). */}
      <div className="pointer-events-none absolute top-[25%] right-[-40%] z-20 h-[20rem] w-[20rem] sm:h-[20rem] sm:w-[20rem] lg:h-[28rem] lg:w-[28rem] rounded-full bg-[#0ea5a8]/20 blur-3xl sm:top-[16%] sm:right-[20%] " />
      <div className="pointer-events-none absolute -bottom-[4%] left-[-10%] z-20 h-80 w-80 sm:h-[12rem] sm:w-[12rem] lg:h-[18rem] lg:w-[18rem] rounded-full bg-[#0ea5a8]/10 blur-3xl sm:-bottom-32 sm:left-[0%] " />

      <div className="container-page relative z-30">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-extrabold tracking-tight text-brand-ink text-section">{heading}</h2>
            {subheading && <p className="mt-4 text-subheading text-brand-ink/70">{subheading}</p>}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <ol className="relative z-10 space-y-6 border-l-2 border-brand-primary/20 pl-8 sm:pl-10">
            {steps.map(({ title, body }, i) => {
              const Icon = icons[i] ?? CheckCircleIcon;
              return (
                <Reveal key={title} delay={i * 90}>
                  <li className="relative z-[1]">
                    <span className="absolute -left-[calc(2rem+13px)] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white sm:-left-[calc(2.5rem+13px)]">
                      {i + 1}
                    </span>
                    <div className="card flex items-start gap-4">
                      <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-primary" />
                      <div>
                        <p className="text-card-title text-brand-ink">{title}</p>
                        <p className="mt-1.5 text-small text-brand-ink/70">{body}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
