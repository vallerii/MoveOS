import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/config";
import GlareButton from "../GlareButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
  qualified: boolean;
  onRestart: () => void;
};

export default function Result({ locale, dict, qualified, onRestart }: Props) {
  const checklistType = qualified ? "qualified" : "generic";
  const pdfHref = `/checklists/${locale}/${checklistType}.pdf`;

  return (
    <div className="mx-auto max-w-2xl text-center">
      {qualified ? (
        <div className="rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-4 sm:p-6">
          <h4 className="text-card-title text-brand-ink">{dict.results.qualified.bookingHeading}</h4>
          <p className="mt-2 text-small text-brand-ink/70">{dict.results.qualified.bookingBody}</p>
          <GlareButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-4 w-full sm:w-auto">
            {dict.results.qualified.bookingButton}
          </GlareButton>
          <p className="mt-3 text-sm text-brand-ink/60">
            {dict.results.qualified.emailAltText}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      ) : (
        // No booking card for a non-qualified visitor (e.g. "other city") —
        // this is the only place they see the actual decline message, so it
        // needs to render here rather than being silently unused copy.
        <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-6">
          <span className="inline-flex w-fit items-center rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-primary">
            {dict.results.notQualified.badge}
          </span>
          <h4 className="mt-3 text-card-title text-brand-ink">{dict.results.notQualified.heading}</h4>
          <p className="mt-2 text-small text-brand-ink/70">{dict.results.notQualified.body}</p>
        </div>
      )}

      {/* A single link line instead of a full second card (heading + intro
          + two buttons) — the checklist is a bonus at this point, not the
          main content, so it shouldn't compete for space/height with the
          booking or decline card above it. */}
      <p className="mt-4 text-sm text-brand-ink/60">
        {dict.results.checklistAltText}{" "}
        <Link href={`/${locale}/checklist/${checklistType}`} className="font-semibold text-brand-primary hover:underline">
          {dict.results.viewChecklistButton}
        </Link>
        {" · "}
        <a href={pdfHref} download className="font-semibold text-brand-primary hover:underline">
          {dict.results.downloadPdf}
        </a>
      </p>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 text-sm font-semibold text-brand-primary underline-offset-4 hover:underline"
      >
        {dict.results.restartButton}
      </button>
    </div>
  );
}
