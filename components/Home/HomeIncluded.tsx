"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import GlareButton from "../GlareButton";
import { ChevronDownIcon } from "../icons";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

// New block, requested to sit between HomeWhyUs ("Почему MoveOS") and the
// quiz — expands on the existing situations.linksPanel grid (untouched,
// stays where it is) by spelling out, per pain, what the free help actually
// includes.
//
// Desktop (lg+): the left card's rows are a clickable index (icon + title +
// arrow, no inline description) — clicking/hovering one shows its
// description in a dedicated panel above the CTA card on the right.
// Mobile: unchanged from the original design — a plain list with each
// item's description inline, no selection interaction.
export default function HomeIncluded({ copy }: Props) {
  const { included } = copy;
  const [selected, setSelected] = useState(0);
  const activeItem = included.items[selected];
  const ActiveIcon = PAIN_ICONS[PAIN_SLUGS[selected]];

  return (
    <section className=" bg-[#EFEFEE]  py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-5 lg:grid-cols-5 lg:items-stretch">
          <Reveal className="lg:col-span-3">
            <div className="card h-full">
              <h3 className="text-card-title font-extrabold text-brand-ink">{included.heading}</h3>
              <p className="mt-2 text-small text-brand-ink/60">{included.subheading}</p>

              {/* Mobile — untouched: full list, description inline. */}
              <ol className="mt-6 space-y-5 lg:hidden">
                {PAIN_SLUGS.map((slug, i) => {
                  const Icon = PAIN_ICONS[slug];
                  const item = included.items[i];
                  return (
                    <li key={slug} className="flex items-start gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                        <Icon className="h-5 w-5 text-brand-primary" />
                      </span>
                      <div>
                        <p className="font-bold text-brand-ink">{item.title}</p>
                        <p className="mt-1 text-small text-brand-ink/70">{item.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Desktop — clickable index only, description lives in the
                  panel on the right. */}
              <ol className="mt-6 hidden divide-y divide-black/5 lg:block">
                {PAIN_SLUGS.map((slug, i) => {
                  const Icon = PAIN_ICONS[slug];
                  const item = included.items[i];
                  const active = i === selected;
                  return (
                    <li key={slug}>
                      <button
                        type="button"
                        onClick={() => setSelected(i)}
                        onMouseEnter={() => setSelected(i)}
                        aria-pressed={active}
                        className="flex w-full items-center gap-3 py-3 text-left transition"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${
                            active ? "bg-brand-primary/20" : "bg-brand-primary/10"
                          }`}
                        >
                          <Icon className="h-5 w-5 text-brand-primary" />
                        </span>
                        <span className={`flex-1 font-bold transition ${active ? "text-brand-primary" : "text-brand-ink"}`}>
                          {item.title}
                        </span>
                        <ChevronDownIcon
                          className={`h-5 w-5 shrink-0 -rotate-90 transition ${
                            active ? "text-brand-primary" : "text-brand-ink/30"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-5 lg:col-span-2">
            {/* Desktop-only — shows the description for whichever item is
                selected on the left. Mobile carries its own description
                inline per row, so this panel is hidden there. */}
            <div className="card hidden lg:block">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                <ActiveIcon className="h-5 w-5 text-brand-primary" />
              </span>
              <p className="mt-3 text-card-title font-extrabold text-brand-ink">{activeItem.title}</p>
              <p className="mt-2 text-small text-brand-ink/70">{activeItem.body}</p>
            </div>

            <div className="card flex h-full flex-col justify-between bg-gradient-to-br from-white to-brand-primary/[0.09]">
              <div>
                <h3 className="text-card-title font-extrabold text-brand-ink">{included.ctaCard.heading}</h3>
                <p className="mt-3 text-small text-brand-ink/70">{included.ctaCard.body}</p>
              </div>
              <GlareButton href="#quiz" variant="outline" className="mt-6 w-fit">
                {included.ctaCard.button}
              </GlareButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
