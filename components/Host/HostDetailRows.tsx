import Reveal from "../Reveal";
import { ChevronDownIcon } from "../icons";

type Item = {
  title: string;
  body: string;
  numberedList?: string[];
  bulletList?: string[];
  quotes?: string[];
  footer?: string;
};
type Props = {
  items: Item[];
};

/**
 * The three objection-handling rows ("что, если гости сломают", "что, если
 * простаивать", "что, если гость не сможет заселиться") plus the
 * time-commitment row — one generic hairline-divided editorial list rather
 * than four separate one-off sections, since they share the same shape:
 * a question-style title, a short lead-in, then either a numbered list, a
 * bullet list, or quoted examples, closed by a one-line reassurance.
 *
 * Same accordion mechanics as FAQ.tsx (native <details>/<summary>, no JS
 * state, rotating chevron) — this used to stay permanently open on the
 * reasoning that it's core trust-building content, not a secondary
 * objection dump, but four fully-expanded rows of numbered/bulleted lists
 * made the section noticeably longer to scroll than everything else on the
 * page. Collapsed rows read faster (four questions, pick what you actually
 * worry about) without losing any content — it's still one tap away.
 * The title keeps `font-display` (FAQ's own summary doesn't) to match the
 * serif weight every other heading on this page uses; only the interaction
 * pattern is borrowed from FAQ, not its type scale.
 *
 * The first row defaults open (the `open` attribute on the first <details>)
 * so the section doesn't render as four flat questions with zero visible
 * answer on load — remove it if a fully collapsed start is preferred.
 */
export default function HostDetailRows({ items }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page relative z-10">
        <div className="mx-auto max-w-3xl border-t border-hairline">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <details className="group border-b border-hairline py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-heading-sm text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{item.title}</span>
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-ash transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="mt-4">
                  <p className="whitespace-pre-line text-body text-slate">{item.body}</p>

                  {item.numberedList && (
                    <ol className="mt-5 space-y-2.5">
                      {item.numberedList.map((li, n) => (
                        <li key={li} className="flex gap-3 text-body text-ink">
                          <span className="tag shrink-0">{String(n + 1).padStart(2, "0")}</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {item.bulletList && (
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {item.bulletList.map((li) => (
                        <li key={li} className="flex gap-3 text-body text-ink">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ash" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.quotes && (
                    <div className="mt-5 space-y-2 border-l-2 border-ink/15 pl-4">
                      {item.quotes.map((q) => (
                        <p key={q} className="text-body italic text-slate">
                          {q}
                        </p>
                      ))}
                    </div>
                  )}

                  {item.footer && <p className="mt-6 text-caption text-ash">{item.footer}</p>}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
