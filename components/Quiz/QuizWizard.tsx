"use client";

import { useState } from "react";
import type { Dictionary, Locale, PainSlug } from "@/lib/i18n/types";
import { formatTemplate } from "@/lib/i18n";
import ChoiceButton from "./ChoiceButton";
import ProgressDots from "./ProgressDots";
import Result from "./Result";

type City = "barcelona" | "other";
type Timeframe = "already" | "lt1m" | "m1to3" | "later";
type PainAnswer = PainSlug | "other";

type Answers = {
  city?: City;
  timeframe?: Timeframe;
  pain?: PainAnswer;
  name?: string;
  phone?: string;
  consent?: boolean;
};

type StepId = "city" | "timeframe" | "pain" | "contact";
const STEPS: StepId[] = ["city", "timeframe", "pain", "contact"];

type Props = {
  locale: Locale;
  pain: PainSlug;
  dict: Dictionary;
};

function isQualified(a: Answers): boolean {
  const qualifyingTimeframe = a.timeframe === "already" || a.timeframe === "lt1m" || a.timeframe === "m1to3";
  return a.city === "barcelona" && qualifyingTimeframe;
}

export default function QuizWizard({ locale, pain, dict }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ pain });
  const [showResult, setShowResult] = useState(false);
  const [qualified, setQualified] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const q = dict.quiz;
  const step = STEPS[stepIndex];

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }
  function choose<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
    goNext();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const digits = (answers.phone ?? "").replace(/[^\d]/g, "");
    if (digits.length < 7) {
      setError(q.contact.error);
      return;
    }
    if (!answers.consent) {
      setError(q.contact.error);
      return;
    }

    const qualifies = isQualified(answers);
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: answers.name,
          phone: answers.phone,
          consent: answers.consent,
          source: "quiz",
          locale,
          landingPain: pain,
          city: answers.city,
          timeframe: answers.timeframe,
          selectedPain: answers.pain,
          qualified: qualifies,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      setQualified(qualifies);
      setShowResult(true);
      setStatus("idle");
    } catch {
      setStatus("error");
      setError(q.contact.error);
    }
  }

  function restart() {
    setAnswers({ pain });
    setStepIndex(0);
    setShowResult(false);
    setQualified(false);
    setStatus("idle");
    setError("");
  }

  if (showResult) {
    return <Result locale={locale} dict={dict} qualified={qualified} onRestart={restart} />;
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
          <legend className="mb-4 text-center text-lg font-bold text-brand-ink sm:text-xl">
            {q.city.question}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              label={q.city.barcelona}
              selected={answers.city === "barcelona"}
              onClick={() => choose("city", "barcelona")}
            />
            <ChoiceButton
              label={q.city.other}
              selected={answers.city === "other"}
              onClick={() => choose("city", "other")}
            />
          </div>
        </fieldset>
      )}

      {step === "timeframe" && (
        <fieldset>
          <legend className="mb-4 text-center text-lg font-bold text-brand-ink sm:text-xl">
            {q.timeframe.question}
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <ChoiceButton
              label={q.timeframe.already}
              selected={answers.timeframe === "already"}
              onClick={() => choose("timeframe", "already")}
            />
            <ChoiceButton
              label={q.timeframe.lt1m}
              selected={answers.timeframe === "lt1m"}
              onClick={() => choose("timeframe", "lt1m")}
            />
            <ChoiceButton
              label={q.timeframe.m1to3}
              selected={answers.timeframe === "m1to3"}
              onClick={() => choose("timeframe", "m1to3")}
            />
            <ChoiceButton
              label={q.timeframe.later}
              selected={answers.timeframe === "later"}
              onClick={() => choose("timeframe", "later")}
            />
          </div>
        </fieldset>
      )}

      {step === "pain" && (
        <fieldset>
          <legend className="mb-4 text-center text-lg font-bold text-brand-ink sm:text-xl">
            {q.pain.question}
          </legend>
          <div className="grid gap-3">
            <ChoiceButton
              label={q.pain.deposit}
              selected={answers.pain === "deposit"}
              onClick={() => choose("pain", "deposit")}
            />
            <ChoiceButton
              label={q.pain.admin}
              selected={answers.pain === "admin"}
              onClick={() => choose("pain", "admin")}
            />
            <ChoiceButton
              label={q.pain.belongings}
              selected={answers.pain === "belongings"}
              onClick={() => choose("pain", "belongings")}
            />
            <ChoiceButton
              label={q.pain.urgent}
              selected={answers.pain === "urgent"}
              onClick={() => choose("pain", "urgent")}
            />
            <ChoiceButton
              label={q.pain.other}
              selected={answers.pain === "other"}
              onClick={() => choose("pain", "other")}
            />
          </div>
        </fieldset>
      )}

      {step === "contact" && (
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center text-lg font-bold text-brand-ink sm:text-xl">{q.contact.heading}</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              autoComplete="name"
              value={answers.name ?? ""}
              onChange={(e) => setAnswers((a) => ({ ...a, name: e.target.value }))}
              placeholder={q.contact.namePlaceholder}
              className="w-full rounded-3xl border border-black/10 bg-white px-5 py-4 text-base text-brand-ink placeholder:text-black/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
            <input
              type="tel"
              required
              autoComplete="tel"
              value={answers.phone ?? ""}
              onChange={(e) => setAnswers((a) => ({ ...a, phone: e.target.value }))}
              placeholder={q.contact.phonePlaceholder}
              className="w-full rounded-3xl border border-black/10 bg-white px-5 py-4 text-base text-brand-ink placeholder:text-black/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
            <label className="flex items-start gap-2 text-left text-xs text-brand-ink/60">
              <input
                type="checkbox"
                checked={answers.consent ?? false}
                onChange={(e) => setAnswers((a) => ({ ...a, consent: e.target.checked }))}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-brand-primary focus:ring-brand-primary/40"
              />
              <span>{q.contact.consent}</span>
            </label>
            <button type="submit" disabled={status === "loading"} className="btn-primary w-full disabled:opacity-60">
              {status === "loading" ? q.contact.submitting : q.contact.submitButton}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>
      )}

      {step !== "city" && (
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
