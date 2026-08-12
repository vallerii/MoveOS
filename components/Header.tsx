"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { PAIN_SLUGS } from "@/lib/i18n/types";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { ChevronDownIcon } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";
import PillButton from "./PillButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

// Short label for the click-to-toggle nav trigger (see NOTE below) — not
// part of the shared Dictionary since nothing else in the app needs it.
const MORE_LABEL: Record<Locale, string> = {
  en: "Topics",
  es: "Temas",
  ru: "Услуги",
};

// Link to /[locale]/host — a different audience (landlords, not tenants)
// from the six PAIN_SLUGS links above, so it's kept as its own item rather
// than folded into that list or its dropdown. Same "local map, not shared
// Dictionary" reasoning as MORE_LABEL.
const HOST_NAV_LABEL: Record<Locale, string> = {
  en: "For Owners",
  es: "Propietarios",
  ru: "Владельцам",
};

function MenuIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" className={className}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * A single transparent top bar — no background panel, no border, no shadow,
 * no separator. Logo left, nav links centre, CTA right. The nav is meant to
 * recede entirely; the only element carrying weight up here is the pill CTA.
 *
 * The bar stays sticky but sits on Paper White with a light blur rather than
 * the previous tinted panel: the design system has no chrome bar, and a hard
 * rule under the header would be the loudest hairline on the page.
 *
 * NOTE on breakpoints — two tiers:
 *   - >= lg : a single "Topics ▾" trigger that opens a click-to-toggle
 *     dropdown (not hover — was hover-only before, but a row of six links
 *     never fitting on one line at any width made "hover to discover them"
 *     the wrong default; a click trigger is also what mobile needs anyway,
 *     so this collapses what used to be three tiers into two consistent
 *     ones). Closes on an outside click, Escape, or picking a link.
 *   - < lg  : burger menu
 * The language switcher lives in the footer, and in the burger panel below lg.
 *
 * Breakpoint visibility is written as `u-hidden xl:flex` rather than the
 * more usual `hidden xl:flex`. Same result, but it never puts the bare class
 * `hidden` on an element. `.hidden` is an unusually collision-prone name —
 * plenty of third-party stylesheets (browser extensions especially) define
 * their own, and theirs loads after ours, so at equal specificity it wins and
 * the element stays hidden at every width. That's what emptied this header
 * down to the logo. `u-hidden` (see globals.css) compiles to an app-specific
 * class name, so nothing else can claim it.
 *
 * This used to be `max-xl:hidden` (hidden below xl, shown at xl+, same
 * result as `u-hidden xl:flex` but derived from a "max" variant instead of
 * spelled out as two rules) — switched because Tailwind wasn't actually
 * generating `max-*` variants at all in this project: the `pin` screen in
 * tailwind.config.ts is a `{ raw: ... }` entry, and Tailwind can't derive a
 * max-width counterpart from a raw screen, which silently disables `max-*`
 * generation for every breakpoint, not just `pin`. `u-hidden` sidesteps
 * that entirely — see the comment on `.u-hidden` in globals.css.
 */
export default function Header({ locale, dict }: Props) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const topicsRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === `/${locale}`;
  const currentSlug = pathname.split("/")[2];
  const ctaHref = isHome ? "#situations" : "#quiz";

  const links = PAIN_SLUGS.map((slug) => ({
    slug,
    label: dict.pains[slug].shortLabel,
    href: `/${locale}/${slug}`,
    active: slug === currentSlug,
  }));

  // Click-to-toggle dropdown: closes on an outside click or Escape, since
  // it no longer has hover's implicit "mouse left the area" dismissal.
  useEffect(() => {
    if (!topicsOpen) return;

    function handlePointerDown(e: MouseEvent) {
      if (topicsRef.current && !topicsRef.current.contains(e.target as Node)) setTopicsOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setTopicsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [topicsOpen]);

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md">
      <div className="container-page relative flex h-20 items-center justify-between gap-6">
        <Link href={`/${locale}`} className="shrink-0 font-display text-2xl tracking-tight text-ink">
          MoveOS
        </Link>

        {/* Услуги + Владельцам, grouped and truly centred (absolute +
            -translate-x-1/2, not justify-between's uneven middle-child
            spacing — the logo and the CTA/burger group aren't the same
            width, so relying on flex spacing alone put this pair off-centre
            toward the CTA). See the NOTE above the component for why the
            dropdown itself is click-to-toggle rather than hover. */}
        <div className="u-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex">
          <div ref={topicsRef} className="relative">
            <button
              type="button"
              onClick={() => setTopicsOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={topicsOpen}
              className="flex items-center gap-1.5 whitespace-nowrap text-base text-slate transition-colors hover:text-ink"
            >
              {MORE_LABEL[locale]}
              <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${topicsOpen ? "rotate-180" : ""}`} />
            </button>
            {topicsOpen && (
              <div className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-4">
                <div className="rounded-card-sm bg-paper p-2 shadow-popover">
                  {links.map((l) => (
                    <Link
                      key={l.slug}
                      href={l.href}
                      onClick={() => setTopicsOpen(false)}
                      aria-current={l.active ? "page" : undefined}
                      className={`block rounded-xl px-3.5 py-2.5 text-base transition-colors ${
                        l.active ? "bg-mist text-ink" : "text-slate hover:bg-fog hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href={`/${locale}/host`} className="whitespace-nowrap text-base text-slate transition-colors hover:text-ink">
            {HOST_NAV_LABEL[locale]}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <PillButton href={ctaHref} variant="filled" className="u-hidden !py-2.5 !text-[15px] lg:inline-flex">
            {dict.nav.bookButton}
          </PillButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-ink transition-colors hover:bg-fog lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile panel — links, language switcher, and CTA all live here
            below lg, since none of them fit in the collapsed bar. */}
        {open && (
          // Sits just under the 80px bar (h-20) with a small gap.
          <div className="absolute inset-x-0 top-[84px] z-40 rounded-card bg-paper px-4 pb-6 pt-4 shadow-overlay lg:hidden">
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.slug}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={l.active ? "page" : undefined}
                  className={`rounded-xl px-3.5 py-3 text-base transition-colors ${
                    l.active ? "bg-mist text-ink" : "text-slate hover:bg-fog hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/host`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3.5 py-3 text-base text-slate transition-colors hover:bg-fog hover:text-ink"
              >
                {HOST_NAV_LABEL[locale]}
              </Link>
            </nav>

            <div className="mt-5 border-t border-hairline pt-5">
              <LanguageSwitcher locale={locale} languageNames={dict.languageNames} />
            </div>

            <PillButton href={ctaHref} onClick={() => setOpen(false)} className="mt-4 flex w-full justify-center">
              {dict.nav.bookButton}
            </PillButton>
          </div>
        )}
      </div>
    </header>
  );
}
