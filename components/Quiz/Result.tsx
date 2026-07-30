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
  const checklist = dict.checklist[checklistType];
  const pdfHref = `/checklists/${locale}/${checklistType}.pdf`;

  return (
    <div className="mx-auto max-w-2xl text-center">
      {qualified && (
        <div className="mt-8 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-4 sm:p-8">
          <h4 className="text-card-title text-brand-ink">{dict.results.qualified.bookingHeading}</h4>
          <p className="mt-2 text-small text-brand-ink/70">{dict.results.qualified.bookingBody}</p>
          <GlareButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-5 w-full sm:w-auto">
            {dict.results.qualified.bookingButton}
          </GlareButton>
          <p className="mt-4 text-sm text-brand-ink/60">
            {dict.results.qualified.emailAltText}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-4 sm:p-8">
        <h4 className="text-card-title text-brand-ink">
          {qualified ? dict.results.qualified.checklistHeading : dict.results.notQualified.checklistHeading}
        </h4>
        <p className="mt-2 text-small text-brand-ink/70">{checklist.intro}</p>
        <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <GlareButton href={pdfHref} download className="w-full sm:w-auto">
            {dict.results.downloadPdf}
          </GlareButton>
          <Link
            href={`/${locale}/checklist/${checklistType}`}
            className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full border border-brand-primary/30 px-6 py-3.5 text-sm font-semibold text-brand-primary transition hover:bg-brand-primary/5 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
          >
            {dict.results.viewChecklistButton}
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 text-sm font-semibold text-brand-primary underline-offset-4 hover:underline"
      >
        {dict.results.restartButton}
      </button>
    </div>
  );
}
