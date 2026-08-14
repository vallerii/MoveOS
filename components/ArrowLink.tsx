import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  /** Bare <a> instead of next/link — for hash anchors and external targets. */
  external?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Lowest-emphasis interactive element in the system: no background, no
 * border, no radius. The trailing arrow glyph is part of the label and
 * carries the link affordance on its own — the underline appears only on
 * hover, never at rest.
 */
export default function ArrowLink({ href, external = false, className = "", children }: Props) {
  const classes = `link-arrow group ${className}`.trim();
  const content = (
    <>
      {children}
      <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </>
  );

  if (external) {
    // The only current caller (HomeSituations' "#quiz" link, now BOOKING_URL)
    // points off-site, so external always opens in a new tab with noopener —
    // there's no in-site use of `external` left to make that the wrong
    // default for.
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
