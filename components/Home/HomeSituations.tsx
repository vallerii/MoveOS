import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import GlareButton from "../GlareButton";
import PainQuotesCarousel from "./PainQuotesCarousel";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";
import type { HomeCopy } from "@/lib/i18n/home";
import type { Dictionary, Locale } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  copy: HomeCopy;
};

// Bento layout: a big "what we do" panel + a stats panel on top, a
// pain-quote carousel + a links-to-every-situation panel below. Replaces the
// old 6-card grid — the six pain pages are still one click away, just as a
// compact link list instead of a full card each.
export default function HomeSituations({ locale, dict, copy }: Props) {
  const { whatWeDo, trustStats, quotes, linksPanel } = copy.situations;

  return (
    <section id="situations" className="relative bg-white py-20 sm:py-28">
      <Image
        src="/topo-contour4.png"
        alt=""
        aria-hidden="true"
        fill
        priority={false}
        className="pointer-events-none object-cover opacity-[0.08]"
      />

      <div className="container-page relative">
        <div className="grid gap-5 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card relative flex h-full min-h-[20rem] flex-col-reverse items-center justify-center gap-4 overflow-visible sm:flex-row sm:justify-between sm:gap-8">
              <div className="max-w-sm">
                <h3 className="text-card-title font-extrabold text-brand-ink">{whatWeDo.heading}</h3>
                <p className="mt-3 max-w-sm text-small text-brand-ink/70">{whatWeDo.body}</p>
                <GlareButton href="#quiz" variant="outline" className="mt-6">
                  {whatWeDo.cta} →
                </GlareButton>
              </div>
              <div className="relative -mt-6 aspect-[1280/853] w-56 shrink-0 sm:-mr-4 sm:-mt-10 sm:w-64 lg:-mr-4 lg:-mt-20 lg:w-[25rem]">
                <Image src="/situation.png" alt="" aria-hidden="true" fill className="object-contain object-left" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2">
            <div className="card flex h-full min-h-[20rem] flex-col justify-between bg-gradient-to-br from-white to-brand-primary/[0.09]">
              <h3 className="text-card-title font-extrabold text-brand-ink">{trustStats.heading}</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {trustStats.stats.map((s) => (
                  <div key={s.label} className="rounded-xl bg-white/70 p-4">
                    <p className="text-2xl font-extrabold text-brand-primary sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-base text-brand-ink/60">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal delay={120}>
            <PainQuotesCarousel quotes={quotes} />
          </Reveal>

          <Reveal delay={160}>
            <div id="situation-links" className="card h-full scroll-mt-24">
              <h3 className="text-card-title font-extrabold text-brand-ink">{linksPanel.heading}</h3>
              <nav className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {PAIN_SLUGS.map((slug) => {
                  const Icon = PAIN_ICONS[slug];
                  const pain = dict.pains[slug];
                  return (
                    <Link
                      key={slug}
                      href={`/${locale}/${slug}`}
                      className="group flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition hover:bg-brand-primary/5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 sm:h-14 sm:w-14 lg:h-16 lg:w-16">
                        <Icon className="h-5 w-5 text-brand-primary sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                      </span>
                      <span className="text-sm font-medium text-brand-ink/80 transition group-hover:text-brand-primary">
                        {pain.shortLabel}
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
