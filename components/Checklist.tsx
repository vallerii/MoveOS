import { ChevronDownIcon } from "./icons";
import type { ChecklistContent } from "@/lib/i18n/types";

type Props = {
  content: ChecklistContent;
  downloadLabel: string;
  downloadHref: string;
};

export default function Checklist({ content, downloadLabel, downloadHref }: Props) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-4 sm:p-8">
      <h3 className="text-card-title text-brand-ink">{content.title}</h3>
      <p className="mt-3 text-body text-brand-ink/70">{content.intro}</p>

      <div className="mt-6 divide-y divide-black/5">
        {content.sections.map((section) => (
          <details key={section.heading} className="group py-4 first:pt-0 last:pb-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-brand-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{section.heading}</span>
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-brand-ink/40 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <ul className="mt-3 space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-brand-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <p className="mt-6 text-xs text-brand-ink/40">{content.disclaimer}</p>

      <a
        href={downloadHref}
        download
        className="btn-primary mt-6 inline-flex w-full justify-center sm:w-auto"
      >
        {downloadLabel}
      </a>
    </div>
  );
}
