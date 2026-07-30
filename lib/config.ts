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
 * WhatsApp contact number, digits only (with country code, no "+" or
 * spaces) — required format for wa.me links. Renters in Barcelona expect
 * WhatsApp/phone as a contact channel alongside email; email-only reads as
 * a stop-factor for an anxious user who's about to hand over documents and
 * their landlord's contact info.
 *
 * Replace NEXT_PUBLIC_CONTACT_WHATSAPP with the real number before
 * launching. NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY is the human-readable
 * version shown in the footer (defaults to a "+"-prefixed version of the
 * digits if not set separately).
 */
export const CONTACT_WHATSAPP = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? "34600000000";
export const CONTACT_WHATSAPP_DISPLAY = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP_DISPLAY ?? `+${CONTACT_WHATSAPP}`;

/**
 * Canonical production origin — used for metadataBase (resolving absolute
 * og:image / canonical / hreflang URLs) and for sitemap.xml / robots.txt.
 * Replace NEXT_PUBLIC_SITE_URL once a custom domain is live.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://move-os-five.vercel.app";
