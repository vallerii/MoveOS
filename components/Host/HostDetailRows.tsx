import Reveal from "../Reveal";

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
 * Deliberately not the FAQ accordion — these are core trust-building
 * content for a landlord deciding whether to hand over keys, not a
 * secondary objection dump, so they stay open rather than collapsed.
 */
export default function HostDetailRows({ items }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <div className="mx-auto max-w-3xl border-t border-hairline">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="border-b border-hairline py-12">
                <h3 className="font-display text-heading-sm text-ink">{item.title}</h3>
                <p className="mt-4 whitespace-pre-line text-body text-slate">{item.body}</p>

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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
