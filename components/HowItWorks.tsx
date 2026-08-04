import Reveal from "./Reveal";
import type { PainSlug } from "@/lib/i18n/types";

type Step = { title: string; body: string };
type Props = {
  pain: PainSlug;
  heading: string;
  subheading: string;
  steps: Step[];
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
export default function HowItWorks({ heading, subheading, steps }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
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
                <span className="tag sm:col-span-2">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-heading-sm text-ink sm:col-span-4">{title}</p>
                <p className="text-caption text-slate sm:col-span-6">{body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
