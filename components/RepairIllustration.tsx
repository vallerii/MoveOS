type Props = { index: number; className?: string };

/**
 * Line-art versions of the four repair photos, one per card.
 *
 * These aren't generic icons — each redraws the scene that was actually
 * photographed: bulb and light switch, tiled wall with a scrubbing brush,
 * half-painted wall with roller and tray, herringbone parquet with a repair
 * pen. Keeping the subjects identical is the point; only the medium changes,
 * from a rendered photograph to an outline that belongs with the rest of the
 * site's drawings.
 *
 * All four share the isometric plinth the photos were staged on, which is
 * what made them read as a set. Projection is the usual 2:1 isometric, so
 * every "horizontal" runs at ±30°.
 *
 * Decorative — the card's own title and body say what each one is.
 */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** The staging block every scene sits on. Top face is a diamond; the two
 *  visible side faces give it depth. */
function Plinth() {
  return (
    <>
      <path d="M120 96 206 144 120 192 34 144Z" />
      <path d="M34 144v18l86 48 86-48v-18" />
      <path d="M120 192v18" />
    </>
  );
}

/** Bulbs and fittings — a bulb in its socket beside a light switch. */
function BulbScene() {
  return (
    <g {...STROKE}>
      <Plinth />
      <circle cx="88" cy="52" r="27" />
      <path d="M76 74c0 7 24 7 24 0" />
      <path d="M76 76h24v20c0 6-24 6-24 0z" />
      <path d="M76 84c0 5 24 5 24 0M76 91c0 5 24 5 24 0" />
      <path d="M88 96v24" />
      <path d="M88 120 118 137 88 154 58 137Z" />
      <path d="M158 126 186 142 158 158 130 142Z" />
      <path d="M130 142v8l28 16 28-16v-8" />
      <path d="M158 134 172 142 158 150 144 142Z" />
    </g>
  );
}

/** Bathroom — a tiled splashback and floor, with a scrubbing brush. */
function TileScene() {
  return (
    <g {...STROKE}>
      <Plinth />
      <path d="M34 144 120 96 120 40 34 88Z" />
      <path d="M48 137V80M76 121V64M104 105V48" />
      <path d="M34 126l86-48M34 108l86-48" />
      <path d="M120 96 178 128 120 160 62 128" />
      <path d="M91 112l58 32M149 112l-58 32" />
      <ellipse cx="168" cy="106" rx="22" ry="13" />
      <path d="M146 106v10c0 7 44 7 44 0v-10" />
      <path d="M150 122v10M160 126v10M170 126v10M180 122v10" />
    </g>
  );
}

/** Walls — a half-painted panel with a roller and a paint tray. */
function PaintScene() {
  return (
    <g {...STROKE}>
      <Plinth />
      {/* Wall panel, with the painted half marked off. */}
      <path d="M34 144 120 96 120 34 34 82Z" />
      <path d="M77 119V57" strokeDasharray="5 5" />
      {/* Roller pressed against it: barrel lying along the wall's own
          horizontal, then the arm cranking out and down to the grip. */}
      <path d="M58 108 102 84 109 96 65 120Z" />
      <path d="M105 90 130 104v20" />
      <path d="M124 124h12v20a6 3 0 0 1-12 0z" />
      {/* Tray sits on the top face, well inside the plinth's own diamond —
          it used to hang off the front corner. */}
      <path d="M158 134 188 152 158 170 128 152Z" />
      <path d="M158 142 178 152 158 162 138 152Z" />
      <path d="M128 152v8l30 18 30-18v-8" />
    </g>
  );
}

/** Floors — herringbone parquet with a chip, and the pen that fills it. */
function FloorScene() {
  return (
    <g {...STROKE}>
      <Plinth />
      <path d="M120 96 206 144 120 192 34 144Z" />
      {/* Herringbone: two families of short runs at opposite angles. */}
      <path d="M77 120l43 24M120 96l-43 48M106 112l43 24M149 112l-43 48" />
      <path d="M134 136l43 24M177 136l-43 48M63 128l43 24M91 152l43-24" />
      {/* The chip the repair pen is there to fill. */}
      <path d="M92 128l14 8-6 12-14-8z" />
      <path d="M162 92c0-5 12-5 12 0v22c0 5-12 5-12 0z" />
      <path d="M162 98c0 4 12 4 12 0" />
      <path d="M164 78h8v14h-8z" />
      <path d="M186 118 204 128 186 138 168 128Z" />
      <path d="M168 128v7l18 10 18-10v-7" />
    </g>
  );
}

const SCENES = [BulbScene, TileScene, PaintScene, FloorScene];

export default function RepairIllustration({ index, className = "" }: Props) {
  const Scene = SCENES[index % SCENES.length];

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden focusable="false">
      <Scene />
    </svg>
  );
}
