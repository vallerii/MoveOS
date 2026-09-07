import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, PAIN_SLUGS, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import { getContactCopy } from "@/lib/i18n/contact";
import { HOST_LOCALES } from "@/lib/i18n/host";
import { HOST_FIRST_TIME_LOCALES } from "@/lib/i18n/hostFirstTime";
import { BOOKING_URL, CONTACT_EMAIL, CONTACT_PHONE, COMPANY } from "@/lib/config";
import { legalHref } from "@/components/LegalDocument";
import PillButton from "@/components/PillButton";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const copy = getContactCopy(locale);
  const path = `/${locale}/contact`;

  return {
    title: `${copy.meta.title}${dict.meta.titleSuffix}`,
    description: copy.meta.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/contact`])),
        "x-default": `/${DEFAULT_LOCALE}/contact`,
      },
    },
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      type: "website",
      url: path,
      images: ["/og-image.png"],
    },
  };
}

/** One hairline-divided detail row — label left, value right on wide screens. */
function DetailRow({
  label,
  children,
  note,
}: {
  label: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="border-b border-hairline py-5 sm:flex sm:items-baseline sm:gap-8">
      <p className="tag sm:w-40 sm:shrink-0">{label}</p>
      <div className="mt-1 sm:mt-0">
        <div className="text-caption text-ink">{children}</div>
        {note && <p className="mt-1 text-meta text-ash">{note}</p>}
      </div>
    </div>
  );
}

/**
 * Contact page — no form. Every real conversation on this site starts from
 * the booking link (see QuizSection, which every other page closes on), so
 * this page carries the same single ask plus the details a visitor looks for
 * when they'd rather write than book: the inbox, the area we cover, the
 * hours, and a pointer to the registered company details on the legal notice.
 *
 * The closing block borrows the homepage's situation-picker idea in its
 * simplest form — plain links to the six pain pages and the two owner pages —
 * so someone who landed here by accident leaves with the page that actually
 * matches their problem instead of a dead end.
 *
 * NOTE on the details themselves: email, phone and company identity are the
 * placeholders in lib/config.ts, shared with the legal pages. Replace them
 * there (or via the NEXT_PUBLIC_* variables) and both update together.
 */
export default function ContactPage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const copy = getContactCopy(locale);

  const ownerLinks = [
    ...(HOST_LOCALES.includes(locale)
      ? [{ href: `/${locale}/host`, label: locale === "ru" ? "Посуточная сдача" : "Short-Term Rental" }]
      : []),
    ...(HOST_FIRST_TIME_LOCALES.includes(locale)
      ? [{ href: `/${locale}/host/first-time`, label: locale === "ru" ? "Первая сдача" : "First-Time Landlord" }]
      : []),
  ];

  return (
    <main>
      <section className="container-page py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="tag">{copy.eyebrow}</p>
          <h1 className="mt-4 font-display text-heading-lg text-ink">{copy.h1}</h1>
          <p className="mt-6 text-body text-slate">{copy.intro}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 lg:grid-cols-5">
          {/* The ask. Same booking destination as every other page's closing
              card — this page just states it earlier. */}
          <Reveal className="lg:col-span-2">
            <div className="card-neutral flex h-full flex-col justify-center">
              <h2 className="font-display text-heading-sm text-ink">{copy.booking.heading}</h2>
              <p className="mt-4 text-caption text-slate">{copy.booking.body}</p>
              <div className="mt-8">
                <PillButton
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  {copy.booking.button}
                </PillButton>
              </div>
              <p className="mt-5 text-meta text-ash">{copy.booking.note}</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-3">
            <div className="card-neutral h-full">
              <h2 className="font-display text-heading-sm text-ink">{copy.details.heading}</h2>
              <div className="mt-6 border-t border-hairline">
                <DetailRow label={copy.details.emailLabel} note={copy.details.emailNote}>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="underline underline-offset-4 transition-colors hover:text-slate"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </DetailRow>
                <DetailRow label={copy.details.phoneLabel} note={copy.details.phoneNote}>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                    className="underline underline-offset-4 transition-colors hover:text-slate"
                  >
                    {CONTACT_PHONE}
                  </a>
                </DetailRow>
                <DetailRow label={copy.details.areaLabel}>{COMPANY.serviceArea}</DetailRow>
                <DetailRow label={copy.details.hoursLabel} note={COMPANY.responseTime}>
                  {COMPANY.hours}
                </DetailRow>
                <DetailRow label={copy.details.companyLabel} note={copy.details.companyNote}>
                  <span className="block">{COMPANY.legalName}</span>
                  <Link
                    href={legalHref(locale, "legal-notice")}
                    className="mt-1 inline-block underline underline-offset-4 transition-colors hover:text-slate"
                  >
                    {copy.details.companyLink}
                  </Link>
                </DetailRow>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map — a plain embed, no API key and no tracking script of our own.
          Loaded lazily so it never blocks the details above it. */}
      <section className="container-page pb-20 sm:pb-28">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-heading-sm text-ink">{copy.map.heading}</h2>
            <p className="mt-4 max-w-2xl text-caption text-slate">{copy.map.body}</p>
            <div className="mt-8 overflow-hidden rounded-card bg-mist">
              <iframe
                title={copy.map.frameTitle}
                src="https://www.google.com/maps?q=Barcelona%2C%20Spain&z=12&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full border-0 sm:h-[420px]"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Closing links — the homepage's situation picker, reduced to type. */}
      <section className="border-t border-hairline bg-fog py-20 sm:py-section">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-heading text-ink">{copy.next.heading}</h2>
            <p className="mt-4 max-w-2xl text-caption text-slate">{copy.next.subheading}</p>

            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="tag">{copy.next.tenantsLabel}</p>
                <nav className="mt-5 flex flex-col gap-3">
                  {PAIN_SLUGS.map((slug) => (
                    <Link
                      key={slug}
                      href={`/${locale}/${slug}`}
                      className="text-caption text-slate transition-colors hover:text-ink"
                    >
                      {dict.pains[slug].shortLabel}
                    </Link>
                  ))}
                </nav>
              </div>

              {ownerLinks.length > 0 && (
                <div>
                  <p className="tag">{copy.next.ownersLabel}</p>
                  <nav className="mt-5 flex flex-col gap-3">
                    {ownerLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-caption text-slate transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              <div>
                <p className="tag">{copy.next.checklistsLabel}</p>
                <nav className="mt-5 flex flex-col gap-3">
                  <Link
                    href={`/${locale}/checklist/qualified`}
                    className="text-caption text-slate transition-colors hover:text-ink"
                  >
                    {dict.checklist.qualified.title}
                  </Link>
                  <Link
                    href={`/${locale}/checklist/generic`}
                    className="text-caption text-slate transition-colors hover:text-ink"
                  >
                    {dict.checklist.generic.title}
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
