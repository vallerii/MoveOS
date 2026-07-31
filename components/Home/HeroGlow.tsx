/**
 * Soft gradient wash sitting directly beneath the hero headline.
 *
 * Three overlapping radial blooms — peach, rose and lavender — blurred so no
 * edge is ever readable. They're anchored to the headline block rather than
 * to the bottom of the section: the bloom should look like light coming off
 * the type itself, which means its centre sits just below the last line of
 * the h1, not down by the section boundary.
 *
 * This is a deliberate, scoped exception to the "97% achromatic" rule: the
 * reference hero carries exactly this wash, and it's confined to one section
 * on one page. The blooms sit beneath all content (z-0, pointer-events-none)
 * on the Paper White canvas, so headline contrast is untouched.
 */
export default function HeroGlow() {
  return (
    // Not clipped to the section — the bloom is allowed to bleed past the
    // hero's bottom edge, which is what keeps it from reading as a band with
    // a visible cut-off. `inset-0` plus generous bloom heights covers it.
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Peach — the system's own accent, and the largest of the three, so
          the wash resolves as warm rather than pink. Sat directly under the
          headline's last line, not down at the section boundary. */}
      <div
        className="absolute left-1/2 top-[34%] h-[600px] w-[1150px] -translate-x-1/2 rounded-full opacity-100 blur-[80px]"
        style={{ background: "radial-gradient(closest-side, #f7ceb0, transparent)" }}
      />
      {/* Rose, offset right and slightly higher — gives the bloom a centre of
          gravity instead of a symmetrical halo. */}
      <div
        className="absolute left-[63%] top-[28%] h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-95 blur-[90px]"
        style={{ background: "radial-gradient(closest-side, #f4b3a6, transparent)" }}
      />
      {/* Lavender, offset left and lower — the cool counterweight that keeps
          the warm tones from reading as a single orange smear. */}
      <div
        className="absolute left-[33%] top-[42%] h-[460px] w-[660px] -translate-x-1/2 rounded-full opacity-85 blur-[90px]"
        style={{ background: "radial-gradient(closest-side, #cdc6ec, transparent)" }}
      />
      {/* The hero clips its own overflow, which cuts the blooms off with a
          visible horizontal seam at the section boundary. This fade pins the
          wash to Paper White before it reaches that edge, so the transition
          into the next section reads as light falling off rather than as a
          band ending. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
