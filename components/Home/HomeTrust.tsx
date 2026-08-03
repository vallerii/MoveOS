import Link from "next/link";
import Image from "next/image";
import Reveal from "../Reveal";
import { MagnifyingGlassIcon } from "../icons";
import type { HomeCopy } from "@/lib/i18n/home";
import type { Locale } from "@/lib/i18n/types";
import type { ArticleSummary } from "@/lib/datocms";

type Props = {
  copy: HomeCopy;
  locale: Locale;
  /** Published articles from DatoCMS (see lib/datocms.ts getTrustArticles),
   * newest first, already capped at 3 by the caller. */
  articles: ArticleSummary[];
};

/**
 * A handful of concrete, sourced articles (not manufactured social proof)
 * to build urgency before the "how it works" step, on a Fog band.
 *
 * Card content (title/description/image) comes from DatoCMS's Article
 * model instead of being hardcoded — see lib/datocms.ts and
 * app/[locale]/blog/[slug]/page.tsx for the pages these cards link to.
 *
 * Laid out with a deliberate size hierarchy, following the reference: up to
 * three compact Mist cards and the Accent Peach card share one row, with
 * the accent card wider and taller than the articles beside it. Keeping it
 * last preserves the reading order — articles first, then the invitation —
 * while size and colour still make it the thing the eye lands on. It's the
 * page's single peach surface and the only clickable cell here besides the
 * article cards themselves, which is what earns it the accent.
 */
export default function HomeTrust({ copy, locale, articles }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-heading-lg text-ink">{copy.trust.heading}</h2>
            <p className="mt-6 max-w-xl text-body text-slate">{copy.trust.subheading}</p>
          </div>
        </Reveal>

        {/* One row of nine columns: the articles share six, the accent
            card takes three. That's what makes it the biggest cell without
            moving it out of reading order.

            `items-end` on the outer row rather than the default stretch —
            stretching would pull the grey cards up to the accent card's
            height and erase the size difference this layout exists for.
            Aligning the bottoms keeps the row tidy while letting the accent
            card run taller than the articles.

            The articles then sit in their own nested grid, which DOES
            stretch, so they equalise against each other and their bottoms
            line up. */}
        <div className="mt-16 grid items-end gap-4 lg:grid-cols-9">
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-3">
            {articles.map(({ slug, title, description, image }, i) => (
              <Reveal key={slug} delay={i * 80} direction="right" className="h-full">
                <Link href={`/${locale}/blog/${slug}`} className="card-neutral flex h-full flex-col">
                  {image && (
                    <div className="relative -mx-4 -mt-4 mb-5 h-32 w-[calc(100%+2rem)] overflow-hidden rounded-t-card sm:-mx-8 sm:-mt-8 sm:w-[calc(100%+4rem)]">
                      <Image
                        src={image.url}
                        alt={image.alt ?? title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-heading-sm text-ink">{title}</p>
                  <p className="mt-4 text-meta text-slate">{description}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={articles.length * 80} direction="right" className="lg:col-span-3">
            <Link
              href="#quiz"
              className="card-peach group relative flex flex-col justify-between overflow-hidden transition-opacity hover:opacity-90"
            >
              {/* The one icon in this section, and it sits in the background
                  rather than in the content flow: centred vertically, nudged
                  right of centre, and tinted far down so the headline reads
                  straight over it. Decorative, so it's hidden from assistive
                  tech — the link's own text already says where it goes. */}
              <MagnifyingGlassIcon
                aria-hidden
                className="pointer-events-none absolute left-[58%] top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 text-sienna/[0.09]"
              />

              <span className="relative z-10 text-meta text-sienna/60">{copy.trust.ctaCard.badge}</span>

              <p className="relative z-10 mt-28 font-display text-heading text-sienna">
                {copy.trust.ctaCard.text}
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
