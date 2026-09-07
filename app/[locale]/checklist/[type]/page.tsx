import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/config";
import Checklist from "@/components/Checklist";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  // The checklist titles are written for the page ("Move-Out Checklist for
  // Your Barcelona Apartment"); with the brand suffix that ran to 67
  // characters, well past what Google renders. metaTitle is the short cut
  // where a locale has authored one.
  return {
    title: `${content.metaTitle ?? content.title}${dict.meta.titleSuffix}`,
    description: content.metaDescription ?? content.intro,
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
    // Reading page — narrower measure than the marketing sections, since
    // this is a long list of items rather than a magazine spread.
    <main className="pb-16 sm:pb-24">
      <Breadcrumbs locale={locale} items={[{ label: content.title }]} narrow />

      <div className="container-page max-w-3xl pt-10">
        <div>
          <Checklist content={content} downloadLabel={dict.results.downloadPdf} downloadHref={pdfHref} />

          {/* The page's single accent card — the booking offer is the one
              action worth punctuating here. */}
          <div className="card-peach mt-16">
            <h2 className="font-display text-heading-sm text-sienna">{dict.results.qualified.bookingHeading}</h2>
            <p className="mt-3 max-w-xl text-caption text-sienna/80">{dict.results.qualified.bookingBody}</p>
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
          </div>
        </div>
      </div>
    </main>
  );
}
