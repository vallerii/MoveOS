"use client";

import { useRef, useState, type AnchorHTMLAttributes, type CSSProperties, type ReactNode } from "react";

type Position = { x: string; y: string };

type GlareButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
  className?: string;
  /** "solid" (default) is the `.btn-primary` filled pill used everywhere else.
   * "outline" is a smaller, border-only pill — for spots like the header
   * where a full-size filled CTA is too heavy. */
  variant?: "solid" | "outline";
  children: ReactNode;
};

const VARIANT_CLASSES: Record<"solid" | "outline", string> = {
  solid: "btn-primary",
  outline:
    "inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-brand-primary px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/5 active:scale-[0.98]",
};

/**
 * Same cursor-tracking glare as GlareCard.tsx, tinted with a light
 * brand-primary teal instead of GlareCard's default brand-accent gold —
 * gold reads fine on a white card, but the solid variant is already filled
 * brand-primary, so the highlight needs to be a lighter tint of the *same*
 * color family rather than a clashing accent.
 *
 * Unlike GlareCard (a generic wrapper around arbitrary children), this
 * renders the `<a>` itself — overflow-hidden needs to clip to the pill's
 * own rounded-full shape, not to some larger wrapping div, so the glare
 * stays inside the button's silhouette as the pointer moves across it.
 */
export default function GlareButton({ className = "", variant = "solid", children, ...anchorProps }: GlareButtonProps) {
  // Rests tucked in a corner (mostly clipped by overflow-hidden, so at most
  // a faint sliver shows) and only sweeps to the cursor on hover — same
  // convention as GlareCard's defaultPosition. The earlier version rested
  // dead-center ("50%, 50%"), which put a permanently-visible glow in the
  // middle of every button/card whether or not anyone was hovering it —
  // that's the "washed out" look that was reported, not the intended effect.
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<Position>({ x: "100%", y: "100%" });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setPos({ x: "100%", y: "100%" });
  };

  const glowStyle: CSSProperties = {
    left: pos.x,
    top: pos.y,
    transform: "translate(-50%, -50%)",
    transition: hovering
      ? "none"
      : "left 500ms cubic-bezier(0.16,1,0.3,1), top 500ms cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={`${VARIANT_CLASSES[variant]} relative overflow-hidden ${className}`}
      {...anchorProps}
    >
      <span aria-hidden className="pointer-events-none absolute h-24 w-24 rounded-full bg-[#5eead4]/45 blur-2xl" style={glowStyle} />
      <span className="relative">{children}</span>
    </a>
  );
}
