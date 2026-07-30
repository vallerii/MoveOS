/**
 * Soft gradient wash sitting at the foot of the homepage hero.
 *
 * Three overlapping radial blooms — peach, rose and lavender — blurred hard
 * enough that no edge is ever readable, fading to nothing before they reach
 * the section boundary. It reads as light spilling up from below the fold
 * rather than as a coloured background.
 *
 * This is a deliberate, scoped exception to the "97% achromatic" rule: the
 * reference hero carries exactly this wash, and it's confined to one
 * section on one page. The blooms sit at low opacity beneath everything
 * (z-0, pointer-events-none), so headline contrast is untouched — the
 * canvas underneath stays Paper White.
 */
export default function HeroGlow() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[70%] overflow-hidden">
      {/* Peach — the system's own accent, and the largest of the three, so
          the wash still resolves as warm rather than pink. */}
      <div
        className="absolute left-1/2 top-[30%] h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-70 blur-[110px]"
        style={{ background: "radial-gradient(closest-side, #fbe1d1, transparent)" }}
      />
      {/* Rose, offset right and slightly higher — gives the bloom a centre
          of gravity instead of a symmetrical halo. */}
      <div
        className="absolute left-[58%] top-[18%] h-[420px] w-[560px] -translate-x-1/2 rounded-full opacity-55 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, #f7cfc4, transparent)" }}
      />
      {/* Lavender, offset left and lowest — the cool counterweight that
          keeps the warm tones from reading as a single orange smear. */}
      <div
        className="absolute left-[36%] top-[42%] h-[380px] w-[520px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, #dcd8f0, transparent)" }}
      />
      {/* Paper fade — pins the wash to nothing at the section edge so it
          never bleeds into the band below. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
