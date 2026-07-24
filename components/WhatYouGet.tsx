import Reveal from "./Reveal";
import {
  ScaleIcon,
  CameraIcon,
  DocumentTextIcon,
  MailIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  GiftIcon,
  ClockIcon,
} from "./icons";
import type { Dictionary, PainSlug } from "@/lib/i18n/types";

type Props = {
  dict: Dictionary;
  pain: PainSlug;
};

const icons = [
  ScaleIcon,
  CameraIcon,
  MailIcon,
  DocumentTextIcon,
  GiftIcon,
  ClockIcon,
  ClipboardCheckIcon,
  ShieldCheckIcon,
];

export default function WhatYouGet({ dict, pain }: Props) {
  const { heading, subheading, items, resultLabel, resultText } = dict.whatYouGet;

  return (
    <section className="py-20 sm:pt-16">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl">{heading}</h2>
            <p className="mt-4 text-lg text-brand-ink/70">{subheading}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-12 hidden max-w-4xl items-center sm:flex">
            {items.map((_, i) => (
              <div key={i} className="flex flex-1 items-center">
                <span className="h-2 w-2 shrink-0 rounded-full bg-brand-primary/50" />
                <span className="mx-1.5 h-px flex-1 bg-gradient-to-r from-brand-primary/30 to-brand-primary/10" />
              </div>
            ))}
            <span className="h-3.5 w-3.5 shrink-0 animate-pulse rounded-full bg-brand-accent shadow-[0_0_14px_3px_rgba(244,185,66,0.55)]" />
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ badge, title, pains }, i) => {
            const Icon = icons[i] ?? ScaleIcon;
            const highlighted = pains.includes(pain);
            return (
              <Reveal key={title} delay={i * 70}>
                <div
                  className={
                    highlighted
                      ? "card flex h-full flex-col border-brand-primary/40 ring-1 ring-brand-primary/20"
                      : "card flex h-full flex-col"
                  }
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
                    {badge}
                  </span>
                  <Icon className="mt-4 h-7 w-7 text-brand-primary" />
                  <p className="mt-3 font-semibold text-brand-ink">{title}</p>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={items.length * 70} className="sm:col-span-2 lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-2xl border border-brand-accent/50 bg-brand-accent/10 p-6 shadow-[0_0_0_1px_rgba(244,185,66,0.15),0_20px_45px_-15px_rgba(244,185,66,0.45)]">
              <div className="pointer-events-none absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-brand-accent/30 blur-3xl" />
              <div className="relative">
                <span className="inline-flex w-fit items-center rounded-full bg-brand-accent/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-ink">
                  {resultLabel}
                </span>
                <BanknotesIcon className="mt-4 h-8 w-8 text-brand-secondary" />
                <p className="mt-3 text-lg font-semibold text-brand-ink">💰 {resultText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
