import Image from "next/image";
import Reveal from "./Reveal";
import PillButton from "./PillButton";

type Step = { title: string; body: string; highlight?: string };
type Props = {
  heading: string;
  // Short line under the heading explaining the angle (repairs that
  // actually matter for the deposit, not a full renovation).
  intro?: string;
  steps: Step[];
  // Prompt + button shown under the cards, nudging toward the quiz —
  // otherwise the section is just a scroll of cards with no next step.
  ctaText: string;
  ctaLabel: string;
};

// One photo per step, matched by position — a design choice, not
// translated content, same convention as the pain-indexed maps elsewhere.
const images = [
  "/repair/light-bulb.png", // bulbs and fittings
  "/repair/bathroom-tile.png", // bathroom grout and limescale
  "/repair/paint-wall.png", // wall scuffs and fixture marks
  "/repair/wood-floor.png", // floor scratches
];

/**
 * Only used on /repair. These are the one place in the site where real
 * photography is warranted — they're the subject matter, not decoration —
 * so they stay, sat on Mist tiles at the 12px image radius the system
 * reserves for pictures (cards keep 24px; images step down).
 */
export default function RepairShowcase({ heading, intro, steps, ctaText, ctaLabel }: Props) {
  const cards = steps.map((step, i) => ({ ...step, image: images[i % images.length] }));

  return (
    <section className="bg-paper py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            {intro && <p className="mt-6 max-w-xl text-body text-slate">{intro}</p>}
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div className="card-neutral flex h-full flex-col !p-5">
                <div className="relative aspect-square w-full overflow-hidden rounded-image bg-paper">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-contain p-4"
                  />
                </div>
                <p className="mt-6 text-heading-sm text-ink">{card.title}</p>
                <p className="mt-3 text-caption text-slate">{card.body}</p>
                {card.highlight && (
                  <p className="mt-auto border-t border-ink/[0.07] pt-5 text-meta text-slate">{card.highlight}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={250}>
          <div className="mt-16 flex flex-col items-start gap-6 border-t border-hairline pt-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-display text-heading text-ink">{ctaText}</p>
            <PillButton href="#quiz" className="shrink-0">
              {ctaLabel}
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
