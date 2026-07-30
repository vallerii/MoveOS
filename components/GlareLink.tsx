"use client";

import Link from "next/link";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

type Position = { x: string; y: string };

type GlareLinkProps = {
  href: string;
  className?: string;
  /** Tailwind classes for size/color/blur of the glow blob — teal by default. */
  glareClassName?: string;
  /** Resting position (see note in the component body) — defaults to a corner, like GlareCard. */
  defaultPosition?: Position;
  children: ReactNode;
};

/**
 * Same cursor-tracking glare as GlareButton, built on next/link instead of
 * a plain <a> so it works for the "pick your situation" cards on the
 * homepage. Kept separate from GlareCard (which wraps a generic <div> and
 * doesn't accept an href) and from GlareButton (which hardcodes the
 * `.btn-primary` pill styling) — this one leaves layout entirely to the
 * caller's className, since card content is more structured than a button
 * label.
 */
export default function GlareLink({
  href,
  className = "",
  glareClassName = "h-32 w-32 rounded-full bg-brand-primary/25 blur-2xl",
  defaultPosition = { x: "100%", y: "100%" },
  children,
}: GlareLinkProps) {
  // Rests tucked in a corner (mostly clipped by overflow-hidden) and only
  // sweeps to the cursor on hover — same convention as GlareCard. Resting
  // dead-center ("50%, 50%", the original value here) put a permanently
  // visible glow in the middle of every card regardless of hover, which is
  // the "washed out" look that was reported.
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<Position>(defaultPosition);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` });
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setPos(defaultPosition);
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
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col overflow-hidden ${className}`}
    >
      <span aria-hidden className={`pointer-events-none absolute ${glareClassName}`} style={glowStyle} />
      {children}
    </Link>
  );
}
