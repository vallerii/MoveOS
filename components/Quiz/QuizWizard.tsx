"use client";

import { useState } from "react";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";
import { formatTemplate } from "@/lib/i18n";
import { PAIN_SLUGS } from "@/lib/pains";
import ChoiceButton from "./ChoiceButton";
import ProgressDots from "./ProgressDots";
import Result from "./Result";

type City = "barcelona" | "other";
type Timeframe = "already" | "lt1m" | "m1to3" | "later";

type Answers = {
  city?: City;
  pain?: PainSlug;
  topic?: string;
  timeframe?: Timeframe;
};

type StepId = "city" | "pain" | "topic" | "timeframe" | "contact";

type Props = {
  locale: Locale;
  dict: Dictionary;
  // Passed on pain-specific landing pages (deposit/urgent/etc.) — the quiz
  // already knows the topic from the URL, so it skips straight to the
  // topic-specific question. Left undefined on the homepage, where an
  // extra "pain" step asks the visitor directly.
  pain?: PainSlug;
};

function isQualified(a: Answers): boolean {
  // Qualified = renting in Barcelona AND moving out within the next 3 months.
  // Already moved out, "later than 3 months / not sure", and other cities all fall back to the checklist only.
  const qualifyingTimeframe = a.timeframe === "lt1m" || a.timeframe === "m1to3";
  return a.city === "barcelona" && qualifyingTimeframe;
}

export default function QuizWizard({ locale, dict, pain }: Props) {
  // Fixed on pain pages; asked on the homepage — either way, `topic`
  // renders the same per-pain question once one is known, which is what
  // actually makes quiz steps differ page to page instead of the same two
  // generic questions everywhere.
  const flowSteps: StepId[] = pain ? ["city", "topic", "timeframe", "contact"] : ["city", "pain", "topic", "timeframe", "contact"];

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [qualified, setQualified] = useState(false);

  const q = dict.quiz;
  const step = flowSteps[stepIndex];
  const effectivePain = pain ?? answers.pain;

  function goBack() {
    // The "other city" shortcut jumps straight from step 1 to the result —
    // stepping "back" from there should return to step 1, not to whatever
    // unanswered question happens to sit right before "contact" in the flow.
    if (answers.city === "other" && step === "contact") {
      setStepIndex(0);
      return;
    }
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function chooseCity(value: City) {
    setAnswers((a) => ({ ...a, city: value }));
    if (value === "other") {
      // Service is Barcelona-only — show the polite decline (generic
      // checklist + "we currently only operate in Barcelona" message)
      // immediately instead of asking two more now-irrelevant questions.
      setQualified(false);
      setStepIndex(flowSteps.length - 1);
      return;
    }
    setStepIndex(1);
  }

  function choosePain(value: PainSlug) {
    setAnswers((a) => ({ ...a, pain: value }));
    setStepIndex((i) => i + 1);
  }

  function chooseTopic(value: string) {
    setAnswers((a) => ({ ...a, topic: value }));
    setStepIndex((i) => i + 1);
  }

  function chooseTimeframe(value: Timeframe) {
    const next = { ...answers, timeframe: value };
    setAnswers(next);
    setQualified(isQualified(next));
    setStepIndex((i) => i + 1);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setQualified(false);
  }

  return (
    <div className="mx-auto w-full max-w-xl h-full">
      <ProgressDots
        total={flowSteps.length}
        current={stepIndex}
        label={formatTemplate(q.progressLabel, { n: stepIndex + 1, total: flowSteps.length })}
      />

      {step === "city" && (
        <fieldset>
          <legend className="mb-4 text-center text-card-title text-brand-ink">
            {q.city.question}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              label={q.city.barcelona}
              selected={answers.city === "barcelona"}
              onClick={() => chooseCity("barcelona")}
            />
            <ChoiceButton
              label={q.city.other}
              selected={answers.city === "other"}
              onClick={() => chooseCity("other")}
            />
          </div>
        </fieldset>
      )}

      {step === "pain" && (
        <fieldset>
          <legend className="mb-4 text-center text-card-title text-brand-ink">
            {q.painIntro.question}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAIN_SLUGS.map((slug) => (
              <ChoiceButton
                key={slug}
                label={dict.pains[slug].shortLabel}
                selected={answers.pain === slug}
                onClick={() => choosePain(slug)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === "topic" && effectivePain && (
        <fieldset>
          <legend className="mb-4 text-center text-card-title text-brand-ink">
            {q.topic[effectivePain].question}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {q.topic[effectivePain].options.map((option) => (
              <ChoiceButton
                key={option}
                label={option}
                selected={answers.topic === option}
                onClick={() => chooseTopic(option)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === "timeframe" && (
        <fieldset>
          <legend className="mb-4 text-center text-card-title text-brand-ink">
            {q.timeframe.question}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              label={q.timeframe.already}
              selected={answers.timeframe === "already"}
              onClick={() => chooseTimeframe("already")}
            />
            <ChoiceButton
              label={q.timeframe.lt1m}
              selected={answers.timeframe === "lt1m"}
              onClick={() => chooseTimeframe("lt1m")}
            />
            <ChoiceButton
              label={q.timeframe.m1to3}
              selected={answers.timeframe === "m1to3"}
              onClick={() => chooseTimeframe("m1to3")}
            />
            <ChoiceButton
              label={q.timeframe.later}
              selected={answers.timeframe === "later"}
              onClick={() => chooseTimeframe("later")}
            />
          </div>
        </fieldset>
      )}

      {step === "contact" && <Result locale={locale} dict={dict} qualified={qualified} onRestart={restart} />}

      {step !== "city" && step !== "contact" && (
        <button
          type="button"
          onClick={goBack}
          className="mt-5 block text-center text-sm font-medium text-brand-ink/50 hover:text-brand-ink"
        >
          ← {q.backButton}
        </button>
      )}
    </div>
  );
}
