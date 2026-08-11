import Reveal from "./Reveal";
import ArrowLink from "./ArrowLink";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  heading: string;
  linkLabel: string;
  items: { pain: PainSlug; teaser: string }[];
};

/**
 * Cross-links to sibling pain pages. A visitor dealing with one problem
 * (repairs) is often quietly dealing with two or three at once — this is
 * the one place on a pain page that admits the site has five other doors.
 *
 * Same card grid as WhatYouGet, so it doesn't read as a separate "related
 * links" widget bolted onto the page — the sibling page's own shortLabel is
 * the tag, its teaser line is the title, ArrowLink carries the affordance.
 */
export default function RelatedPains({ locale, dict, heading, linkLabel, items }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page flex flex-col lg:flex-row-reverse gap-12">
        <Reveal>
          <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
        </Reveal>

        <div className=" grid lg:grid-cols-3 gap-4 w-full lg:min-w-[60%]">
          {items.map(({ pain, teaser }, i) => (
            <Reveal key={pain} delay={i * 70}>
              <div className="card-neutral flex h-full flex-col bg-paper">
                <span className="tag">{dict.pains[pain].shortLabel}</span>
                <p className="mt-4 flex-1 text-md text-ink">{teaser}</p>
                <ArrowLink href={`/${locale}/${pain}`} className="mt-6">
                  {linkLabel}
                </ArrowLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
