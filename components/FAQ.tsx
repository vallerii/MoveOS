"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { ChevronDownIcon } from "./icons";

type Item = { q: string; a: string };
type Props = {
  heading: string;
  subheading?: string;
  items: Item[];
  /** Defaults to the original /repair treatment (centred). /host/first-time
   * passes "left" for this one section on request — every other heading on
   * that page (HostFirstTimeServices, HostFirstTimeTrust) stays centred. */
  align?: "center" | "left";
  /** Owner-facing question set. When this AND `tabLabels` are both given, a
   * small segmented control appears under the heading letting visitors
   * switch the list between `items` (tenants) and `ownerItems` — used on
   * the homepage, where the FAQ is one shared section for two audiences.
   * Leave both unset and this renders exactly as before: a single list,
   * no toggle — which is what /repair and /host/first-time still get. */
  ownerItems?: Item[];
  tabLabels?: { tenants: string; owners: string };
};

/**
 * Objection-handling FAQ — used on /repair, /host/first-time, and the
 * homepage, right before each page's closing ask (or, on the homepage,
 * before the quiz).
 *
 * Same disclosure pattern as Checklist's sections (native <details>, hairline
 * rows, rotating chevron) rather than a new accordion implementation. Header
 * alignment is the one thing that varies by caller (see `align` above); the
 * list itself always sits narrower (max-w-3xl) than the full container since
 * Q&A reads better as a single column than stretched to the page width.
 *
 * The audience toggle (see `ownerItems`/`tabLabels`) is why this is a client
 * component now — everything else here is static enough to have stayed a
 * server component, but switching the list needs local state.
 */
export default function FAQ({ heading, subheading, items, align = "center", ownerItems, tabLabels }: Props) {
  const hasTabs = Boolean(ownerItems?.length && tabLabels);
  const [audience, setAudience] = useState<"tenants" | "owners">("tenants");
  const activeItems = hasTabs && audience === "owners" ? ownerItems! : items;

  return (
    <section className="bg-fog py-20 sm:py-section">
      <div className="container-page">
        <Reveal>
          <div className={align === "left" ? "max-w-2xl" : "mx-auto max-w-2xl text-center"}>
            <h2 className="font-display text-heading-lg text-ink">{heading}</h2>
            {subheading && (
              <p className={`mt-6 max-w-xl text-body text-slate ${align === "left" ? "" : "mx-auto"}`}>
                {subheading}
              </p>
            )}

            {hasTabs && (
              <div className={`mt-6 inline-flex rounded-full bg-mist p-1 ${align === "left" ? "" : ""}`}>
                {(["tenants", "owners"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAudience(key)}
                    aria-pressed={audience === key}
                    className={`rounded-full px-5 py-2 text-meta transition-colors ${
                      audience === key ? "bg-paper text-ink" : "text-slate hover:text-ink"
                    }`}
                  >
                    {tabLabels![key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        <div className="mx-auto mt-16 w-full border-t border-hairline">
          {activeItems.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 60}>
              <details className="group border-b border-hairline py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-heading-sm text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>{q}</span>
                  <ChevronDownIcon className="h-5 w-5 shrink-0 text-ash transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-2xl text-caption text-slate">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
