import Reveal from "./Reveal";
import { ChevronDownIcon } from "./icons";

type Item = { q: string; a: string };
type Props = {
  heading: string;
  subheading?: string;
  items: Item[];
};

/**
 * Objection-handling FAQ — only rendered on /repair, right before the quiz.
 *
 * Same disclosure pattern as Checklist's sections (native <details>, hairline
 * rows, rotating chevron) rather than a new accordion implementation. Centred
 * header matches HowItWorks/DidYouKnow; the list itself sits narrower
 * (max-w-3xl) than the full container since Q&A reads better as a single
 * column than stretched to the page width.
 */
export default function FAQ({ heading, subheading, items }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            {subheading && <p className="mx-auto mt-6 max-w-xl text-body text-slate">{subheading}</p>}
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-3xl border-t border-hairline">
          {items.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 60}>
              <details className="group border-b border-hairline py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-heading-sm text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{q}</span>
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-ash transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-2xl text-caption text-slate">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
