"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";
import { CONTACT_EMAIL } from "@/lib/config";
import BarcelonaSkyline from "./BarcelonaSkyline";
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

export default function Footer({ locale, dict }: Props) {
  // Derived from the route instead of a passed-in prop — the old
  // `currentPain` prop was never actually supplied by app/[locale]/layout.tsx
  // (it doesn't have access to the nested [pain] segment), so the
  // highlighting it was meant to drive never fired.
  const pathname = usePathname() || `/${locale}`;
  const currentSlug = pathname.split("/")[2];
  const extra = EXTRA[locale];

  return (
    <footer className="relative overflow-hidden border-t border-black/5 pb-10 pt-16 sm:pt-20 bg-[#EFEFEE]">
      {/* Decorative background — moved here from Quiz/QuizSection.tsx's
          section so the footer gets the same brand treatment (soft accent
          glow + a thin Barcelona skyline silhouette) instead of a bare
          white/border-only bar. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full  blur-3xl" />
        <BarcelonaSkyline className="absolute inset-x-0 bottom-[-20px] h-40 w-full animate-float text-brand-ink/[0.07] sm:h-56 md:h-72" />
      </div>

      <div className="container-page relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href={`/${locale}`} className="text-lg font-bold tracking-tight text-brand-ink">
              Move<span className="text-brand-primary">OS</span>
            </Link>
            <p className="mt-4 max-w-xs text-small text-brand-ink/60">{dict.footer.tagline}</p>
            <div className="mt-5">
              <LanguageSwitcher locale={locale} languageNames={dict.languageNames} />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/40 lg:text-sm">{extra.linksHeading}</p>
            <nav className="mt-4 flex flex-col gap-2.5">
              {PAIN_SLUGS.map((slug) => {
                const Icon = PAIN_ICONS[slug];
                const active = slug === currentSlug;
                return (
                  <Link
                    key={slug}
                    href={`/${locale}/${slug}`}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-2 text-sm transition lg:text-base ${
                      active ? "font-semibold text-brand-primary" : "text-brand-ink/60 hover:text-brand-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {dict.pains[slug].shortLabel}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink/40 lg:text-sm">{extra.companyHeading}</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-brand-ink/60 lg:text-base">
              <Link href={`/${locale}`} className="hover:text-brand-primary">
                {extra.home}
              </Link>
              <Link href={`/${locale}/privacy`} className="hover:text-brand-primary">
                {dict.footer.privacy}
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-primary">
                {extra.contact}
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-sm text-brand-ink/50 sm:flex-row lg:text-base">
          <span>© {new Date().getFullYear()} MoveOS</span>
          <span>{extra.bottomNote}</span>
        </div>
      </div>
    </footer>
  );
}
