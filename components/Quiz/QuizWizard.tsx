"use client";

import { useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { formatTemplate } from "@/lib/i18n";
import ChoiceButton from "./ChoiceButton";
import ProgressDots from "./ProgressDots";
import Result from "./Result";

type City = "barcelona" | "other";
type Timeframe = "already" | "lt1m" | "m1to3" | "later";

type Answers = {
  city?: City;
  timeframe?: Timeframe;
};

type StepId = "city" | "timeframe" | "contact";
const STEPS: StepId[] = ["city", "timeframe", "contact"];

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function isQualified(a: Answers): boolean {
  // Qualified = renting in Barcelona AND moving out within the next 3 months.
  // Already moved out, "later than 3 months / not sure", and other cities all fall back to the checklist only.
  const qualifyingTimeframe = a.timeframe === "lt1m" || a.timeframe === "m1to3";
  return a.city === "barcelona" && qualifyingTimeframe;
}

// One short, identical quiz everywhere: city, then timeframe, then straight
// to the result screen (checklist download + booking box + email — no form,
// since there's no backend to send a phone-collection form to).
export default function QuizWizard({ locale, dict }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [qualified, setQualified] = useState(false);

  const q = dict.quiz;
  const step = STEPS[stepIndex];

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function chooseCity(value: City) {
    setAnswers((a) => ({ ...a, city: value }));
    setStepIndex(1);
  }

  function chooseTimeframe(value: Timeframe) {
    const next = { ...answers, timeframe: value };
    setAnswers(next);
    setQualified(isQualified(next));
    setStepIndex(2);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setQualified(false);
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <ProgressDots
        total={STEPS.length}
        current={stepIndex}
        label={formatTemplate(q.progressLabel, { n: stepIndex + 1, total: STEPS.length })}
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
