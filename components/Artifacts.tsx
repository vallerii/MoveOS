/**
 * Floating product artifacts — the only elevated elements in the system.
 *
 * These are cropped fragments of product UI (a checklist pane, a timeline,
 * a stat with a gestural chart) that float around editorial headlines
 * instead of photography or illustration. Per the design reference, the
 * hero composition is a text-and-UI collage, not a headline over a picture.
 *
 * Widths are fixed rather than `w-full max-w-[…]`. These are rendered into
 * absolutely-positioned wrappers with no width of their own, where a
 * percentage width has nothing to resolve against and collapses the card to
 * its content — which is what squashed the checklist into an unreadable
 * sliver. A fixed width is also what the flight animation measures against.
 *
 * Deliberately near-wordless: every artifact is built from numerals,
 * glyphs, and muted "redacted" line bars rather than sentences. That keeps
 * them locale-neutral (the site ships EN/ES/RU) so they can float on any
 * page without introducing untranslated copy, and it reads as a cropped
 * screenshot rather than a second content block competing with the
 * headline for attention.
 */

type ArtifactProps = { className?: string };

/** Muted placeholder rule standing in for a line of UI text. */
function Bar({ w = "100%", tone = "mist" }: { w?: string; tone?: "mist" | "smoke" }) {
  return (
    <span
      aria-hidden
      className={`block h-2 rounded-full ${tone === "mist" ? "bg-mist" : "bg-smoke/25"}`}
      style={{ width: w }}
    />
  );
}

function CheckGlyph({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
        done ? "bg-ink text-paper" : "border border-hairline text-transparent"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" className="h-3 w-3">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/**
 * Move-out checklist pane — four rows, the first three ticked. Mirrors the
 * real checklist the quiz hands out, cropped to a fragment.
 */
export function ChecklistArtifact({ className = "" }: ArtifactProps) {
  const rows = [
    { done: true, w: "82%" },
    { done: true, w: "64%" },
    { done: true, w: "73%" },
    { done: false, w: "55%" },
  ];

  return (
    <div className={`card-artifact w-[280px] p-4 ${className}`} aria-hidden>
      <div className="flex items-center justify-between">
        <span className="text-meta text-ash">01 / 04</span>
        <span className="text-meta font-medium text-ink">75%</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-mist">
        <span className="block h-full w-3/4 rounded-full bg-ink" />
      </div>
      <div className="mt-4 space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <CheckGlyph done={row.done} />
            <Bar w={row.w} tone={row.done ? "mist" : "smoke"} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Stat fragment with a gestural line chart — no axes, no gridlines. The
 * stroke is Sienna, which is the one place that brown is allowed outside a
 * peach surface (chart strokes, per the reference).
 */
export function StatArtifact({
  value,
  delta,
  className = "",
}: ArtifactProps & { value: string; delta: string }) {
  return (
    <div className={`card-artifact w-[230px] p-4 ${className}`} aria-hidden>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-body-lg font-medium text-ink">{value}</span>
        <span className="text-meta text-slate">{delta}</span>
      </div>
      <svg viewBox="0 0 200 56" fill="none" className="mt-4 h-12 w-full" preserveAspectRatio="none">
        <path
          d="M0,46 C24,42 34,34 56,32 C80,30 92,38 116,28 C142,17 156,12 200,4"
          stroke="var(--color-sienna)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/**
 * Timeline fragment — the move-out sequence rendered as a rail of dots with
 * one active node, cropped out of a longer schedule view.
 */
export function TimelineArtifact({ className = "" }: ArtifactProps) {
  const rows = [
    { active: false, w: "68%" },
    { active: true, w: "84%" },
    { active: false, w: "57%" },
  ];

  return (
    <div className={`card-artifact w-[250px] p-4 ${className}`} aria-hidden>
      <span className="text-meta text-ash">—</span>
      <div className="mt-3 space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="relative flex items-center gap-3">
            {i < rows.length - 1 && <span className="absolute left-[5px] top-3 h-4 w-px bg-hairline" />}
            <span
              className={`relative z-10 h-2.5 w-2.5 shrink-0 rounded-full ${
                row.active ? "bg-sienna ring-4 ring-peach" : "bg-mist"
              }`}
            />
            <Bar w={row.w} tone={row.active ? "mist" : "smoke"} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Document fragment — a contract/inventory pane with a peach-highlighted
 * clause. The peach here is a hairline wash inside an artifact, not a full
 * Accent Peach Card, so it doesn't spend the page's one-accent budget.
 */
export function DocumentArtifact({ className = "" }: ArtifactProps) {
  return (
    <div className={`card-artifact w-[240px] p-4 ${className}`} aria-hidden>
      <div className="space-y-2.5">
        <Bar w="90%" />
        <Bar w="76%" />
      </div>
      <div className="mt-3 rounded-[10px] bg-peach px-3 py-2.5">
        <div className="space-y-2">
          <span className="block h-2 w-[85%] rounded-full bg-sienna/25" />
          <span className="block h-2 w-[60%] rounded-full bg-sienna/25" />
        </div>
      </div>
      <div className="mt-3 space-y-2.5">
        <Bar w="82%" tone="smoke" />
        <Bar w="48%" tone="smoke" />
      </div>
    </div>
  );
}
