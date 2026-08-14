import Reveal from "../Reveal";
import PillButton from "../PillButton";
import HeroGlow from "../Home/HeroGlow";
import { CheckCircleIcon } from "../icons";
import { BOOKING_URL } from "@/lib/config";

type Props = {
  eyebrow: string;
  h1: string;
  subheading: string;
  cta: string;
  ctaMobile?: string;
  freebieHeading: string;
  freebieItems: string[];
  freebieNote: string;
};

/**
 * /host/first-time's own hero — deliberately not HostHero's shape. HostHero
 * is a single centred column with a badge grid revealed underneath; this
 * hero is an asymmetric two-column split (8/4) with the "what's free"
 * card sitting beside the headline from the first viewport, not below it.
 * The split favours the text column, and h1 stays short — this hero has no
 * min-h-svh floor the way HostHero/Hero.tsx do, so a display-size h1 forced
 * to wrap 4-5 lines here just pushes the section past the fold instead of
 * filling one on purpose.
 *
 * The two hero pages share the same primitives (HeroGlow, Reveal, PillButton,
 * the tag/display type scale) so they read as the same design system, but
 * the composition itself doesn't repeat — same reasoning as HostServices vs
 * DidYouKnow both existing as distinct sticky/plain layouts on plain cards.
 */
export default function HostFirstTimeHero({
  eyebrow,
  h1,
  subheading,
  cta,
  ctaMobile,
  freebieHeading,
  freebieItems,
  freebieNote,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-paper py-16 sm:py-20">
      <HeroGlow />

      <div className="container-page relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="tag">{eyebrow}</p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 whitespace-pre-line font-display text-display text-ink">{h1}</h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 max-w-xl text-body text-slate">{subheading}</p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10">
                <PillButton
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={cta}
                  className="w-full sm:w-auto"
                >
                  <span aria-hidden className="sm:!hidden">
                    {ctaMobile ?? cta}
                  </span>
                  <span aria-hidden className="hidden sm:!inline">
                    {cta}
                  </span>
                </PillButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={250} direction="right" className="lg:col-span-4">
            <div className="card-neutral">
              <p className="tag">{freebieHeading}</p>
              <ul className="mt-5 space-y-4">
                {freebieItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                    <span className="text-body text-ink">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-meta text-ash">{freebieNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
