import Link from "next/link";
import type { Dictionary, Locale } from "@/lib/i18n/types";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export default function Header({ locale, dict }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-brand-background/60 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}/deposit`} className="text-lg font-bold tracking-tight text-brand-ink">
          Move<span className="text-brand-primary">OS</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} languageNames={dict.languageNames} />
          <a
            href="#quiz"
            className="hidden rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary-dark sm:inline-flex"
          >
            {dict.nav.bookButton}
          </a>
        </div>
      </div>
    </header>
  );
}
