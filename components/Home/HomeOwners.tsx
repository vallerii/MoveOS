import Reveal from "../Reveal";
import ArrowLink from "../ArrowLink";
import type { HomeCopy } from "@/lib/i18n/home";
import type { Locale } from "@/lib/i18n/types";

type Props = {
  copy: HomeCopy;
  locale: Locale;
};

/**
 * "For owners" bridge block — sits between HomeWhyUs and FAQ.
 *
 * Everything above this point on the homepage (situations, how it works,
 * what's included, why us) is the tenant journey end to end; this is the
 * one section that gives an owner visitor a real landing spot instead of
 * the Header's "Владельцам" dropdown being the only way to find /host and
 * /host/first-time. `id="for-owners"` is the anchor both HomeHero's
 * secondary CTA and HomeSituations' trustStats card link to.
 *
 * Optional at the copy level (see lib/i18n/home.ts `owners`) — a locale
 * without owner copy yet just doesn't render this section, same pattern as
 * HomeHero's ownerCta and HomeSituations' owner stats/links.
 */
export default function HomeOwners({ copy, locale }: Props) {
  const { owners } = copy;
  if (!owners) return null;

  return (
    <section id="for-owners" className="scroll-mt-24 bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <p className="tag">{owners.eyebrow}</p>
            <h2 className="mt-4 font-display text-heading-lg text-ink">{owners.heading}</h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {owners.cards.map((card, i) => (
            <Reveal key={card.slug} delay={i * 80}>
              <div className="card-neutral flex h-full flex-col justify-between">
                <div>
                  <h3 className="font-display text-heading-sm text-ink">{card.title}</h3>
                  <p className="mt-4 text-caption text-slate">{card.body}</p>
                </div>
                <div className="mt-8">
                  <ArrowLink href={`/${locale}/${card.slug}`}>{card.cta}</ArrowLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={owners.cards.length * 80}>
          <p className="mt-8 text-meta text-ash">{owners.trustLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
