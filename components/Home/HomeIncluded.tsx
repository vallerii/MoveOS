"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import PillButton from "../PillButton";
import { ChevronDownIcon } from "../icons";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

/**
 * "What exactly is included" block — sits between HomeHowItWorks and
 * HomeWhyUs. Expands on situations.linksPanel (untouched, stays where it
 * is) by spelling out, per pain, what the free help actually covers.
 *
 * Same Mist-card, hairline-list language as the rest of the system (see
 * HomeSituations' `linksPanel` nav for the closest existing precedent) —
 * no colour is available to mark the active row (the page's one accent,
 * peach, is already spent on HomeTrust's CTA card), so selection is
 * carried by weight and a Mist row fill instead.
 *
 * Desktop (lg+): the left card's rows are a clickable index (icon + title
 * + chevron, no inline description) — clicking/hovering one shows its
 * description in a dedicated panel above the CTA card on the right.
 * Mobile: a plain list with each item's description inline, no selection
 * interaction.
 */
export default function HomeIncluded({ copy }: Props) {
  const { included } = copy;
  const [selected, setSelected] = useState(0);
  const activeItem = included.items[selected];
  const ActiveIcon = PAIN_ICONS[PAIN_SLUGS[selected]];

  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-4 lg:grid-cols-5 lg:items-stretch">
          <Reveal className="lg:col-span-3">
            <div className="card-neutral h-full">
              <h3 className="font-display text-heading-sm text-ink">{included.heading}</h3>
              <p className="mt-3 text-caption text-slate">{included.subheading}</p>

              {/* Mobile — full list, description inline. */}
              <ol className="mt-8 space-y-6 lg:hidden">
                {PAIN_SLUGS.map((slug, i) => {
                  const Icon = PAIN_ICONS[slug];
                  const item = included.items[i];
                  return (
                    <li key={slug} className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-mist">
                        <Icon className="h-[18px] w-[18px] text-ink" />
                      </span>
                      <div>
                        <p className="text-caption font-w480 text-ink">{item.title}</p>
                        <p className="mt-1.5 text-meta text-slate">{item.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Desktop — clickable index only, description lives in the
                  panel on the right. */}
              <ol className="mt-8 hidden lg:block">
                {PAIN_SLUGS.map((slug, i) => {
                  const Icon = PAIN_ICONS[slug];
                  const item = included.items[i];
                  const active = i === selected;
                  return (
                    <li key={slug} className={i > 0 ? "border-t border-ink/[0.07]" : ""}>
                      <button
                        type="button"
                        onClick={() => setSelected(i)}
                        onMouseEnter={() => setSelected(i)}
                        aria-pressed={active}
                        className={`-mx-3 flex w-[calc(100%+1.5rem)] items-center gap-4 rounded-[10px] px-3 py-3.5 text-left transition-colors ${
                          active ? "bg-mist" : "hover:bg-mist/60"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-colors ${
                            active ? "bg-paper" : "bg-mist"
                          }`}
                        >
                          <Icon className="h-[18px] w-[18px] text-ink" />
                        </span>
                        <span className={`flex-1 text-base text-ink transition-all ${active ? "font-w480" : ""}`}>
                          {item.title}
                        </span>
                        <ChevronDownIcon
                          className={`h-4 w-4 shrink-0 -rotate-90 transition-colors ${
                            active ? "text-ink" : "text-ash"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={80} className="flex flex-col gap-4 lg:col-span-2">
            {/* Desktop-only — shows the description for whichever item is
                selected on the left. Mobile carries its own description
                inline per row, so this panel is hidden there. */}
            <div className="card-neutral hidden lg:block">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-paper">
                <ActiveIcon className="h-[18px] w-[18px] text-ink" />
              </span>
              <p className="mt-4 text-heading-sm text-ink">{activeItem.title}</p>
              <p className="mt-2 text-caption text-slate">{activeItem.body}</p>
            </div>

            <div className="card-neutral flex h-full flex-col justify-between">
              <div>
                <p className="text-heading-sm text-ink">{included.ctaCard.heading}</p>
                <p className="mt-3 text-caption text-slate">{included.ctaCard.body}</p>
              </div>
              <PillButton href="#quiz" className="mt-8 w-fit">
                {included.ctaCard.button}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
