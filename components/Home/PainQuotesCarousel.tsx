"use client";

import { useEffect, useState } from "react";

type Quote = { quote: string; resolved: string; name: string };

type Props = {
  quotes: Quote[];
};

/**
 * Auto-advancing "pain -> what we solved" carousel for the bento Situations
 * section. These are illustrative example quotes built from the product's
 * pain hypotheses, not verified customer testimonials — swap in real ones
 * once available.
 *
 * The oversized decorative quotation mark and the accent check icon are
 * gone; the quote itself is now set in the display serif, which is how this
 * system signals an editorial pull-quote. Dots keep the pill geometry.
 */
export default function PainQuotesCarousel({ quotes }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(id);
  }, [quotes.length]);

  const current = quotes[index];

  return (
    <div className="card-neutral relative flex h-full flex-col justify-between overflow-hidden">
      {/* Soft light inside the card, clipped to its own rounded corners.
          This panel is sized by the situation list beside it, so with a short
          quote it leaves a large dead area in the middle — the glow gives
          that space something to do without adding another element to read.
          Two heavily blurred blooms, warm then cool, at very low opacity, so
          the Mist surface still reads as Mist and the type keeps its
          contrast. Sits at z-0 under everything. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-[-20%] bottom-[-30%] h-[420px] w-[520px]  rounded-full opacity-70 blur-[70px]"
          style={{ background: "radial-gradient(closest-side, #98c0eecc, transparent)" }}
        />
        <div
          className="absolute left-[28%] bottom-[-40%] h-[320px] w-[400px] rounded-full opacity-50 blur-[70px]"
          style={{ background: "radial-gradient(closest-side, #ac9fee, transparent)" }}
        />
      </div>

      <div className="relative z-10">
        <p className="tag">{String(index + 1).padStart(2, "0")}</p>
        <p className="mt-6 font-display text-heading-sm text-ink">{current.quote}</p>
        <p className="mt-5 text-caption text-slate">{current.resolved}</p>
      </div>

      <div className="relative z-10 mt-10">
        <p className="text-meta text-ash">{current.name}</p>
        <div className="mt-5 flex gap-1.5">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-ink" : "w-1.5 bg-ink/15 hover:bg-ink/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
