import Reveal from "./Reveal";
import PillButton from "./PillButton";
import PainIllustration from "./PainIllustration";
import HeroGlow from "./Home/HeroGlow";
import RecedingTitle from "./Home/RecedingTitle";
import FadeOnScroll from "./Home/FadeOnScroll";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  pain: PainSlug;
  dict: Dictionary;
};

/**
 * Per-pain hero — one viewport tall, with a centred oversized serif headline
 * and a pill button pair, and two of the page's own drawings either side of
 * it. Both drawings are decorative and hidden from assistive tech; they carry
 * no copy, so nothing is lost by skipping them.
 *
 * Shares the homepage's scroll behaviour: the headline recedes and dissolves
 * (RecedingTitle) while the badge row fades (FadeOnScroll), over the same
 * four-bloom wash (HeroGlow). Those three live under components/Home/ because
 * that's where they were first needed — worth moving up a level if a third
 * page ever wants them.
 */
export default function Hero({ pain, dict }: Props) {
  const copy = dict.pains[pain];

  return (
    // One viewport tall, content centred, so both drawings and the whole
    // headline block land above the fold rather than needing a scroll.
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-paper py-20">
      <HeroGlow />

      {/* Collage around the headline column, on large screens only — below xl
          there's no room to place anything beside the copy without colliding
          with it.

          Two different drawings per page, both SVG: the object that names the
          situation on the left, and a second related object on the right.
          Sized to the gutter the centred headline column leaves — a 1200px
          container minus a 768px text column is ~215px a side, so anything
          wider than that lands on the words.
          Every pain page used to open on the identical four product
          artifacts, which is exactly what made six pages promising a personal
          plan read as one template. Drawn at full ink rather than tinted
          back — at this size a faint line just reads as a smudge. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 u-hidden xl:block">
        <div className="container-page relative h-full">
          <PainIllustration
            pain={pain}
            variant="primary"
            className="absolute left-0 top-[20%] h-40 w-40 animate-drift text-ink"
          />
          <PainIllustration
            pain={pain}
            variant="secondary"
            className="absolute bottom-[20%] right-0 h-40 w-40 text-ink"
          />
        </div>
      </div>

      <div className="container-page relative z-10">
        {/* Same treatment as the homepage: the headline scales back, drifts
            up and dissolves on scroll. */}
        <RecedingTitle>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="tag">{copy.eyebrow}</p>
          </Reveal>

          <Reveal delay={100}>
            {/* The display serif stays at weight 400 at every size — it
                whispers authority rather than shouting in bold. */}
            <h1 className="mt-6 font-display text-display text-ink">{copy.h1}</h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl whitespace-pre-line text-body text-slate">{copy.subheading}</p>
          </Reveal>

          <Reveal delay={300}>
            {/* Filled primary always pairs with a ghost secondary on the
                same baseline — that pairing is structural in this system. */}
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/* Shorter label on mobile, full label from sm up. Both spans
                  are always in the DOM and only one is shown by CSS, so
                  anything that reads the DOM rather than the rendered page —
                  screen readers, and the text extraction that flagged this —
                  saw the label twice in a row. `aria-hidden` on each and one
                  accessible name on the link itself fixes that: assistive
                  tech gets the full label once, sighted users still get the
                  responsive one. */}
              <PillButton href="#quiz" aria-label={copy.heroCta} className="w-full sm:w-auto">
                <span aria-hidden className="sm:!hidden">
                  {copy.heroCtaMobile ?? copy.heroCta}
                </span>
                <span aria-hidden className="hidden sm:!inline">
                  {copy.heroCta}
                </span>
              </PillButton>
              <PillButton href="#didyouknow" variant="ghost" className="w-full sm:w-auto">
                {dict.nav.bookButton}
              </PillButton>
            </div>
          </Reveal>
        </div>
        </RecedingTitle>
      </div>

      {/* Fades out on scroll, like the homepage's — it sits at the foot of a
          full-height hero, which is the first thing the next section meets. */}
      {/* <FadeOnScroll> */}
        <div className="container-page relative z-10 mt-16 sm:mt-20">
          <div className="mx-auto flex max-w-3xl flex-col divide-y divide-hairline border-y border-hairline sm:flex-row sm:divide-x sm:divide-y-0">
            {copy.badges.map((label) => (
              <div key={label} className="flex-1 px-3 py-5 text-center">
                <p className="text-caption text-slate">{label}</p>
              </div>
            ))}
          </div>
        </div>
      {/* </FadeOnScroll> */}
    </section>
  );
}
