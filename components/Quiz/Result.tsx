import type { Dictionary, Locale } from "@/lib/i18n/types";
import Checklist from "../Checklist";
import { BOOKING_URL } from "@/lib/config";

type Props = {
  locale: Locale;
  dict: Dictionary;
  qualified: boolean;
  onRestart: () => void;
};

export default function Result({ locale, dict, qualified, onRestart }: Props) {
  const variant = qualified ? "qualified" : "notQualified";
  const copy = dict.results[variant];
  const checklist = qualified ? dict.checklist.qualified : dict.checklist.generic;
  const pdfHref = `/checklists/${locale}/${qualified ? "qualified" : "generic"}.pdf`;

  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="eyebrow">{copy.badge}</span>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-brand-ink sm:text-3xl">{copy.heading}</h3>
      <p className="mt-3 text-brand-ink/70">{copy.body}</p>

      {qualified && (
        <div className="mt-8 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-6 sm:p-8">
          <h4 className="text-lg font-bold text-brand-ink">{dict.results.qualified.bookingHeading}</h4>
          <p className="mt-2 text-sm text-brand-ink/70">{dict.results.qualified.bookingBody}</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 inline-flex"
          >
            {dict.results.qualified.bookingButton}
          </a>
        </div>
      )}

      <div className="mt-8 text-left">
        <h4 className="mb-3 text-center text-lg font-bold text-brand-ink">
          {qualified ? dict.results.qualified.checklistHeading : dict.results.notQualified.checklistHeading}
        </h4>
        <Checklist content={checklist} downloadLabel={dict.results.downloadPdf} downloadHref={pdfHref} />
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
