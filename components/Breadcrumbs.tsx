import Link from "next/link";
import { SITE_URL } from "@/lib/config";
import type { Locale } from "@/lib/i18n/types";

export type Crumb = {
  label: string;
  /** Path WITHOUT the locale prefix ("/glossary"). Omitted on the last crumb. */
  href?: string;
};

type Props = {
  locale: Locale;
  /** Everything after Home, in order. The current page is the last entry and carries no href. */
  items: Crumb[];
  /**
   * Align the trail to a 3xl reading measure instead of the full page
   * container — for the long-form pages (legal documents, checklists,
   * articles) whose body text sits on that narrower measure. The sticky
   * band itself always spans the viewport; only the text inside moves.
   */
  narrow?: boolean;
  /** Extra classes on the sticky wrapper — usually vertical rhythm. */
  className?: string;
};

const HOME_LABEL: Record<Locale, string> = {
  en: "Home",
  es: "Inicio",
  ru: "Главная",
};

/**
 * Breadcrumb trail — one quiet line pinned directly under the header, plus
 * the BreadcrumbList markup Google uses to replace the raw URL in a result
 * with a readable path.
 *
 * Sticky at `top-20`, which is exactly the header's height (h-20), so the
 * two read as one bar: the trail stays visible the whole way down a long
 * page instead of scrolling away in the first swipe. Same Paper-with-blur
 * treatment as the header for the same reason — content passing underneath
 * stays faintly visible rather than disappearing behind an opaque strip.
 *
 * z-40, not z-50: the header owns the top of the stack, and its mobile menu
 * panel has to open OVER this bar. The panel is a child of the z-50 header,
 * so it wins regardless of its own z-index.
 *
 * Deliberately the lightest element on the page: meta-size type in Ash, a
 * slash separator, no chrome. It exists to say where the page sits in the
 * site (the flat /[locale]/[pain] URLs don't say it on their own) and to
 * give every page an in-content link back up its own branch — until now the
 * only internal links on most pages came from the header and footer.
 *
 * Home is prepended automatically; pass everything after it. The last item
 * is the current page and renders as plain text, not a link.
 */
export default function Breadcrumbs({ locale, items, narrow = false, className = "" }: Props) {
  const trail: Crumb[] = [{ label: HOME_LABEL[locale], href: "" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      // The last crumb intentionally has no `item` — it's the current page,
      // and Google's own guidance is to leave the final URL off.
      ...(crumb.href === undefined ? {} : { item: `${SITE_URL}/${locale}${crumb.href}` }),
    })),
  };

  return (
    <div className={`sticky top-20 z-40 bg-paper/80 backdrop-blur-md ${className}`.trim()}>
      <nav aria-label="Breadcrumb" className={`container-page py-3 ${narrow ? "max-w-3xl" : ""}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-ash">
          {trail.map((crumb, i) => (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden className="text-hairline">
                  /
                </span>
              )}
              {crumb.href === undefined ? (
                <span aria-current="page" className="truncate text-slate">
                  {crumb.label}
                </span>
              ) : (
                <Link href={`/${locale}${crumb.href}`} className="transition-colors hover:text-ink">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
