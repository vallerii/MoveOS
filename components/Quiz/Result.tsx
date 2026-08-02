import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/config";
import PillButton from "../PillButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
  qualified: boolean;
  onRestart: () => void;
};

/**
 * Quiz outcome. Two stacked blocks — the booking offer (qualified visitors
 * only) and the checklist, which everyone gets.
 *
 * The booking block is the moment worth accenting, so when it renders it
 * takes the peach card; the quiz sits inside a white artifact, which is a
 * valid surface beneath it. The checklist block below stays Mist so the two
 * don't compete. Each block gets the filled + ghost pill pair.
 */
export default function Result({ locale, dict, qualified, onRestart }: Props) {
  const checklistType = qualified ? "qualified" : "generic";
  const checklist = dict.checklist[checklistType];
  const pdfHref = `/checklists/${locale}/${checklistType}.pdf`;

  return (
    <div className="mx-auto max-w-2xl">
      {qualified ? (
        // Offered the call, so the call is the whole answer. The checklist
        // used to follow as a second full card, which made the result screen
        // twice as tall and gave the visitor a competing action right under
        // the one we actually want. It's still here, just demoted to an
        // aside in the same voice as the email line above it.
        <div className="card-peach">
          <h4 className="font-display text-heading-sm text-sienna">{dict.results.qualified.bookingHeading}</h4>
          <p className="mt-3 text-caption text-sienna/80">{dict.results.qualified.bookingBody}</p>
          <div className="mt-8">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-full bg-sienna px-6 py-3.5 text-base text-peach transition-opacity hover:opacity-90"
            >
              {dict.results.qualified.bookingButton}
            </a>
          </div>
          <p className="mt-6 text-meta text-sienna/70">
            {dict.results.qualified.emailAltText}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-2 text-meta text-sienna/70">
            {dict.results.checklistAltText}{" "}
            <Link href={`/${locale}/checklist/${checklistType}`} className="underline underline-offset-4">
              {dict.results.viewChecklistButton}
            </Link>{" "}
            ·{" "}
            <a href={pdfHref} download className="underline underline-offset-4">
              {dict.results.downloadPdf}
            </a>
          </p>
        </div>
      ) : (
        // Not offered the call — the checklist is the only thing on the
        // screen, so it keeps its card and its buttons.
        <div className="card-neutral">
          <h4 className="font-display text-heading-sm text-ink">
            {dict.results.notQualified.checklistHeading}
          </h4>
          <p className="mt-3 text-caption text-slate">{checklist.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PillButton href={pdfHref} download className="w-full sm:w-auto">
              {dict.results.downloadPdf}
            </PillButton>
            <PillButton
              href={`/${locale}/checklist/${checklistType}`}
              internal
              variant="ghost"
              className="w-full sm:w-auto"
            >
              {dict.results.viewChecklistButton}
            </PillButton>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onRestart}
        className="mt-8 text-base text-slate underline-offset-4 transition-colors hover:text-ink hover:underline"
      >
        {dict.results.restartButton}
      </button>
    </div>
  );
}
