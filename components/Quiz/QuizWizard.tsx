"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";
import { formatTemplate } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/config";
import ChoiceButton from "./ChoiceButton";
import ProgressDots from "./ProgressDots";
import PillButton from "../PillButton";
import Result from "./Result";

type City = "barcelona" | "other";
type Timeframe = "already" | "lt1m" | "m1to3" | "later";

type Answers = {
  city?: City;
  /** Index into this page's topic options — kept for the lead, not scored. */
  topic?: number;
  timeframe?: Timeframe;
};

type StepId = "city" | "topic" | "timeframe" | "contact";

type Props = {
  locale: Locale;
  dict: Dictionary;
  /**
   * Which landing page the quiz is running on. Absent on the homepage, where
   * there's no topic yet — that's the one place the topic step is skipped.
   */
  pain?: PainSlug;
};

function isQualified(a: Answers): boolean {
  // Qualified = renting in Barcelona AND moving out within the next 3 months.
  // Already moved out, "later than 3 months / not sure", and other cities all
  // fall back to the checklist only.
  const qualifyingTimeframe = a.timeframe === "lt1m" || a.timeframe === "m1to3";
  return a.city === "barcelona" && qualifyingTimeframe;
}

/**
 * City, then (on a landing page) a question specific to that page's subject,
 * then timeframe, then the result — checklist download plus a booking box for
 * anyone who qualifies.
 *
 * The topic step is what makes the six landing pages actually differ once a
 * visitor starts the quiz. It doesn't feed qualification; it's there so the
 * consultation starts from something the visitor has already told us, which
 * is what "a personal plan, not a generic checklist" has to mean in practice.
 */
export default function QuizWizard({ locale, dict, pain }: Props) {
  const q = dict.quiz;

  // The topic step only exists where there's a topic to ask about.
  const steps: StepId[] = pain ? ["city", "topic", "timeframe", "contact"] : ["city", "timeframe", "contact"];

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [qualified, setQualified] = useState(false);

  const step = steps[stepIndex];
  const topic = pain ? q.topic[pain] : null;

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function chooseCity(value: City) {
    setAnswers((a) => ({ ...a, city: value }));
    // "Other city" doesn't advance — it gets its own screen below. Barcelona
    // is the only city the service actually covers, and pretending otherwise
    // for two more steps wastes the visitor's time.
    if (value === "barcelona") setStepIndex(1);
  }

  function chooseTopic(value: number) {
    setAnswers((a) => ({ ...a, topic: value }));
    setStepIndex(2);
  }

  function chooseTimeframe(value: Timeframe) {
    const next = { ...answers, timeframe: value };
    setAnswers(next);
    setQualified(isQualified(next));
    setStepIndex(steps.length - 1);
  }

  function restart() {
    setAnswers({});
    setStepIndex(0);
    setQualified(false);
  }

  // Chosen "other city": a real answer with a real screen, rather than
  // dropping the visitor into a Barcelona-only flow.
  if (answers.city === "other") {
    return (
      <div className="mx-auto w-full max-w-xl text-center">
        <h4 className="font-display text-heading-sm text-ink">{q.otherCity.heading}</h4>
        <p className="mx-auto mt-4 max-w-md text-caption text-slate">{q.otherCity.body}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PillButton href={`mailto:${CONTACT_EMAIL}`} className="w-full sm:w-auto">
            {q.otherCity.button}
          </PillButton>
          <PillButton href={`/${locale}/checklist/generic`} internal variant="ghost" className="w-full sm:w-auto">
            {dict.results.viewChecklistButton}
          </PillButton>
        </div>
        <button
          type="button"
          onClick={restart}
          className="mt-8 text-caption text-slate underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          {q.otherCity.back}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <ProgressDots
        total={steps.length}
        current={stepIndex}
        label={formatTemplate(q.progressLabel, { n: stepIndex + 1, total: steps.length })}
      />

      {step === "city" && (
        <fieldset>
          <legend className="mb-6 text-center font-display text-heading-sm text-ink">{q.city.question}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              label={q.city.barcelona}
              selected={answers.city === "barcelona"}
              onClick={() => chooseCity("barcelona")}
            />
            <ChoiceButton label={q.city.other} selected={false} onClick={() => chooseCity("other")} />
          </div>
        </fieldset>
      )}

      {step === "topic" && topic && (
        <fieldset>
          <legend className="mb-6 text-center font-display text-heading-sm text-ink">{topic.question}</legend>
          <div className="grid gap-3">
            {topic.options.map((option, i) => (
              <ChoiceButton
                key={option}
                label={option}
                selected={answers.topic === i}
                onClick={() => chooseTopic(i)}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === "timeframe" && (
        <fieldset>
          <legend className="mb-6 text-center font-display text-heading-sm text-ink">{q.timeframe.question}</legend>
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
          className="mt-6 block text-center text-caption text-slate transition-colors hover:text-ink"
        >
          ← {q.backButton}
        </button>
      )}

      {/* Shown on every step, including the result. This quiz ends with the
          visitor handing over their landlord's contact details — a third
          party who hasn't consented — so who sees the data belongs next to
          the questions, not only in the footer. */}
      <p className="mt-10 border-t border-hairline pt-6 text-center text-meta text-ash">
        {q.dataNotice}{" "}
        <Link href={`/${locale}/privacy`} className="underline underline-offset-4 transition-colors hover:text-ink">
          {q.dataNoticeLink}
        </Link>
      </p>
    </div>
  );
}
