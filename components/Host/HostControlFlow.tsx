import Reveal from "../Reveal";

type Props = {
  heading: string;
  body: string;
  flowIntro: string;
  flow: string;
};

/**
 * "Вы знаете, что происходит с квартирой" — the control/trust statement.
 * Centred like HowItWorks' heading block, closing on the draft's own
 * arrow-chain sentence ("кто → когда → в каком состоянии → сколько") shown
 * as one line inside a Mist card rather than broken into a segmented UI —
 * the arrows the copy already uses do that work on their own.
 */
export default function HostControlFlow({ heading, body, flowIntro, flow }: Props) {
  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            <p className="mx-auto mt-6 whitespace-pre-line text-body text-slate">{body}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-neutral mx-auto mt-10 max-w-3xl text-center">
            <p className="tag">{flowIntro}</p>
            <p className="mt-4 text-heading-sm text-ink">{flow}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
