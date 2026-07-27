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
