import Reveal from "./Reveal";
import { ChevronDownIcon } from "./icons";

type Item = { q: string; a: string };
type Props = {
  heading: string;
  subheading?: string;
  items: Item[];
  /** Defaults to the original /repair treatment (centred). /host/first-time
   * passes "left" for this one section on request — every other heading on
   * that page (HostFirstTimeServices, HostFirstTimeTrust) stays centred. */
  align?: "center" | "left";
};

/**
 * Objection-handling FAQ — used on /repair and /host/first-time, right
 * before each page's closing ask.
 *
 * Same disclosure pattern as Checklist's sections (native <details>, hairline
 * rows, rotating chevron) rather than a new accordion implementation. Header
 * alignment is the one thing that varies by caller (see `align` above); the
 * list itself always sits narrower (max-w-3xl) than the full container since
 * Q&A reads better as a single column than stretched to the page width.
 */
export default function FAQ({ heading, subheading, items, align = "center" }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-2xl text-center"}>
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            {subheading && (
              <p className={`mt-6 max-w-xl text-body text-slate ${align === "left" ? "" : "mx-auto"}`}>
                {subheading}
              </p>
            )}
          </div>
        </Reveal>

        <div className="mx-auto mt-16 w-full border-t border-hairline">
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
