import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import { PAIN_SLUGS } from "@/lib/i18n/types";

type Props = {
  locale: Locale;
  dict: Dictionary;
  currentPain?: string;
};

export default function Footer({ locale, dict, currentPain }: Props) {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="container-page">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b border-black/5 pb-6 text-sm">
          {PAIN_SLUGS.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/${slug}`}
              aria-current={slug === currentPain ? "page" : undefined}
              className={
                slug === currentPain
                  ? "font-semibold text-brand-primary"
                  : "text-brand-ink/60 hover:text-brand-primary"
              }
            >
              {dict.pains[slug].shortLabel}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-sm text-brand-ink/60 sm:flex-row">
          <p>{dict.footer.tagline}</p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy`} className="hover:text-brand-primary">
              {dict.footer.privacy}
            </Link>
            <span>© {new Date().getFullYear()} MoveOS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
