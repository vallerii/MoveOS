import type { CSSProperties } from "react";

type ScrollGlowProps = {
  /** Position, size, and color classes — must include "absolute". Avoid
   * transform utilities here; use `baseTransform` instead (see below). */
  className: string;
  /** Extra inline styles (e.g. left/top for freeform placement). */
  style?: CSSProperties;
  /** Whether the blob should be faded in — driven by the parent's scroll tracking. */
  visible: boolean;
  /** Delay before the fade-in starts once `visible` flips true. */
  delay?: number;
  /** Transform applied regardless of visibility (e.g. "translateY(-50%)" for
   * centering) — combined with the fade-in scale into a single inline
   * `transform`, since an inline style can't be split across a Tailwind
   * class and a style prop without one clobbering the other. */
  baseTransform?: string;
};

/**
 * Leaf glow blob that fades + scales in when `visible` becomes true, instead
 * of being visible on page load. Driven entirely by inline styles (not
 * Tailwind utility classes) so it doesn't depend on the Tailwind dev-server
 * cache picking up freshly-used classes like `scale-75`.
 */
export default function ScrollGlow({
  className,
  style,
  visible,
  delay = 0,
  baseTransform = "",
}: ScrollGlowProps) {
  return (
    <div
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: `${baseTransform} scale(${visible ? 1 : 0.75})`.trim(),
        transition: "opacity 1000ms ease-out, transform 1000ms ease-out",
        transitionDelay: visible ? `${delay}ms` : "0ms",
      }}
    />
  );
}
