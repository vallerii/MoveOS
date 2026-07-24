"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  languageNames: Record<Locale, string>;
};

/** Swaps the locale segment of the current path, keeping the rest (the pain slug). */
function pathForLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = target;
  return `/${segments.join("/")}`;
}

export default function LanguageSwitcher({ locale, languageNames }: Props) {
  const pathname = usePathname() || `/${locale}`;

  return (
    <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/70 p-1 text-sm">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={pathForLocale(pathname, l)}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-3 py-1.5 font-medium transition ${
            l === locale
              ? "bg-brand-primary text-white"
              : "text-brand-ink/60 hover:text-brand-ink"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
      <span className="sr-only">{Object.values(languageNames).join(", ")}</span>
    </div>
  );
}
