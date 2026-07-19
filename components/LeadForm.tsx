"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type LeadFormProps = {
  variant?: "hero" | "section";
  id?: string;
};

export default function LeadForm({ variant = "section", id }: LeadFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const showDetails = variant === "section";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/[^\d]/g, "");
    if (digits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!consent) {
      setError("Please confirm you agree to be contacted.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: showDetails ? name : undefined,
          phone,
          message: showDetails ? message : undefined,
          consent,
          source: variant,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }
      router.push("/thank-you");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again in a moment.");
    }
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={variant === "hero" ? "w-full max-w-md" : "mx-auto w-full max-w-md"}
    >
      {showDetails ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-3xl border border-black/10 bg-white px-5 py-4 text-base text-brand-ink placeholder:text-black/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
          <input
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            className="w-full rounded-3xl border border-black/10 bg-white px-5 py-4 text-base text-brand-ink placeholder:text-black/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your situation (optional)"
            rows={3}
            className="w-full resize-none rounded-3xl border border-black/10 bg-white px-5 py-4 text-base text-brand-ink placeholder:text-black/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary w-full disabled:opacity-60"
          >
            {status === "loading" ? "Booking…" : "Get My Free Review"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your phone number"
            className="w-full rounded-3xl border border-black/10 bg-white px-5 py-4 text-base text-brand-ink placeholder:text-black/40 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
          <button type="submit" disabled={status === "loading"} className="btn-primary shrink-0 disabled:opacity-60">
            {status === "loading" ? "Booking…" : "Get My Free Review"}
          </button>
        </div>
      )}

      <label className="mt-3 flex items-start gap-2 text-left text-xs text-brand-ink/60">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-brand-primary focus:ring-brand-primary/40"
        />
        <span>
          I agree to be contacted by MoveOS about my free Move-Out Review. See our{" "}
          <a href="/privacy" className="underline hover:text-brand-primary">
            Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
}
