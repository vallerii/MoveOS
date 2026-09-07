import { ChevronDownIcon } from "./icons";
import PillButton from "./PillButton";
import type { ChecklistContent } from "@/lib/i18n/types";

type Props = {
  content: ChecklistContent;
  downloadLabel: string;
  downloadHref: string;
};

/**
 * Expandable checklist. Sections are hairline-divided disclosure rows and
 * items are plain type against a small ink bullet — no tinted markers, no
 * card-per-item, no borders around the whole thing beyond the single rule
 * that separates the intro from the list.
 */
export default function Checklist({ content, downloadLabel, downloadHref }: Props) {
  return (
    <div>
      {/* The checklist page's H1. It used to be an h3, which left
          /[locale]/checklist/* as the only pages on the site with no h1 at
          all — the section headings below start at h2 for the same reason:
          this list is the page's outline, so it should read as one. */}
      <h1 className="font-display text-heading text-ink">{content.title}</h1>
      <p className="mt-6 max-w-2xl text-body text-slate">{content.intro}</p>

      <div className="mt-12 border-t border-hairline">
        {content.sections.map((section) => (
          <details key={section.heading} className="group border-b border-hairline py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-heading-sm text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <h2 className="font-display text-heading-sm font-normal">{section.heading}</h2>
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-ash transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <ul className="mt-5 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3 text-caption text-slate">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ash" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-meta text-ash">{content.disclaimer}</p>

      <PillButton href={downloadHref} download className="mt-10">
        {downloadLabel}
      </PillButton>
    </div>
  );
}
