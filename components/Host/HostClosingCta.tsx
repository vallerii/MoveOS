import Reveal from "../Reveal";
import PillButton from "../PillButton";
import Glow from "../Glow";

type Props = {
  heading: string;
  body: string;
  cta: string;
  // Defaults to the original /host behaviour (scrolls to its own lead
  // form). /host/first-time has no lead form on the page, so it passes
  // BOOKING_URL plus target/rel instead.
  ctaHref?: string;
  ctaTarget?: string;
  ctaRel?: string;
  // /host relies on HostLeadForm's own py-20/section padding immediately
  // above this section for top spacing, so the section itself is
  // bottom-only by default. /host/first-time has no lead form — nothing
  // sits between this and the testimonials carousel above it — so it
  // passes true here to get its own top padding instead of collapsing
  // against the section before it.
  withTopPadding?: boolean;
  // /host's version of this section sits on a plain Paper background — the
  // page already spent its light earlier (HeroGlow, HostLeadForm's own
  // glow). /host/first-time has neither, so it asks for the same soft
  // wash HeroGlow/QuizSection use behind their card, scaled down for a
  // single card instead of a full hero viewport.
  glow?: boolean;
};

/**
 * "Ваша квартира. Наше управление." — the page's single Accent Peach
 * surface (system rule: at most one per page), spent here rather than
 * earlier, since this is the last thing a scrolling visitor sees before
 * either acting or leaving.
 */
export default function HostClosingCta({
  heading,
  body,
  cta,
  ctaHref = "#calculate",
  ctaTarget,
  ctaRel,
  withTopPadding = false,
  glow = false,
}: Props) {
  return (
    <section
      className={`relative bg-paper pb-20 sm:pb-section ${withTopPadding ? "pt-20 sm:pt-section" : ""} ${
        glow ? "overflow-hidden" : ""
      }`}
    >
      {glow && (
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
      )}

      <div className="container-page relative z-10">
        <Reveal>
          <div className="card-neutral flex flex-col items-center gap-6 py-14 text-center sm:py-16">
            <h2 className="max-w-2xl font-display text-heading-lg text-ink">{heading}</h2>
            <p className="max-w-xl whitespace-pre-line text-body text-ink/80">{body}</p>
            <PillButton href={ctaHref} target={ctaTarget} rel={ctaRel} className="mt-2">
              {cta}
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
