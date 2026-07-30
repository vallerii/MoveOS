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
    <div className="card-neutral flex h-full flex-col justify-between">
      <div>
        <p className="tag">{String(index + 1).padStart(2, "0")}</p>
        <p className="mt-6 font-display text-heading-sm text-ink">{current.quote}</p>
        <p className="mt-5 text-caption text-slate">{current.resolved}</p>
      </div>

      <div className="mt-10">
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
