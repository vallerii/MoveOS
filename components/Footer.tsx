import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-brand-ink/60 sm:flex-row">
        <p>
          Move<span className="font-semibold text-brand-primary">OS</span> — calm, informed
          move-outs in Barcelona.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="hover:text-brand-primary">
            Privacy Policy
          </Link>
          <span>© {new Date().getFullYear()} MoveOS</span>
        </div>
      </div>
    </footer>
  );
}
