import type { ChecklistContent } from "@/lib/i18n/types";

type Props = {
  content: ChecklistContent;
  downloadLabel: string;
  downloadHref: string;
};

export default function Checklist({ content, downloadLabel, downloadHref }: Props) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
      <h3 className="text-xl font-bold text-brand-ink sm:text-2xl">{content.title}</h3>
      <p className="mt-3 text-brand-ink/70">{content.intro}</p>

      <div className="mt-6 space-y-6">
        {content.sections.map((section) => (
          <div key={section.heading}>
            <h4 className="font-semibold text-brand-ink">{section.heading}</h4>
            <ul className="mt-2 space-y-1.5">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-brand-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
