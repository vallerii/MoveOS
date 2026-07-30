"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon } from "../icons";

type Quote = { quote: string; resolved: string; name: string };

type Props = {
  quotes: Quote[];
};

/**
 * Auto-advancing "pain -> what we solved" carousel for the bento Situations
 * section. These are illustrative example quotes built from the product's
 * pain hypotheses, not verified customer testimonials — swap in real ones
 * once available.
 */
export default function PainQuotesCarousel({ quotes }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(id);
  }, [quotes.length]);

  const current = quotes[index];

  return (
    <div className="card relative overflow-hidden flex h-full flex-col justify-between">
      <div className="">
        <span className="absolute top-[-1.5rem] left-[-0.5rem] font-serif text-[200px] leading-none text-brand-primary/30">&ldquo;</span>
        <p className="mt-8 text-card-title text-brand-ink">{current.quote}</p>
        <p className="mt-4 flex items-start gap-2 text-small font-medium text-brand-primary">
          <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {current.resolved}
        </p>
      </div>

      <div>
        <p className="mt-6 text-base font-semibold text-brand-ink/60">{current.name}</p>
        <div className="mt-4 flex gap-1.5">
          {quotes.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-primary" : "w-1.5 bg-brand-ink/15 hover:bg-brand-ink/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
