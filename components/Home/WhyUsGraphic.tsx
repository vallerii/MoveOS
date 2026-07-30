type Props = {
  /** Concrete "what we do" lines (full sentences, not single words). */
  advantages: string[];
};

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
export default function WhyUsGraphic({ advantages }: Props) {
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
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
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
            <p className="text-caption text-ink">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
