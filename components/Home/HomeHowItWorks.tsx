import Reveal from "../Reveal";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

/**
 * Generalized 3-step version of the per-pain HowItWorks — same hairline-
 * ruled editorial list, sticky serif heading on the left.
 *
 * Icons, the accent rail, the numbered bubbles and the glow blob are all
 * gone: the ordinal in the left gutter carries the sequence, and the rules
 * carry the structure.
 */
export default function HomeHowItWorks({ copy }: Props) {
  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-heading-lg text-ink">{copy.howItWorks.heading}</h2>
              <p className="mt-6 max-w-sm text-body text-slate">{copy.howItWorks.subheading}</p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <ol className="border-t border-hairline">
              {copy.howItWorks.steps.map(({ title, body }, i) => (
                <Reveal key={title} delay={i * 80} direction="right">
                  <li className="grid gap-3 border-b border-hairline py-8 sm:grid-cols-12 sm:gap-6">
                    <span className="tag sm:col-span-2">{String(i + 1).padStart(2, "0")}</span>
                    <div className="sm:col-span-10">
                      <p className="text-heading-sm text-ink">{title}</p>
                      <p className="mt-3 text-caption text-slate">{body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
