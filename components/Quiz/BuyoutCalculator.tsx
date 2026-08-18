"use client";

import { useState } from "react";
import { BOOKING_URL } from "@/lib/config";
import { formatTemplate } from "@/lib/i18n";
import Reveal from "../Reveal";
import PillButton from "../PillButton";
import HeroGlow from "../Home/HeroGlow";
import ChoiceButton from "./ChoiceButton";
import ProgressDots from "./ProgressDots";

type Props = {
  heading: string;
  subheading: string;
  district: { question: string; options: string[] };
  size: { question: string; options: string[] };
  contractAge: { question: string; options: string[] };
  resultHeading: string;
  /** Template with {min} and {max} placeholders. */
  resultBody: string;
  disclaimer: string;
  ctaLabel: string;
  /** Reused from dict.quiz.progressLabel — "Step {n} of {total}". */
  progressLabel: string;
  /** Reused from dict.quiz.backButton. */
  backLabel: string;
  /** Reused from dict.results.restartButton. */
  restartLabel: string;
};

type StepId = "district" | "size" | "contractAge" | "result";
const STEPS: StepId[] = ["district", "size", "contractAge", "result"];

/**
 * Rough €/m² asking-rent benchmark per district, indexed to
 * `district.options` above (Ciutat Vella … Sant Martí, in that fixed order —
 * see the comment on Dictionary["pains"][PainSlug]["calculator"] in
 * lib/i18n/types.ts). These are ballpark placeholders for a teaser estimate,
 * not verified live market data — tune them once real comps exist, the same
 * way BOOKING_URL is a placeholder until the real calendar link is wired up.
 */
const DISTRICT_RATE = [21, 21, 17, 21, 21, 17, 14, 14, 14, 17];

/** Midpoint m² for each `size.options` bucket (<40, 40–60, 60–80, 80–100, 100+). */
const SIZE_SQM = [35, 50, 70, 90, 110];

/**
 * Assumed rent-vs-market gap for each `contractAge.options` bucket — the
 * longer a lease has sat unrenegotiated, the further it's likely drifted
 * below what the same flat would ask today.
 */
const AGE_GAP = [0.06, 0.14, 0.24, 0.35];

/**
 * Bonus range: (monthly gap × 6), clamped to the €300–2,000 band the rest of
 * the page quotes, then a floor half that for the low end — a range reads as
 * an estimate, a single number reads as a quote we haven't actually made.
 */
function estimateBonus(districtIdx: number, sizeIdx: number, ageIdx: number) {
  const marketRent = DISTRICT_RATE[districtIdx] * SIZE_SQM[sizeIdx];
  const monthlyGap = marketRent * AGE_GAP[ageIdx];
  const round50 = (n: number) => Math.round(n / 50) * 50;

  const high = Math.min(2000, Math.max(300, round50(monthlyGap * 6)));
  const low = Math.min(high, Math.max(200, round50(high * 0.6)));
  return { low, high };
}

/**
 * "Estimate your bonus" mini-calculator — the buyout page's one piece of
 * genuinely interactive content. Three choice-button questions (district,
 * size, how long ago the lease was signed) resolve to an illustrative bonus
 * range, then hand off straight to BOOKING_URL, same as every other CTA on
 * this page.
 *
 * Deliberately doesn't collect a name, phone or email — nothing here is
 * personally identifying, so unlike the old QuizWizard it needs no data
 * notice and posts nothing to /api/lead. It's a curiosity hook that earns a
 * click on "Book a Free Call", not a lead form in its own right.
 *
 * Two-column layout (heading/subheading left, interactive card right) and
 * the HeroGlow wash sitting behind it are the same shape as /host's
 * "Have an Apartment? Let's Calculate What It Could Earn" section
 * (components/Host/HostLeadForm.tsx) — this is the second real calculator
 * in the codebase, so it reuses that pattern rather than inventing a new
 * one. HeroGlow's own bottom edge fades to bg-paper, which is why this
 * section is Paper too rather than Fog/Mist.
 */
