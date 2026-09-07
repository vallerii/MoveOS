/**
 * URL for the free 15-minute self-scheduling call.
 *
 * Replace NEXT_PUBLIC_BOOKING_URL in your environment with a real Google
 * Calendar "Appointment schedule" link (Google Calendar → Settings →
 * Appointment schedules → Booking page link) once it exists. Until then this
 * placeholder is used so the site is fully wireable end to end.
 */
export const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendar.google.com/calendar/u/0/appointments/schedules/PLACEHOLDER-REPLACE-ME";

/**
 * Inbox for the "email us your document" flow (lease buyout offer, repair
 * assessment offer). There's no backend or third-party form service wired up
 * to receive file attachments, so these two offers rely on a plain mailto:
 * link — the visitor attaches the file themselves in their own mail client.
 *
 * Replace NEXT_PUBLIC_CONTACT_EMAIL with the real inbox before launching.
 */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@moveos.es";

/**
 * Canonical production origin — used for metadataBase (resolving absolute
 * og:image / canonical / hreflang URLs) and for sitemap.xml / robots.txt.
 * movingo.es is the live custom domain; NEXT_PUBLIC_SITE_URL still overrides
 * it per-environment (preview deploys, staging).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://movingo.es";

/**
 * Phone number shown on the contact page. There is no phone support yet —
 * every real conversation starts from the booking link above — so this is a
 * placeholder until a real line exists. Set NEXT_PUBLIC_CONTACT_PHONE (or
 * delete the phone row from the contact page) before launch.
 */
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+34 600 000 000";

/**
 * Company identity used by the legal pages and the contact page.
 *
 * Spain's LSSI-CE (art. 10) requires a site carrying out commercial activity
 * to publish its provider details — registered name, tax ID (NIF/CIF),
 * registered address, contact channel and, for a company, its Mercantile
 * Registry entry. The GDPR/LOPDGDD privacy policy needs the same identity as
 * the data controller.
 *
 * TODO before launch: every value below is a placeholder. Replace them with
 * the real registered details (or set the matching NEXT_PUBLIC_* variables)
 * and have a Spanish lawyer review the four legal pages — see
 * LEGAL_REVIEW_PENDING in lib/i18n/legal.ts, which prints an in-page notice
 * until that happens.
 */
export const COMPANY = {
  /** Trading name used throughout the site. */
  brand: "Movingo",
  /** Registered company name (razón social). */
  legalName: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Movingo S.L.",
  /** NIF/CIF. */
  taxId: process.env.NEXT_PUBLIC_COMPANY_TAX_ID ?? "B00000000",
  /** Registered address (domicilio social), one line per row. */
  addressLines: (process.env.NEXT_PUBLIC_COMPANY_ADDRESS ?? "Carrer d'Exemple 1, 3-2\n08001 Barcelona\nSpain").split("\n"),
  /** Mercantile Registry entry — required by LSSI-CE art. 10 for an S.L. */
  registry: process.env.NEXT_PUBLIC_COMPANY_REGISTRY ?? "Registro Mercantil de Barcelona, Tomo 0000, Folio 000, Hoja B-000000",
  /** Where the service operates. */
  serviceArea: "Barcelona, Spain",
  /** Shown on the contact page. */
  hours: "Monday to Friday, 10:00–19:00 (CET)",
  responseTime: "We reply to email within one business day.",
} as const;
