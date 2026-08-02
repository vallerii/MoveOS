import Reveal from "../Reveal";
import GlareLink from "../GlareLink";
import { ScaleIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon, MagnifyingGlassIcon } from "../icons";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

const trustFactIcons = [ScaleIcon, DocumentTextIcon, ClockIcon];

// A handful of concrete, sourced facts (not manufactured social proof) to
// build urgency before the "how it works" step.
export default function HomeTrust({ copy }: Props) {
  return (
    <section className=" bg-[#EFEFEE] py-20 sm:py-28 relative">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="whitespace-nowrap text-[clamp(1.35rem,1rem+2.6vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-brand-ink">
              {copy.trust.heading}
            </h2>
            <p className="mt-4 text-subheading text-brand-ink/70">{copy.trust.subheading}</p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {copy.trust.facts.map(({ title, q, a }, i) => {
            const Icon = trustFactIcons[i] ?? CheckCircleIcon;
            return (
              <Reveal key={q} delay={i * 90} direction="right">
                <div className="card relative flex h-full flex-col overflow-hidden">
                  <Icon className="absolute -right-4 -top-2 h-16 w-16 text-brand-primary opacity-20" />
                  <Icon className="h-6 w-6 text-brand-primary mt-2" />
                  {/* Short label first (article-teaser style), then the old
                      `q` sentence as a secondary line, then `a` as the
                      description — was a single oversized title (up to 24px,
                      wrapping to 2-3 lines) dominating the card. */}
                  <p className="mt-3 pr-6 text-lg font-extrabold text-brand-ink">{title}</p>
                  <p className="mt-2 font-semibold text-brand-ink">{q}</p>
                  <p className="mt-2 text-small text-brand-ink/70">{a}</p>
                </div>
              </Reveal>
            );
          })}

          {/* 4th card, same row as the facts — same accent-glow treatment as
              WhatYouGet's "resultLabel" card, but clickable through to the
              quiz. The grid's default stretch makes every card match the
              row's tallest item, which is this one (min-h below), so all
              four end up the same height. */}
          <Reveal delay={copy.trust.facts.length * 90} direction="right">
            <GlareLink
              href="#quiz"
              className="h-full min-h-[14rem] flex-col items-start justify-center gap-4 rounded-2xl border border-brand-accent/50 bg-brand-accent/10 p-6 shadow-[0_0_0_1px_rgba(244,185,66,0.15),0_20px_45px_-15px_rgba(244,185,66,0.45)] sm:p-8 lg:min-h-[26rem]"
              glareClassName="h-64 w-64 rounded-full bg-brand-accent/30 blur-3xl"
              defaultPosition={{ x: "100%", y: "100%" }}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent/25">
                <MagnifyingGlassIcon className="h-7 w-7 text-brand-ink" />
              </span>
              <div>
                <span className="inline-flex w-fit items-center rounded-full bg-brand-accent/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-ink">
                  {copy.trust.ctaCard.badge}
                </span>
                <p className="mt-3 text-card-title text-brand-ink">{copy.trust.ctaCard.text}</p>
              </div>
            </GlareLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
