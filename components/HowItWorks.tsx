import Reveal from "./Reveal";
import PillButton from "./PillButton";
import type { PainSlug } from "@/lib/i18n/types";

type Step = { title: string; body: string };
type Props = {
  // Optional — unused in the render below (kept only so pain pages can
  // pass it without a cast). The standalone /host page has no PainSlug at
  // all, which is what makes this optional rather than required.
  pain?: PainSlug;
  heading: string;
  subheading: string;
  steps: Step[];
  // Ordinal shown on the first step — defaults to 1. Repair's secondary
  // block passes 0 to lead with a "step zero" consultation.
  startIndex?: number;
  // Optional trailing CTA button, centred under the list — only /host's
  // "Как всё начинается" block uses this; the pain pages' process blocks
  // don't need a second CTA on top of the page's own hero/quiz asks.
  cta?: string;
  ctaHref?: string;
};

/**
 * Numbered process steps on a Fog band.
 *
 * Rebuilt as a hairline-ruled editorial list rather than a card timeline: no
 * accent rail, no filled number bubbles, no icons, no glow blobs behind the
 * section. Each step is a two-column row — an ash step number in the left
 * gutter, title and body in the right — separated by the same hairline used
 * everywhere else. Icons were removed with the accent palette they depended
 * on; the ordinal already carries the sequence.
 */
export default function HowItWorks({ heading, subheading, steps, startIndex = 1, cta, ctaHref = "#calculate" }: Props) {
  return (
    <section className="py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            {subheading && <p className="mx-auto mt-6 max-w-xl text-body text-slate">{subheading}</p>}
          </div>
        </Reveal>

        <ol className="mt-16 border-t border-hairline">
          {steps.map(({ title, body }, i) => (
            <Reveal key={title} delay={i * 80}>
              <li className="grid gap-3 border-b border-hairline py-8 sm:grid-cols-12 sm:gap-8">
                <span className="tag sm:col-span-2">{String(i + startIndex).padStart(2, "0")}</span>
                <p className="text-heading-sm text-ink sm:col-span-4">{title}</p>
                <p className="text-caption text-slate sm:col-span-6">{body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {cta && (
          <Reveal delay={steps.length * 80}>
            <div className="mt-16 flex justify-center">
              <PillButton href={ctaHref}>{cta}</PillButton>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
