"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import type { Locale } from "@/lib/i18n/types";

type Fields = {
  address: string;
  rooms: string;
  area: string;
  name: string;
  phone: string;
};

type Props = {
  locale: Locale;
  heading: string;
  body: string;
  cta: string;
  fields: Fields;
  consent: string;
  consentLink: string;
  success: string;
  error: string;
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * The page's real lead-capture form — actual text inputs, not the
 * choice-button quiz the pain pages use (QuizWizard never collects a
 * raw phone number itself; it hands off to an external booking link).
 * This is the only place in the codebase with real <input> fields, so it
 * doesn't reuse an existing form component — there wasn't one to reuse.
 *
 * Posts to the existing /api/lead endpoint with source: "host-lead-form"
 * and the three property fields the route now accepts (see
 * app/api/lead/route.ts).
 */
export default function HostLeadForm({ locale, heading, body, cta, fields, consent, consentLink, success, error }: Props) {
  const [values, setValues] = useState<Fields>({ address: "", rooms: "", area: "", name: "", phone: "" });
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  function update(key: keyof Fields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          consent: agreed,
          source: "host-lead-form",
          locale,
          landingPain: "host",
          propertyAddress: values.address,
          rooms: values.rooms,
          area: values.area,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-input border border-hairline bg-paper px-4 py-3 text-body text-ink placeholder:text-ash focus:outline-none focus:ring-2 focus:ring-ink/10";
  const labelClass = "mb-2 block text-caption text-slate";

  return (
    <section id="calculate" className="scroll-mt-24 bg-paper py-20 sm:py-section">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mt-6 max-w-sm whitespace-pre-line text-body text-slate">{body}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" direction="right">
            <div className="card-neutral">
              {status === "success" ? (
                <p className="py-8 text-center text-heading-sm text-ink">{success}</p>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="host-address">
                      {fields.address}
                    </label>
                    <input
                      id="host-address"
                      required
                      value={values.address}
                      onChange={update("address")}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="host-rooms">
                      {fields.rooms}
                    </label>
                    <input id="host-rooms" value={values.rooms} onChange={update("rooms")} className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="host-area">
                      {fields.area}
                    </label>
                    <input id="host-area" value={values.area} onChange={update("area")} className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="host-name">
                      {fields.name}
                    </label>
                    <input
                      id="host-name"
                      required
                      value={values.name}
                      onChange={update("name")}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="host-phone">
                      {fields.phone}
                    </label>
                    <input
                      id="host-phone"
                      type="tel"
                      required
                      value={values.phone}
                      onChange={update("phone")}
                      className={inputClass}
                    />
                  </div>

                  <label className="sm:col-span-2 mt-2 flex items-start gap-3 text-meta text-ash">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-hairline"
                    />
                    <span>
                      {consent}{" "}
                      <Link
                        href={`/${locale}/privacy`}
                        className="underline underline-offset-4 transition-colors hover:text-ink"
                      >
                        {consentLink}
                      </Link>
                    </span>
                  </label>

                  <div className="sm:col-span-2">
                    <button type="submit" disabled={status === "loading"} className="btn-pill w-full sm:w-auto">
                      {cta}
                    </button>
                    {status === "error" && <p className="mt-4 text-caption text-sienna">{error}</p>}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
