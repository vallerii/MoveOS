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
    // Pill-geometry segmented control on a hairline border — the same
    // rounded-full silhouette as the buttons, at a smaller scale, with the
    // active locale carrying the system's one dark fill.
    <div className="inline-flex w-fit items-center gap-1 rounded-full border border-hairline bg-paper p-1 text-meta">
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={pathForLocale(pathname, l)}
          aria-current={l === locale ? "true" : undefined}
          className={`rounded-full px-3.5 py-1.5 transition-colors ${
            l === locale ? "bg-ink text-paper" : "text-slate hover:text-ink"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
      <span className="sr-only">{Object.values(languageNames).join(", ")}</span>
    </div>
  );
}
