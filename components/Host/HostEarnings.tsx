import Reveal from "../Reveal";
import PillButton from "../PillButton";
import { CheckCircleIcon } from "../icons";

type Props = {
  heading: string;
  body: string;
  listHeading: string;
  items: string[];
  cta: string;
  ctaMobile?: string;
  disclaimer: string;
};

/**
 * "Ваша квартира может зарабатывать больше" — sticky heading/body on the
 * left (same two-column shape as DidYouKnow), a single Mist card on the
 * right listing what the estimate covers. Everything here points at the
 * lead form (#calculate) rather than resolving on this page.
 */
export default function HostEarnings({ heading, body, listHeading, items, cta, ctaMobile, disclaimer }: Props) {
  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="">
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mt-6  whitespace-pre-line text-body text-slate">{body}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="right">
            <div className="card-neutral">
              <p className="tag">{listHeading}</p>
              <ul className="mt-5 space-y-4">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                    <span className="text-body text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <PillButton href="#calculate" aria-label={cta} className="mt-8 w-full sm:w-auto">
                <span aria-hidden className="sm:!hidden">
                  {ctaMobile ?? cta}
                </span>
                <span aria-hidden className="hidden sm:!inline">
                  {cta}
                </span>
              </PillButton>
              <p className="mt-6 text-meta text-ash">{disclaimer}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
