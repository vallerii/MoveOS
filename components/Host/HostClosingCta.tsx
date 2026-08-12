import Reveal from "../Reveal";
import PillButton from "../PillButton";

type Props = {
  heading: string;
  body: string;
  cta: string;
};

/**
 * "Ваша квартира. Наше управление." — the page's single Accent Peach
 * surface (system rule: at most one per page), spent here rather than
 * earlier, since this is the last thing a scrolling visitor sees before
 * either acting or leaving.
 */
export default function HostClosingCta({ heading, body, cta }: Props) {
  return (
    <section className="bg-paper pb-20 sm:pb-section">
      <div className="container-page">
        <Reveal>
          <div className="card-neutral flex flex-col items-center gap-6 py-14 text-center sm:py-16">
            <h2 className="max-w-2xl font-display text-heading-lg text-ink">{heading}</h2>
            <p className="max-w-xl whitespace-pre-line text-body text-ink/80">{body}</p>
            <PillButton href="#calculate" className="mt-2">
              {cta}
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
