import Link from "next/link";
import {
  LEGAL_DOC_SLUGS,
  LEGAL_REVIEW_PENDING,
  getLegalCopy,
  type LegalDocSlug,
} from "@/lib/i18n/legal";
import type { Locale } from "@/lib/i18n/types";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  locale: Locale;
  slug: LegalDocSlug;
};

/** Every legal document lives at /[locale]/[its own slug]. */
export function legalHref(locale: Locale, slug: LegalDocSlug): string {
  return `/${locale}/${slug}`;
}

/**
 * Shared renderer for the four legal pages (see lib/i18n/legal.ts). They are
 * long, plain, read-once documents, so this deliberately reuses the quietest
 * parts of the system rather than inventing chrome for them: one measure
 * (max-w-3xl), serif display heading, hairline-divided list rows — the same
 * treatment the privacy page has always used and the same rows used for
 * steps and checklist items elsewhere.
 *
 * One component with four thin routes instead of four hand-built pages: the
 * documents cross-link to each other at the foot, and a fifth document is
 * then a copy entry plus a six-line route file.
 */
export default function LegalDocument({ locale, slug }: Props) {
  const copy = getLegalCopy(locale);
  const doc = copy.docs[slug];
  const others = LEGAL_DOC_SLUGS.filter((s) => s !== slug);

  return (
    <main className="pb-24 sm:pb-32">
      <Breadcrumbs locale={locale} items={[{ label: doc.navLabel }]} narrow />

      <article className="container-page mx-auto max-w-3xl pt-12 sm:pt-16">
        <h1 className="font-display text-heading-lg text-ink">{doc.title}</h1>
        <p className="mt-4 text-meta text-ash">
          {copy.lastUpdatedLabel}:{" "}
          <time dateTime={copy.lastUpdated}>{copy.lastUpdated}</time>
        </p>
        <p className="mt-8 text-body text-slate">{doc.intro}</p>

        {doc.sections.map((section) => (
          <section key={section.heading} className="mt-14">
            <h2 className="font-display text-heading-sm text-ink">{section.heading}</h2>

            {section.body?.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-caption text-slate">
                {paragraph}
              </p>
            ))}

            {section.items && (
              <ul className="mt-6 border-t border-hairline">
                {section.items.map((item) => (
                  <li key={item} className="border-b border-hairline py-4 text-caption text-slate">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* The cookie inventory is the one table in the system. It scrolls
                inside its own container rather than shrinking the type — a
                five-column table cannot fit a phone at a readable size. */}
            {section.table && (
              <div className="mt-6 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[42rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-hairline">
                      {section.table.headers.map((header) => (
                        <th key={header} className="py-3 pr-6 align-bottom text-meta font-normal text-ash">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row) => (
                      <tr key={row.join("|")} className="border-b border-hairline align-top">
                        {row.map((cell, i) => (
                          <td
                            key={cell}
                            className={`py-4 pr-6 text-meta ${i === 0 ? "text-ink" : "text-slate"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}

        <div className="mt-16 border-t border-hairline pt-8">
          <p className="tag">{copy.relatedHeading}</p>
          <nav className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {others.map((s) => (
              <Link
                key={s}
                href={legalHref(locale, s)}
                className="text-caption text-slate underline underline-offset-4 transition-colors hover:text-ink"
              >
                {copy.docs[s].navLabel}
              </Link>
            ))}
          </nav>
        </div>

        {/* Removed by flipping LEGAL_REVIEW_PENDING in lib/i18n/legal.ts once
            the real company details are in and a lawyer has signed off. */}
        {LEGAL_REVIEW_PENDING && (
          <p className="mt-10 rounded-card-sm bg-mist p-5 text-meta text-ash">{copy.draftNotice}</p>
        )}
      </article>
    </main>
  );
}
