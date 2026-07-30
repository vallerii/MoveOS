import Reveal from "./Reveal";
import PillButton from "./PillButton";
import { ChecklistArtifact, DocumentArtifact, StatArtifact, TimelineArtifact } from "./Artifacts";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  pain: PainSlug;
  dict: Dictionary;
};

/**
 * Per-pain hero — a centred oversized serif headline with a subhead and a
 * pill button pair, surrounded by four floating product artifacts that
 * overlap the canvas at varied offsets. That collage IS the hero image; the
 * isometric city/route illustrations that used to sit behind this section
 * are gone, since this system uses product-UI imagery only.
 *
 * The artifacts are decorative and hidden from assistive tech — they carry
 * no copy, so nothing is lost by skipping them.
 *
 * The badge row below the fold moved from icon-in-a-tinted-circle to a
 * hairline-ruled row of plain type: badges are metadata, and metadata in
 * this system doesn't get colour or containers.
 */
export default function Hero({ pain, dict }: Props) {
  const copy = dict.pains[pain];

  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-16 sm:pb-32 sm:pt-24">
      {/* Artifact collage — absolutely placed around the headline column on
          large screens only. Below xl there isn't room to overlap anything
          without colliding with the copy, so they simply don't render. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="container-page relative h-full">
          <div className="absolute left-0 top-4 animate-drift">
            <ChecklistArtifact />
          </div>
          <div className="absolute right-0 top-16">
            <StatArtifact value="1 840 €" delta="↑ 3.2×" />
          </div>
          <div className="absolute bottom-6 left-6">
            <TimelineArtifact />
          </div>
          <div className="absolute bottom-0 right-10 animate-drift">
            <DocumentArtifact />
          </div>
        </div>
      </div>

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
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
              <PillButton href="#quiz" className="w-full sm:w-auto">
                {/* Shorter label on mobile, full label from sm and up. */}
                <span className="sm:!hidden">{copy.heroCtaMobile ?? copy.heroCta}</span>
                <span className="hidden sm:!inline">{copy.heroCta}</span>
              </PillButton>
              <PillButton href="#didyouknow" variant="ghost" className="w-full sm:w-auto">
                {dict.nav.bookButton}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={400}>
        <div className="container-page relative mt-20 sm:mt-28">
          <div className="mx-auto flex max-w-3xl flex-col divide-y divide-hairline border-y border-hairline sm:flex-row sm:divide-x sm:divide-y-0">
            {copy.badges.map((label) => (
              <div key={label} className="flex-1 px-3 py-5 text-center">
                <p className="text-caption text-slate">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
