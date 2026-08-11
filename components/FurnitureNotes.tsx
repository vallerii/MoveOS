import Reveal from "./Reveal";
import { CheckCircleIcon, XCircleIcon } from "./icons";

type Item = { title: string; verdict: string; isDamage: boolean };
type Props = {
  heading: string;
  intro: string;
  items: Item[];
};

/**
 * Furnished-rental wear-vs-damage examples — only rendered on /repair.
 *
 * Deliberately breaks from the system's no-semantic-colour rule: this block
 * exists specifically so a visitor can tell the two categories apart at a
 * glance, so each card gets a transparent red/green wash plus a cross/check
 * icon rather than a neutral tag — legibility of the verdict wins over
 * palette restraint here.
 */
export default function FurnitureNotes({ heading, intro, items }: Props) {
  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page flex flex-col lg:flex-row gap-16">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            <p className="mt-6 max-w-xl text-body text-slate">{intro}</p>
          </div>
        </Reveal>

        <div className=" grid gap-4 sm:grid-cols-2 ">
          {items.map(({ title, verdict, isDamage }, i) => {
            const Icon = isDamage ? XCircleIcon : CheckCircleIcon;
            return (
              <Reveal key={title} delay={i * 60}>
                <div
                  className={`flex h-full flex-col rounded-card p-4 sm:p-8 ${
                    isDamage ? "bg-red-500/10" : "bg-green-500/10"
                  }`}
                >
                  <div className={`flex items-center gap-2 ${isDamage ? "text-red-600" : "text-green-600"}`}>
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="text-meta font-normal">{verdict}</span>
                  </div>
                  <p className="mt-4 text-heading-sm text-ink">{title}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
