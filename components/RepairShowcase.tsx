import Image from "next/image";
import Reveal from "./Reveal";
import GlareButton from "./GlareButton";
import { CheckCircleIcon } from "./icons";

type Step = { title: string; body: string; highlight?: string };
type Props = {
  heading: string;
  // Short line under the heading explaining the angle (repairs that
  // actually matter for the deposit, not a full renovation).
  intro?: string;
  steps: Step[];
  // Prompt + button shown under the carousel, nudging toward the quiz —
  // otherwise the section is just a scroll of cards with no next step.
  ctaText: string;
  ctaLabel: string;
};

// One photo per step, matched by position — a design choice, not
// translated content, same convention as the icon maps in Hero/DidYouKnow.
const images = [
  "/repair/light-bulb.png", // bulbs and fittings
  "/repair/bathroom-tile.png", // bathroom grout and limescale
  "/repair/paint-wall.png", // wall scuffs and fixture marks
  "/repair/wood-floor.png", // floor scratches
];

// Static row of light cards — only used on /repair. Image sits contained
// (not cropped/bled) on a soft tile, with title/body/highlight below —
// wraps to fewer columns on narrower screens.
export default function RepairShowcase({ heading, intro, steps, ctaText, ctaLabel }: Props) {
  const cards = steps.map((step, i) => ({ ...step, image: images[i % images.length] }));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#EFEFEE] py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-extrabold tracking-tight text-brand-ink text-section">{heading}</h2>
            {intro && <p className="mt-4 text-subheading text-brand-ink/70">{intro}</p>}
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <div className="card flex h-full flex-col">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-black/[0.03]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-contain "
                  />
                </div>
                <div className="min-h-[5rem] mt-4">
                  <p className=" text-card-title text-brand-ink">{card.title}</p>
                </div>
                <div className="min-h-[4.5rem] mt-1.5">
                  <p className=" text-small text-brand-ink/70">{card.body}</p>
                </div>
                {card.highlight && (
                  <div className="flex mt-auto items-start gap-2 border-t border-black/5 pt-4 text-small text-brand-ink/60">
                    <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                    <span>{card.highlight}</span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container-page">
        <Reveal delay={250}>
          <div className="mx-auto mt-14 flex max-w-xl flex-col items-center text-center">
            <p className="text-subheading text-brand-ink">{ctaText}</p>
            <GlareButton href="#quiz" className="mt-6 w-full sm:w-auto">
              {ctaLabel}
            </GlareButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
