"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { PAIN_SLUGS } from "@/lib/pains";
import { CONTACT_EMAIL } from "@/lib/config";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Small homepage/footer-only strings — same reasoning as lib/i18n/home.ts:
// these labels don't fit the per-pain `Dictionary` shape, so they live in a
// local map here instead of widening the shared type for one component.
const EXTRA: Record<Locale, { linksHeading: string; companyHeading: string; contact: string; home: string; bottomNote: string }> = {
  en: {
    linksHeading: "Move-Out Help",
    companyHeading: "Company",
    contact: "Contact us",
    home: "Home",
    bottomNote: "Free for every tenant.",
  },
  es: {
    linksHeading: "Ayuda con tu Mudanza",
    companyHeading: "Empresa",
    contact: "Contáctanos",
    home: "Inicio",
    bottomNote: "Gratis para cada inquilino.",
  },
  ru: {
    linksHeading: "Помощь с выездом",
    companyHeading: "Компания",
    contact: "Написать нам",
    home: "Главная",
    bottomNote: "Бесплатно для каждого арендатора.",
  },
};

/**
 * Fog-band footer — one tonal step off the canvas, a single hairline rule at
 * the top, and no decoration at all. The skyline illustration and accent
 * glow that used to sit behind it are both gone: this system uses product-UI
 * imagery only, with no illustration and no abstract graphics.
 *
 * Pain links are plain type now rather than icon rows — the icons pulled
 * colour and weight into what should be the quietest block on the page.
 */
export default function Footer({ locale, dict }: Props) {
  // Derived from the route instead of a passed-in prop — the old
  // `currentPain` prop was never actually supplied by app/[locale]/layout.tsx
  // (it doesn't have access to the nested [pain] segment), so the
  // highlighting it was meant to drive never fired.
  const pathname = usePathname() || `/${locale}`;
  const currentSlug = pathname.split("/")[2];
  const extra = EXTRA[locale];

  return (
    <footer className="border-t border-hairline bg-fog pb-12 pt-20 sm:pt-24">
      <div className="container-page">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="font-display text-2xl tracking-tight text-ink">
              MoveOS
            </Link>
            <p className="mt-5 max-w-xs text-caption text-slate">{dict.footer.tagline}</p>
            <div className="mt-8">
              <LanguageSwitcher locale={locale} languageNames={dict.languageNames} />
            </div>
          </div>

          <div>
            <p className="tag">{extra.linksHeading}</p>
            <nav className="mt-5 flex flex-col gap-3">
              {PAIN_SLUGS.map((slug) => {
                const active = slug === currentSlug;
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/${slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`text-caption transition-colors ${active ? "text-ink" : "text-slate hover:text-ink"}`}
                  >
                    {dict.pains[slug].shortLabel}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="tag">{extra.companyHeading}</p>
            <nav className="mt-5 flex flex-col gap-3 text-caption text-slate">
              <Link href={`/${locale}`} className="transition-colors hover:text-ink">
                {extra.home}
              </Link>
              <Link href={`/${locale}/privacy`} className="transition-colors hover:text-ink">
                {dict.footer.privacy}
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ink">
                {extra.contact}
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-8 text-meta text-ash sm:flex-row">
          <span>© {new Date().getFullYear()} MoveOS</span>
          <span>{extra.bottomNote}</span>
        </div>
      </div>
    </footer>
  );
}
