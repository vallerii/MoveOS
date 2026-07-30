"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { PAIN_SLUGS } from "@/lib/i18n/types";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { ChevronDownIcon } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";
import GlareButton from "./GlareButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Short nav-trigger label for the "doesn't fit yet" tier (see NOTE below) —
// not part of the shared Dictionary since nothing else in the app needs it.
const MORE_LABEL: Record<Locale, string> = {
  en: "Topics",
  es: "Temas",
  ru: "Темы",
};

function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * "use client" so the nav can highlight the current pain page and the CTA
 * can point at the right in-page anchor (#situations on the homepage,
 * #quiz everywhere else) via usePathname.
 *
 * NOTE on breakpoints — all six pain labels (longest is Russian, e.g.
 * "Мебель и вещи мебель") plus the logo and CTA don't reliably fit on one
 * line until a fairly wide viewport. Three tiers instead of the old
 * single lg cutoff:
 *   - >= xl : full inline nav, all six links, nowrap
 *   - lg–xl : a single "Topics ▾" trigger with a hover dropdown holding
 *             all six links, so nothing wraps or gets squeezed
 *   - < lg  : burger menu (unchanged)
 * The language switcher no longer lives in the bar at all — it's in the
 * footer, and in the burger panel for anyone below lg.
 */
export default function Header({ locale, dict }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);

  const isHome = pathname === `/${locale}`;
  const currentSlug = pathname.split("/")[2];
  const ctaHref = isHome ? "#situations" : "#quiz";

  const links = PAIN_SLUGS.map((slug) => ({
    slug,
    label: dict.pains[slug].shortLabel,
    href: `/${locale}/${slug}`,
    active: slug === currentSlug,
  }));

  return (
    <header className="sticky top-0 z-50 border-b bg-[#EFEFEE]/10 backdrop-blur-md">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} className="shrink-0 text-lg font-bold tracking-tight text-brand-ink">
          Move<span className="text-brand-primary">OS</span>
        </Link>

        {/* Full nav — wide screens only, so six labels never wrap. */}
        <nav className="hidden items-center gap-5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.slug}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`whitespace-nowrap text-sm font-medium transition lg:text-base ${
                l.active ? "text-brand-primary" : "text-brand-ink/70 hover:text-brand-primary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mid tier — links don't fit yet, collapse into one hover dropdown
            instead of wrapping or squeezing. */}
        <div className="hidden lg:block xl:hidden">
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-brand-ink/70 transition hover:text-brand-primary lg:text-base"
            >
              {MORE_LABEL[locale]}
              <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-black/5 bg-white p-2 shadow-card">
                {links.map((l) => (
                  <Link
                    key={l.slug}
                    href={l.href}
                    aria-current={l.active ? "page" : undefined}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition lg:text-base ${
                      l.active ? "bg-brand-primary/10 text-brand-primary" : "text-brand-ink/70 hover:bg-brand-primary/5 hover:text-brand-primary"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GlareButton href={ctaHref} variant="outline" className="hidden lg:inline-flex">
            {dict.nav.bookButton}
          </GlareButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 text-brand-ink lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile panel — links, language switcher, and CTA all live here
            below lg, since none of them fit in the collapsed bar. */}
        {open && (
          <div className="absolute inset-x-0 top-16 z-40 border-b border-black/5 bg-[#EFEFEE] px-4 pb-6 pt-4 shadow-card lg:hidden">
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.slug}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={l.active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                    l.active ? "bg-brand-primary/10 text-brand-primary" : "text-brand-ink/80"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/5 pt-4">
              <LanguageSwitcher locale={locale} languageNames={dict.languageNames} />
            </div>

            <GlareButton href={ctaHref} onClick={() => setOpen(false)} className="mt-4 flex justify-center">
              {dict.nav.bookButton}
            </GlareButton>
          </div>
        )}
      </div>
    </header>
  );
}
