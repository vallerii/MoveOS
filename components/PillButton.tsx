import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "filled" | "ghost";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & {
  href: string;
  variant?: Variant;
  /** Use next/link instead of a bare <a> — for internal route navigation. */
  internal?: boolean;
  className?: string;
  children: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  filled: "btn-pill",
  ghost: "btn-ghost",
};

/**
 * The system's action element. Two variants, identical geometry — a fully
 * rounded pill (9999px) with 24px horizontal padding and 16px sans label at
 * weight 400. Filled is ink-on-paper; ghost is a hairline ink outline on
 * transparent.
 *
 * They're designed to be used as a pair on the same baseline (filled
 * primary + ghost secondary), which is why the box metrics are shared
 * rather than each variant having its own padding/size.
 *
 * Replaces the old GlareButton: the cursor-tracking glow blob it rendered
 * is exactly the kind of decorative chrome this system removes — action
 * elements sit flat against the surface with no shadow and no highlight.
 */
export default function PillButton({
  href,
  variant = "filled",
  internal = false,
  className = "",
  children,
  ...anchorProps
}: Props) {
  const classes = `${VARIANTS[variant]} ${className}`.trim();

  if (internal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...anchorProps}>
      {children}
    </a>
  );
}
