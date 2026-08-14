import Reveal from "../Reveal";

type Props = {
  heading: string;
  paragraphs: string[];
  calloutTag: string;
  calloutText: string;
};

/**
 * The okupas trust/stats block — the page's single card-peach spend (system
 * rule: at most one per page; see the note on HostControlFlow, which spends
 * /host's own peach card the same way). A centred heading, a short stack of
 * plain-prose stat paragraphs on Fog, then one peach card carrying the
 * reassurance line.
 *
 * Kept as prose rather than a stat-tile grid (no big numerals, no icons) —
 * consistent with how DidYouKnow and HostEarnings present facts elsewhere:
 * the system rations numeric/iconographic emphasis and lets the serif
 * callout carry the one moment of weight.
 */
export default function HostFirstTimeTrust({ heading, paragraphs, calloutTag, calloutText }: Props) {
  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-center font-display text-heading-lg text-ink">{heading}</h2>
        </Reveal>

        <div className="mx-auto mt-10 max-w-2xl space-y-5">
          {paragraphs.map((p, i) => (
            <Reveal key={p} delay={i * 80}>
              <p className="text-body text-slate">{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={paragraphs.length * 80}>
          <div className="card-peach mx-auto mt-10 max-w-3xl text-center">
            <p className="tag text-sienna/50">{calloutTag}</p>
            <p className="mt-4 font-display text-heading-sm text-sienna">{calloutText}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
