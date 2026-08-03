type Props = {
  /** Concrete "what we do" lines (full sentences, not single words).
   * Rendered only when `card` is absent. */
  advantages: string[];
  /**
   * Richer "what you'll have in hand after moving out" version of the
   * card — heading + short description followed by the full document
   * checklist. Takes over from `advantages` when present (RU-only for
   * now).
   */
  card?: {
    heading: string;
    description: string;
    items: string[];
    note?: string;
  };
};

/** Small ink tick, shared by both card variants below. */
function Tick({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-ink text-paper ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
        aria-hidden
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  );
}

/**
 * "What we do" panel for the homepage WhyUs section — a checklist of
 * concrete actions rendered as a floating product artifact, which is what
 * this really is: a cropped fragment of the product's own task list.
 *
 * The previous version was a near-black card with animated dashed rails,
 * orbiting icon nodes and two accent colours behind the text. All of it is
 * out — dark surfaces, abstract graphics and chromatic accents are the
 * three things this system rules out most firmly. What's left is white,
 * a hairline-divided list, and a small ink tick per row.
 */
export default function WhyUsGraphic({ advantages, card }: Props) {
  if (card) {
    return (
      <div className="card-artifact p-6 sm:p-8">
        <p className="text-heading-sm text-ink">{card.heading}</p>
        <p className="mt-3 text-caption text-slate">{card.description}</p>

        <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-hairline pt-6 sm:grid-cols-2">
          {card.items.map((text) => (
            <li key={text} className="flex items-center gap-3">
              <Tick className="h-4 w-4" />
              <span className="text-meta text-ink">{text}</span>
            </li>
          ))}
        </ul>

        {card.note && <p className="mt-6 text-meta text-ash">{card.note}</p>}
      </div>
    );
  }

  return (
    <div className="card-artifact p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-hairline pb-5">
        <span className="font-display text-xl text-ink">MoveOS</span>
        <span className="text-meta text-ash">{String(advantages.length).padStart(2, "0")}</span>
      </div>

      <ul className="mt-2">
        {advantages.map((text, i) => (
          <li
            key={text}
            className={`flex items-start gap-4 py-5 ${i > 0 ? "border-t border-hairline" : ""}`}
          >
            <Tick className="mt-0.5 h-5 w-5" />
            <p className="text-caption text-ink">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
