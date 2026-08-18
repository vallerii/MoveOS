import type { Dictionary, Locale } from "@/lib/i18n/types";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/config";
import Reveal from "../Reveal";
import PillButton from "../PillButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Closing contact block — every page (all six pain pages plus the
 * homepage) used to end on an interactive multi-step quiz (city →
 * timeframe → topic → contact) that branched into a "qualified"/
 * "not qualified" result. That quiz, and the branching, are gone: every
 * visitor now sees the same static booking card directly, full width,
 * with no lead-in question ("Готовы съехать спокойно и уверенно?") above
 * it — the quiz intro heading this section used to render is no longer
 * shown anywhere (dict.quizIntro itself is left in the dictionaries,
 * unused, rather than ripped out of three locale files for one dead
 * string).
 *
 * The copy reused here is exactly the old "qualified" result screen's
 * (dict.results.qualified) — that was always the actual destination for
 * every real Barcelona visitor the quiz was gating for, so nothing here
 * is invented copy. `cityNote` is new: the quiz used to be what told a
 * non-Barcelona visitor this service doesn't cover them yet
 * (dict.quiz.otherCity); without that screening step, the card says so
 * directly instead.
 *
 * Every button that used to scroll here (href="#quiz") now opens
 * BOOKING_URL directly instead — see Header, Hero, HomeHero, HomeIncluded,
 * HomeSituations, HomeTrust, RepairShowcase. The `id="quiz"` anchor stays
 * on the section for any old deep link, but nothing in the app points at
 * it anymore.
 */
export default function QuizSection({ dict }: Props) {
  const { qualified } = dict.results;

  return (
    <section id="quiz" className="scroll-mt-24 bg-paper py-20 sm:py-section relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Peach — the system's own accent, and the largest of the three, so
            the wash resolves as warm rather than pink. */}
        <div
          className="absolute left-1/2 top-[34%] h-[600px] w-[1150px] -translate-x-1/2 rounded-full opacity-100 blur-[80px]"
          style={{ background: "radial-gradient(closest-side, #f7ceb0, transparent)" }}
        />
        {/* Rose, offset right and slightly higher — gives the bloom a centre of
            gravity instead of a symmetrical halo. */}
        <div
          className="absolute right-[10%] top-[20%] h-[500px] w-[700px] rounded-full opacity-95 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, #f4b3a6, transparent)" }}
        />
        {/* Lavender, offset left and lower — the cool counterweight that keeps
            the warm tones from reading as a single orange smear. */}
        <div
          className="absolute left-[35%] top-[30%] h-[460px] w-[660px] -translate-x-1/2 rounded-full opacity-85 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, #98c0eecc, transparent)" }}
        />
        <div
          className="absolute left-[30%] bottom-[-10%] h-[460px] w-[660px] -translate-x-1/2 rounded-full opacity-85 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, #ac9fee, transparent)" }}
        />
      </div>

      {/* No inner max-w wrapper — the card spans the full container-page
          width (up to the 1200px page max) instead of being capped at
          max-w-2xl like the old wizard artifact was. Text inside stays
          centred on its own narrower measure so long lines don't run
          edge-to-edge on wide screens. */}
      <div className="container-page relative z-10">
        <Reveal>
          <div className="card-neutral">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-display text-heading-lg text-ink">{qualified.bookingHeading}</h2>
              <p className="mt-4 text-body text-slate">{qualified.bookingBody}</p>

              <div className="mt-10 flex justify-center">
                <PillButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  {qualified.bookingButton}
                </PillButton>
              </div>

              <p className="mt-6 text-meta text-ash">
                {qualified.emailAltText}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-ink">
                  {CONTACT_EMAIL}
                </a>
              </p>

              <p className="mt-2 text-meta text-ash">{qualified.cityNote}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
