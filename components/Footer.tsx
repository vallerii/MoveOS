"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { PAIN_SLUGS } from "@/lib/pains";
import { CONTACT_EMAIL } from "@/lib/config";
import { HOST_FIRST_TIME_LOCALES } from "@/lib/i18n/hostFirstTime";
import LanguageSwitcher from "./LanguageSwitcher";
import { Logo } from "./Logo";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Small homepage/footer-only strings — same reasoning as lib/i18n/home.ts:
// these labels don't fit the per-pain `Dictionary` shape, so they live in a
// local map here instead of widening the shared type for one component.
const EXTRA: Record<
  Locale,
  {
    linksHeading: string;
    companyHeading: string;
    contact: string;
    home: string;
    bottomNote: string;
    hostLink: string;
    // Only rendered for locales in HOST_FIRST_TIME_LOCALES (see below) —
    // kept here rather than made optional so every locale has ready copy
    // the moment it's translated.
    hostFirstTimeLink: string;
    // The two checklist variants (dict.checklist.qualified / .generic) —
    // moved here from the closing QuizSection booking card, which used to
    // link the "qualified" one only. This is now their only in-app entry
    // point, so both need a place, and a short label distinguishing them
    // (view/download action words come from dict.results, reused as-is).
    checklistsHeading: string;
    checklistQualified: string;
    checklistGeneric: string;
  }
> = {
  en: {
    linksHeading: "Move-Out Help",
    companyHeading: "Company",
    contact: "Contact us",
    home: "Home",
    bottomNote: "Free consultation — for tenants and owners alike.",
    hostLink: "Short-Term Rental",
    hostFirstTimeLink: "First-Time Landlord",
    checklistsHeading: "Move-out checklists",
    checklistQualified: "Barcelona",
    checklistGeneric: "Spain (general)",
  },
  es: {
    linksHeading: "Ayuda con tu Mudanza",
    companyHeading: "Empresa",
    contact: "Contáctanos",
    home: "Inicio",
    bottomNote: "Consulta gratuita — para inquilinos y propietarios.",
    hostLink: "Alquiler de temporada",
    hostFirstTimeLink: "Primer alquiler",
    checklistsHeading: "Checklists de mudanza",
    checklistQualified: "Barcelona",
    checklistGeneric: "España (general)",
  },
  ru: {
    linksHeading: "Помощь с выездом",
    companyHeading: "Компания",
    contact: "Написать нам",
    home: "Главная",
    bottomNote: "Бесплатная консультация — для арендаторов и владельцев.",
    hostLink: "Посуточная сдача",
    hostFirstTimeLink: "Первая сдача",
    checklistsHeading: "Чек-листы по выезду",
    checklistQualified: "Барселона",
    checklistGeneric: "Испания (общий)",
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
            <Logo locale={locale} />
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
              <Link
                href={`/${locale}/host`}
                aria-current={pathname === `/${locale}/host` ? "page" : undefined}
                className={`transition-colors ${pathname === `/${locale}/host` ? "text-ink" : "hover:text-ink"}`}
              >
                {extra.hostLink}
              </Link>
              {HOST_FIRST_TIME_LOCALES.includes(locale) && (
                <Link
                  href={`/${locale}/host/first-time`}
                  aria-current={pathname === `/${locale}/host/first-time` ? "page" : undefined}
                  className={`transition-colors ${
                    pathname === `/${locale}/host/first-time` ? "text-ink" : "hover:text-ink"
                  }`}
                >
                  {extra.hostFirstTimeLink}
                </Link>
              )}
              <Link href={`/${locale}/privacy`} className="transition-colors hover:text-ink">
                {dict.footer.privacy}
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ink">
                {extra.contact}
              </a>
            </nav>
          </div>
        </div>

        {/* The two checklist variants' only in-app entry point now that the
            QuizSection booking card no longer links them directly — kept to
            one quiet line rather than a fifth grid column, matching this
            footer's "no decoration, plain type" brief. */}
        <div className="mt-16 border-t border-hairline pt-8 text-meta text-ash">
          {extra.checklistsHeading}:{" "}
          <Link
            href={`/${locale}/checklist/qualified`}
            className="underline underline-offset-4 hover:text-ink"
          >
            {extra.checklistQualified} — {dict.results.viewChecklistButton}
          </Link>{" "}
          ·{" "}
          <a
            href={`/checklists/${locale}/qualified.pdf`}
            download
            className="underline underline-offset-4 hover:text-ink"
          >
            {dict.results.downloadPdf}
          </a>{" "}
          ·{" "}
          <Link
            href={`/${locale}/checklist/generic`}
            className="underline underline-offset-4 hover:text-ink"
          >
            {extra.checklistGeneric} — {dict.results.viewChecklistButton}
          </Link>{" "}
          ·{" "}
          <a
            href={`/checklists/${locale}/generic.pdf`}
            download
            className="underline underline-offset-4 hover:text-ink"
          >
            {dict.results.downloadPdf}
          </a>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-8 text-meta text-ash sm:flex-row">
          <span>© {new Date().getFullYear()} Movingo</span>
          <span>{extra.bottomNote}</span>
        </div>
      </div>
    </footer>
  );
}
