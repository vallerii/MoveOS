import Link from "next/link";
import Image from "next/image";
import Reveal from "../Reveal";
import GlareLink from "../GlareLink";
import { ScaleIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon, MagnifyingGlassIcon } from "../icons";
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

const trustFactIcons = [ScaleIcon, DocumentTextIcon, ClockIcon];

// Concrete, sourced articles (not manufactured social proof) to build
// urgency before the "how it works" step. Card content (title/description/
// image) now comes from DatoCMS's Article model instead of being hardcoded
// here — see lib/datocms.ts and app/[locale]/blog/[slug]/page.tsx for the
// pages these cards link to.
export default function HomeTrust({ copy, locale, articles }: Props) {
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
          {articles.map(({ slug, title, description, image }, i) => {
            const Icon = trustFactIcons[i] ?? CheckCircleIcon;
            return (
              <Reveal key={slug} delay={i * 90} direction="right">
                <Link href={`/${locale}/blog/${slug}`} className="card relative flex h-full flex-col overflow-hidden">
                  {image ? (
                    <div className="relative -mx-4 -mt-4 mb-3 h-32 w-[calc(100%+2rem)] overflow-hidden rounded-t-2xl sm:-mx-6 sm:-mt-6 sm:h-36 sm:w-[calc(100%+3rem)]">
                      <Image
                        src={image.url}
                        alt={image.alt ?? title}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <Icon className="absolute -right-4 -top-2 h-16 w-16 text-brand-primary opacity-20" />
                      <Icon className="h-6 w-6 text-brand-primary mt-2" />
                    </>
                  )}
                  <p className="mt-3 pr-6 text-lg font-extrabold text-brand-ink">{title}</p>
                  <p className="mt-2 text-small text-brand-ink/70">{description}</p>
                </Link>
              </Reveal>
            );
          })}

          {/* CTA card, same row as the article cards — same accent-glow
              treatment as WhatYouGet's "resultLabel" card, but clickable
              through to the quiz. The grid's default stretch makes every
              card match the row's tallest item, which is this one
              (min-h below), so all cards end up the same height. */}
          <Reveal delay={articles.length * 90} direction="right">
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
