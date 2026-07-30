import Reveal from "../Reveal";
import { PhoneCallIcon, ClipboardCheckIcon, ShieldCheckIcon, CheckCircleIcon } from "../icons";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

const howItWorksIcons = [PhoneCallIcon, ClipboardCheckIcon, ShieldCheckIcon];

// Generalized 3-step version of the per-pain HowItWorks.tsx; same
// numbered-timeline visual language.
export default function HomeHowItWorks({ copy }: Props) {
  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-white to-[#EFEFEE] overflow-hidden">
      <div className="pointer-events-none absolute top-[10%] right-[-30%] h-[20rem] w-[20rem] rounded-full bg-brand-primary/10 blur-3xl sm:right-[10%]" />
      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="text-center lg:sticky lg:top-28 lg:text-left">
              <h2 className="font-extrabold tracking-tight text-brand-ink text-section">{copy.howItWorks.heading}</h2>
              <p className="mt-4 text-subheading text-brand-ink/70">{copy.howItWorks.subheading}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <ol className="relative z-10 space-y-6 border-l-2 border-brand-primary/20 pl-8 sm:pl-10">
              {copy.howItWorks.steps.map(({ title, body }, i) => {
                const Icon = howItWorksIcons[i] ?? CheckCircleIcon;
                return (
                  <Reveal key={title} delay={i * 90} direction="right">
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
      </div>
    </section>
  );
}
