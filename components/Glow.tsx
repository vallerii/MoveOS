type Bloom = "peach" | "rose" | "lavender" | "sky";

type Props = {
  /**
   * Which blooms to render, and in this order. Fewer is usually better away
   * from the hero: all three together read as a full-page wash, which is a
   * hero-scale gesture. Behind a single card, one or two is enough to light
   * it without competing with it.
   */
  blooms?: Bloom[];
  /** Positioning of the layer itself — defaults to filling its parent. */
  className?: string;
  /** Multiplies every bloom's opacity, for placements that need it quieter. */
  intensity?: number;
};

/**
 * Soft gradient wash — three overlapping radial blooms, blurred hard enough
 * that no edge is ever readable.
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
const BLOOMS: Record<Bloom, { className: string; color: string; opacity: number }> = {
  // The system's own accent, and the largest of the three, so a wash that
  // includes it resolves as warm rather than pink.
  peach: {
    className: "left-1/2 top-[34%] h-[600px] w-[1150px] -translate-x-1/2 blur-[80px]",
    color: "#f7ceb0",
    opacity: 1,
  },
  // Offset right and higher — gives the wash a centre of gravity instead of
  // a symmetrical halo.
  rose: {
    className: "left-[63%] top-[28%] h-[500px] w-[700px] -translate-x-1/2 blur-[90px]",
    color: "#f4b3a6",
    opacity: 0.95,
  },
  // Offset left and lower — the cool counterweight that keeps the warm tones
  // from reading as a single orange smear.
  lavender: {
    className: "left-[33%] top-[42%] h-[460px] w-[660px] -translate-x-1/2 blur-[90px]",
    color: "#cdc6ec",
    opacity: 0.85,
  },
  // The coldest of the set, far left and low, so the wash cools off towards
  // the edge instead of staying warm across its whole width.
  sky: {
    className: "left-[14%] top-[58%] h-[420px] w-[560px] -translate-x-1/2 blur-[90px]",
    color: "#98c0ee",
    opacity: 0.7,
  },
};

export default function Glow({
  blooms = ["peach", "rose", "lavender", "sky"],
  className = "absolute inset-0",
  intensity = 1,
}: Props) {
  return (
    <div aria-hidden className={`pointer-events-none z-0 ${className}`}>
      {blooms.map((name) => {
        const bloom = BLOOMS[name];
        return (
          <div
            key={name}
            className={`absolute rounded-full ${bloom.className}`}
            style={{
              background: `radial-gradient(closest-side, ${bloom.color}, transparent)`,
              opacity: bloom.opacity * intensity,
            }}
          />
        );
      })}
    </div>
  );
}
