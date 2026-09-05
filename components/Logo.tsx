import Link from "next/link";
import type { Locale } from "@/lib/i18n/types";

/**
 * Movingo identity — the mark plus the wordmark.
 *
 * The mark is a house silhouette whose interior stroke reads as a capital
 * "M": the two legs land on the floor line and merge with it, so the letter
 * and the building are the same drawing rather than a letter parked inside a
 * box. Geometry is tuned for the 16px favicon end of the range — see
 * app/icon.svg, which is this same path at favicon scale. Anything finer
 * (window dots, a thinner inner stroke) turned to mush there, so it isn't
 * here either.
 *
 * `currentColor` throughout: the mark inherits whatever text colour its
 * container sets, which is what lets the same component sit on paper in the
 * header and on ink surfaces without a second asset.
 */
export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 13.2 16 3.5l12.5 9.7V28.5H3.5z" />
      <path d="M10 28.5V16l6 5 6-5v12.5" />
    </svg>
  );
}

/**
 * Wordmark. Set in the display serif at weight 400 like every other headline
 * in the system — the restraint is the signature, and a second typeface for
 * the logo alone would be the one place the page contradicts itself.
 */
export function Logo({
  locale,
  className = "",
  markClassName = "h-7 w-7",
  textClassName = "text-2xl",
}: {
  locale: Locale;
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label="Movingo"
      className={`flex shrink-0 items-center gap-2.5 text-ink ${className}`}
    >
      <LogoMark className={markClassName} />
      <span className={`font-display tracking-tight ${textClassName}`}>Movingo</span>
    </Link>
  );
}
