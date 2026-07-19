import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-brand-background/60 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand-ink">
          Move<span className="text-brand-primary">OS</span>
        </Link>
        <a
          href="#book"
          className="hidden rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primary-dark sm:inline-flex"
        >
          Book Free Review
        </a>
      </div>
    </header>
  );
}
