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
