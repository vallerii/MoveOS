"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

type Position = { x: string; y: string };

type GlareCardProps = {
  children: ReactNode;
  className?: string;
  /** Tailwind classes for size/color/blur of the glow blob. */
  glareClassName?: string;
  /** Resting position of the glow (in px or %) when the cursor isn't over the card. */
  defaultPosition?: Position;
};

/**
 * Card wrapper for the soft brand-accent glow blob. At rest it sits in its
 * default corner (same look as the original static glow). On hover it
 * tracks the cursor 1:1; on mouse-leave it eases back to the default spot.
 * No animation library — just a ref + a CSS transition on left/top, same
 * lightweight approach as Reveal.tsx.
 */
export default function GlareCard({
  children,
  className = "",
  glareClassName = "h-64 w-64 rounded-full bg-brand-accent/25 blur-3xl",
  defaultPosition = { x: "100%", y: "100%" },
}: GlareCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<Position>(defaultPosition);
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div aria-hidden className={`pointer-events-none absolute ${glareClassName}`} style={glowStyle} />
      <div className="">{children}</div>
    </div>
  );
}
