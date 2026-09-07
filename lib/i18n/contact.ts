import type { Locale } from "./types";

/**
 * Copy for /[locale]/contact — the one page that says plainly how to reach a
 * human, for visitors who don't want to start with a booking form.
 *
 * Same reasoning as home.ts / host.ts / legal.ts for why this isn't in the
 * shared `Dictionary`: it isn't pain-shaped, and the site currently serves
 * English only (see LOCALES in ./types.ts), so only `en` is populated and
 * getContactCopy falls back to it.
 *
 * The details themselves are NOT in here — they come from lib/config.ts
 * (CONTACT_EMAIL, CONTACT_PHONE, BOOKING_URL, COMPANY), which is also what
 * the legal pages read, so there is one place to swap the placeholders for
 * real details rather than two copies drifting apart.
 */
export interface ContactCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  h1: string;
  intro: string;
  /** The primary ask — there is no contact form, only the booking link. */
  booking: {
    heading: string;
    body: string;
    button: string;
    note: string;
  };
  details: {
    heading: string;
    emailLabel: string;
    emailNote: string;
    phoneLabel: string;
    phoneNote: string;
    areaLabel: string;
    hoursLabel: string;
    companyLabel: string;
    companyNote: string;
    companyLink: string;
  };
  map: {
    heading: string;
    body: string;
    /** Accessible name for the embedded map frame. */
    frameTitle: string;
  };
  /** Reused idea from the homepage's situation picker: send the visitor to
   * the page that actually matches their problem instead of leaving contact
   * as a dead end. */
  next: {
    heading: string;
    subheading: string;
    tenantsLabel: string;
    ownersLabel: string;
    checklistsLabel: string;
  };
}

const en: ContactCopy = {
  meta: {
    title: "Contact Movingo",
    description:
      "Talk to Movingo about your move-out in Barcelona: book a free 15-minute call, or email us. Contact details, hours and where we work.",
  },
  eyebrow: "Contact",
  h1: "Talk to a human about your move-out",
  intro:
    "We work with tenants moving out of a rented home in Barcelona, and with owners renting one out. The fastest way to get an answer is the free 15-minute call — bring your lease and your move-in report if you have them.",
  booking: {
    heading: "Book a free 15-minute call",
    body:
      "Pick a slot that suits you. We will go through your situation, tell you what to do before you hand back the keys, and be honest if you don't need us at all.",
    button: "Choose a time",
    note: "Free, no obligation. Prefer writing? Email us — we read everything.",
  },
  details: {
    heading: "Details",
    emailLabel: "Email",
    emailNote: "Documents welcome — lease, move-in report, photos.",
    phoneLabel: "Phone",
    phoneNote: "Calls are handled through the booking link above.",
    areaLabel: "Where we work",
    hoursLabel: "Hours",
    companyLabel: "Company",
    companyNote: "Tax ID, registered address and registry entry are on our legal notice.",
    companyLink: "Legal Notice",
  },
  map: {
    heading: "Where we are",
    body:
      "We are based in Barcelona and work across the city and its metropolitan area. Visits are by appointment — book a call first and we'll arrange one if your situation needs it.",
    frameTitle: "Map of Barcelona",
  },
  next: {
    heading: "Not sure who to ask for?",
    subheading: "Start from the situation that sounds like yours — each page explains what we actually do about it.",
    tenantsLabel: "For tenants",
    ownersLabel: "For owners",
    checklistsLabel: "Free checklists",
  },
};

const CONTACT_COPY: Partial<Record<Locale, ContactCopy>> = { en };

export function getContactCopy(locale: Locale): ContactCopy {
  return CONTACT_COPY[locale] ?? en;
}
