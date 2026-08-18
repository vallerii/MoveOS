import Reveal from "../Reveal";

type Props = {
  heading: string;
  body: string;
  flowIntro: string;
  flow: string[];
};

/**
 * "Вы знаете, что происходит с квартирой" — the control/trust statement.
 * Centred like HowItWorks' heading block, closing on the draft's own
 * arrow-chain sentence ("кто → когда → в каком состоянии → сколько") shown
 * as a column — one step per line — in the page's Accent Peach card, rather
 * than as a single sentence: at the card's width the four-clause sentence
 * used to wrap mid-phrase, breaking the arrows across lines unpredictably.
 * Stacking the steps and connecting them with a short vertical arrow keeps
 * the same "Результат" treatment WhatYouGet spends its one peach card on
 * for the pain pages (tag label + big serif lines, sienna ink) legible at
 * any width. System rule is one card-peach per page, so HostClosingCta
 * gives this one up (see the comment there).
 */
export default function HostControlFlow({ heading, body, flowIntro, flow }: Props) {
  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page grid lg:grid-cols-[auto_1fr] gap-16">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h2 className="font-display text-heading-lg text-ink ">{heading}</h2>
            <p className="mx-auto mt-6 whitespace-pre-line text-body text-slate">{body}</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card-peach mx-auto mt-10 max-w-3xl text-center">
            <p className="tag text-sienna/50">{flowIntro}</p>
            <div className="mt-4 flex flex-col items-center">
              {flow.map((step, i) => (
                <div key={step} className="flex flex-col items-center">
                  {i > 0 && <span className="my-1 text-heading-sm text-sienna/40">↓</span>}
                  <p className="font-display text-heading-sm text-sienna">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
