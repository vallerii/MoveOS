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
 * as one line in the page's Accent Peach card — the same "Результат" treatment
 * WhatYouGet spends its one peach card on for the pain pages (tag label +
 * big serif line, sienna ink). System rule is one card-peach per page, so
 * HostClosingCta gives this one up (see the comment there).
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
          <div className="card-peach mx-auto mt-10 max-w-3xl text-center">
            <p className="tag text-sienna/50">{flowIntro}</p>
            <p className="mt-4 font-display text-heading-sm text-sienna">{flow}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
