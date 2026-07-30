import Reveal from "../Reveal";
import PillButton from "../PillButton";
import { ChecklistArtifact, DocumentArtifact, StatArtifact, TimelineArtifact } from "../Artifacts";
import type { HomeCopy } from "@/lib/i18n/home";

type Props = {
  copy: HomeCopy;
};

/**
 * Homepage hero — the reference hero pattern: a centred oversized serif
 * headline with a subhead and a pill button pair, ringed by four floating
 * product artifacts overlapping the white canvas at varied offsets.
 *
 * The homepage copy ships `h1` as an array of lines, each an array of
 * segments flagged `accent`. Under the old palette those segments rendered
 * in teal. This system doesn't tint headline type — instead the accented
 * phrase is *italicised*, which is exactly the reference hero device: one
 * italic phrase mid-sentence in an otherwise upright serif display line.
 *
 * The apartment illustration that used to sit at the right edge is gone, as
 * is the tinted badge strip — imagery is product-UI fragments only, and the
 * badges are metadata now rather than icon chips.
 */
export default function HomeHero({ copy }: Props) {
  return (
    <section className="relative overflow-hidden bg-paper pb-24 pt-16 sm:pb-32 sm:pt-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden xl:block">
        <div className="container-page relative h-full">
          <div className="absolute left-0 top-2 animate-drift">
            <ChecklistArtifact />
          </div>
          <div className="absolute right-2 top-14">
            <DocumentArtifact />
          </div>
          <div className="absolute bottom-10 left-8">
            <StatArtifact value="46.2%" delta="↑ 5.5×" />
          </div>
          <div className="absolute bottom-4 right-0 animate-drift">
            <TimelineArtifact />
          </div>
        </div>
      </div>

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="tag">{copy.hero.eyebrow}</p>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-display text-display text-ink">
              {copy.hero.h1.map((line, i) => (
                <span key={i} className="block">
                  {line.map((segment, j) =>
                    segment.accent ? (
                      <em key={j} className="italic">
                        {segment.text}
                      </em>
                    ) : (
                      <span key={j}>{segment.text}</span>
                    )
                  )}
                </span>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl whitespace-pre-line text-body text-slate">{copy.hero.subheading}</p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PillButton href="#situations" className="w-full sm:w-auto">
                {copy.hero.cta}
              </PillButton>
              <PillButton href="#quiz" variant="ghost" className="w-full sm:w-auto">
                {copy.situations.whatWeDo.cta}
              </PillButton>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={400}>
        <div className="container-page relative mt-20 sm:mt-28">
          <div className="mx-auto grid max-w-4xl grid-cols-2 divide-x divide-y divide-hairline border-y border-l border-hairline sm:grid-cols-4 sm:divide-y-0 sm:border-l-0">
            {copy.hero.badges.map((label) => (
              <div key={label} className="px-4 py-5 text-center">
                <p className="text-caption text-slate">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
