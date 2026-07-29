import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/config";
import Checklist from "@/components/Checklist";

type ChecklistType = "qualified" | "generic";
const CHECKLIST_TYPES: ChecklistType[] = ["qualified", "generic"];

type Params = { locale: string; type: string };

function isValid(params: Params): params is { locale: Locale; type: ChecklistType } {
  return LOCALES.includes(params.locale as Locale) && CHECKLIST_TYPES.includes(params.type as ChecklistType);
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => CHECKLIST_TYPES.map((type) => ({ locale, type })));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (!isValid(params)) return {};
  const { locale, type } = params;
  const dict = getDictionary(locale);
  const content = dict.checklist[type];
  const path = `/${locale}/checklist/${type}`;
  return {
    title: `${content.title}${dict.meta.titleSuffix}`,
    description: content.intro,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/checklist/${type}`])),
        "x-default": `/${DEFAULT_LOCALE}/checklist/${type}`,
      },
    },
    openGraph: { title: content.title, description: content.intro, type: "website", url: path },
  };
}

export default function ChecklistPage({ params }: { params: Params }) {
  if (!isValid(params)) notFound();
  const { locale, type } = params;
  const dict = getDictionary(locale);
  const content = dict.checklist[type];
  const pdfHref = `/checklists/${locale}/${type}.pdf`;

  return (
    <main className="container-page py-16 sm:py-24">
      <Link href={`/${locale}`} className="text-sm font-semibold text-brand-primary hover:underline">
        {dict.checklistPage.backLink}
      </Link>
      <div className="mt-6">
        <Checklist content={content} downloadLabel={dict.results.downloadPdf} downloadHref={pdfHref} />

        <div className="mt-8 rounded-2xl border border-brand-primary/30 bg-brand-primary/5 p-4 text-center sm:p-8">
          <h4 className="text-card-title text-brand-ink">{dict.results.qualified.bookingHeading}</h4>
          <p className="mt-2 text-small text-brand-ink/70">{dict.results.qualified.bookingBody}</p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 w-full sm:w-auto"
          >
            {dict.results.qualified.bookingButton}
          </a>
          <p className="mt-4 text-sm text-brand-ink/60">
            {dict.results.qualified.emailAltText}{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-primary hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
