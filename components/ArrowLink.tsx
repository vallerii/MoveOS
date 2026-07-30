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
    return (
      <a href={href} className={classes}>
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
