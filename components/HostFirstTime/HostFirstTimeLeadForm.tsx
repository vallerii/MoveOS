"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "../Reveal";
import type { Locale } from "@/lib/i18n/types";
import HeroGlow from "../Home/HeroGlow";

type Fields = {
  address: string;
  plannedDate: string;
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
 * The first-time-landlord page's lead form — same real-<input> shape and
 * /api/lead wiring as HostLeadForm, but four fields instead of five
 * (address, planned move-in date, name, phone — no rooms/area, since the
 * ask here is a consultation, not an income estimate). Kept as its own
 * component rather than a HostLeadForm prop variant: the field set is
 * genuinely different, and HostLeadForm's Fields type is already exported
 * implicitly through its Props, not designed to flex.
 *
 * Posts with source: "host-first-time-lead-form" and landingPain:
 * "host-first-time" so leads from this page are distinguishable from
 * /host's in the same webhook (see app/api/lead/route.ts).
 */
export default function HostFirstTimeLeadForm({
  locale,
  heading,
  body,
  cta,
  fields,
  consent,
  consentLink,
  success,
  error,
}: Props) {
  const [values, setValues] = useState<Fields>({ address: "", plannedDate: "", name: "", phone: "" });
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
          source: "host-first-time-lead-form",
          locale,
          landingPain: "host-first-time",
          propertyAddress: values.address,
          plannedDate: values.plannedDate,
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
    <section id="calculate" className="relative scroll-mt-24 bg-paper py-20 sm:py-section">
      <div className="pointer-events-none absolute inset-0 z-0 w-full lg:left-[15%]">
        <HeroGlow />
      </div>
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="lg:top-32">
              <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
              <p className="mt-6 whitespace-pre-line text-body text-slate">{body}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" direction="right">
            <div className="card-neutral">
              {status === "success" ? (
                <p className="py-8 text-center text-heading-sm text-ink">{success}</p>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="hft-address">
                      {fields.address}
                    </label>
                    <input
                      id="hft-address"
                      required
                      value={values.address}
                      onChange={update("address")}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="hft-planned-date">
                      {fields.plannedDate}
                    </label>
                    <input
                      id="hft-planned-date"
                      value={values.plannedDate}
                      onChange={update("plannedDate")}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="hft-name">
                      {fields.name}
                    </label>
                    <input id="hft-name" required value={values.name} onChange={update("name")} className={inputClass} />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass} htmlFor="hft-phone">
                      {fields.phone}
                    </label>
                    <input
                      id="hft-phone"
                      type="tel"
                      required
                      value={values.phone}
                      onChange={update("phone")}
                      className={inputClass}
                    />
                  </div>

                  <label className="mt-2 flex items-start gap-3 text-meta text-ash sm:col-span-2">
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
