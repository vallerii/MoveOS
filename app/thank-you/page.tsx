import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Booked | MoveOS",
};

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-6 py-24 text-center">
      <span className="eyebrow">Request received</span>
      <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-brand-ink sm:text-5xl">
        You&apos;re booked in.
      </h1>
      <p className="mt-4 max-w-md text-lg text-brand-ink/70">
        We&apos;ll call you within one business day to schedule your free 15-minute Move-Out
        Review. Keep your phone handy.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </main>
  );
}
