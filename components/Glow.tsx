type Bloom = "peach" | "rose" | "lavender" | "sky";

type Props = {
  /**
   * Which blooms to render, and in this order. Fewer is usually better away
   * from the hero: all four together read as a full-page wash, which is a
   * hero-scale gesture. Behind a single card, one or two is enough to light
   * it without competing with it.
   */
  blooms?: Bloom[];
  /** Positioning of the layer itself — defaults to filling its parent. */
  className?: string;
  /** Multiplies every bloom's opacity. Values above 1 are clamped at full. */
  intensity?: number;
  /**
   * Multiplies every bloom's size. This is the control that matters in a
   * small container: the blooms are sized for a viewport, so inside a short
   * card only their faint outer falloff lands in view and the whole thing
   * reads washed out. Scaling them down brings the saturated centre inside
   * the box. Roughly — full section 1, tall card 0.5, short banner 0.3.
   */
  scale?: number;
};

/**
 * Soft gradient wash — overlapping radial blooms, blurred hard enough that
 * no edge is ever readable.
 *
 * A deliberate, scoped exception to the "97% achromatic" rule: the reference
 * hero carries exactly this wash. It stays an exception by being rationed —
 * each placement picks a subset rather than dropping the full set in, and it
 * always sits beneath content (z-0, pointer-events-none) on a Paper or Mist
 * surface, so nothing it sits under loses contrast.
 *
 * The parent must establish a stacking context (`relative`) and, if the wash
 * should stop at its edges, clip it (`overflow-hidden`).
 */
const BLOOMS: Record<Bloom, { left: string; top: string; w: number; h: number; blur: number; color: string; opacity: number }> = {
  // The system's own accent, and the largest of the set, so a wash that
  // includes it resolves as warm rather than pink.
  peach: { left: "50%", top: "34%", w: 1150, h: 600, blur: 80, color: "#f6bf98", opacity: 1 },
  // Offset right and higher — gives the wash a centre of gravity instead of
  // a symmetrical halo.
  rose: { left: "63%", top: "28%", w: 700, h: 500, blur: 90, color: "#f19c8c", opacity: 0.95 },
  // Offset left and lower — the cool counterweight that keeps the warm tones
  // from reading as a single orange smear.
  lavender: { left: "33%", top: "42%", w: 660, h: 460, blur: 90, color: "#b8ade8", opacity: 0.9 },
  // The coldest of the set, far left and low, so the wash cools off towards
  // the edge instead of staying warm across its whole width.
  sky: { left: "16%", top: "56%", w: 620, h: 440, blur: 90, color: "#8ab6ea", opacity: 0.8 },
};

export default function Glow({
  blooms = ["peach", "rose", "lavender", "sky"],
  className = "absolute inset-0",
  intensity = 1,
  scale = 1,
}: Props) {
  return (
    <div aria-hidden className={`pointer-events-none z-0 ${className}`}>
      {blooms.map((name) => {
        const b = BLOOMS[name];
        return (
          <div
            key={name}
            className="absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.w * scale,
              height: b.h * scale,
              // Blur scales with the bloom, otherwise a shrunk bloom is all
              // blur and no colour.
              filter: `blur(${Math.round(b.blur * scale)}px)`,
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(closest-side, ${b.color}, transparent)`,
              opacity: Math.min(b.opacity * intensity, 1),
            }}
          />
        );
      })}
    </div>
  );
}