export default function BuyoutCalculator({
  heading,
  subheading,
  district,
  size,
  contractAge,
  resultHeading,
  resultBody,
  disclaimer,
  ctaLabel,
  progressLabel,
  backLabel,
  restartLabel,
}: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [districtIdx, setDistrictIdx] = useState<number | null>(null);
  const [sizeIdx, setSizeIdx] = useState<number | null>(null);
  const [ageIdx, setAgeIdx] = useState<number | null>(null);

  const step = STEPS[stepIndex];

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function chooseDistrict(i: number) {
    setDistrictIdx(i);
    setStepIndex(1);
  }

  function chooseSize(i: number) {
    setSizeIdx(i);
    setStepIndex(2);
  }

  function chooseAge(i: number) {
    setAgeIdx(i);
    setStepIndex(3);
  }

  function restart() {
    setDistrictIdx(null);
    setSizeIdx(null);
    setAgeIdx(null);
    setStepIndex(0);
  }

  const result = districtIdx !== null && sizeIdx !== null && ageIdx !== null
    ? estimateBonus(districtIdx, sizeIdx, ageIdx)
    : null;

  return (
    <section id="calculate" className="relative scroll-mt-24 bg-paper py-20 sm:py-section">
      <div className="pointer-events-none absolute inset-0 z-0 w-full lg:left-[15%]">
        <HeroGlow />
      </div>

      <div className="container-page relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="">
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mt-6 text-body text-slate">{subheading}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" direction="right">
            <div className="card-neutral">
              <ProgressDots
                total={STEPS.length}
                current={stepIndex}
                label={formatTemplate(progressLabel, { n: stepIndex + 1, total: STEPS.length })}
              />

              {/* Fixed minimum height for the step content itself (district's
                  10 options vs. the 4-option steps otherwise made the card —
                  and the whole page below it — jump on every click). Content
                  is vertically centred within it rather than pinned to the
                  top, so the shorter steps don't look stranded at the card's
                  upper edge. */}
              <div className="flex min-h-[280px] flex-col justify-center sm:min-h-[300px]">
                {step === "district" && (
                  <fieldset>
                    <legend className="mb-6 text-center font-display text-heading-sm text-ink">
                      {district.question}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {district.options.map((option, i) => (
                        <ChoiceButton
                          key={option}
                          label={option}
                          selected={districtIdx === i}
                          onClick={() => chooseDistrict(i)}
                        />
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === "size" && (
                  <fieldset>
                    <legend className="mb-6 text-center font-display text-heading-sm text-ink">
                      {size.question}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {size.options.map((option, i) => (
                        <ChoiceButton
                          key={option}
                          label={option}
                          selected={sizeIdx === i}
                          onClick={() => chooseSize(i)}
                        />
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === "contractAge" && (
                  <fieldset>
                    <legend className="mb-6 text-center font-display text-heading-sm text-ink">
                      {contractAge.question}
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {contractAge.options.map((option, i) => (
                        <ChoiceButton
                          key={option}
                          label={option}
                          selected={ageIdx === i}
                          onClick={() => chooseAge(i)}
                        />
                      ))}
                    </div>
                  </fieldset>
                )}

                {step === "result" && result && (
                  <div className="text-center">
                    <p className="tag">{resultHeading}</p>
                    <p className="mt-4 font-display text-heading text-ink">
                      {formatTemplate(resultBody, { min: result.low, max: result.high })}
                    </p>
                    <div className="mt-8 flex justify-center">
                      <PillButton
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto"
                      >
                        {ctaLabel}
                      </PillButton>
                    </div>
                    <p className="mx-auto mt-6 max-w-sm text-meta text-ash">{disclaimer}</p>
                  </div>
                )}
              </div>

              {step === "result" ? (
                <div className="mt-2 text-center">
                  <button
                    type="button"
                    onClick={restart}
                    className="text-caption text-slate underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    {restartLabel}
                  </button>
                </div>
              ) : (
                step !== "district" && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="block text-center text-caption text-slate transition-colors hover:text-ink"
                  >
                    ← {backLabel}
                  </button>
                )
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
