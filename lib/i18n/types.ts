export type Locale = "en" | "es" | "ru";

export const LOCALES: Locale[] = ["en", "es", "ru"];
export const DEFAULT_LOCALE: Locale = "ru";

export type PainSlug = "deposit" | "admin" | "belongings" | "urgent";

export const PAIN_SLUGS: PainSlug[] = ["deposit", "admin", "belongings", "urgent"];

export interface ChecklistSection {
  heading: string;
  items: string[];
}

export interface ChecklistContent {
  title: string;
  intro: string;
  sections: ChecklistSection[];
  disclaimer: string;
}

export interface Dictionary {
  meta: {
    titleSuffix: string;
  };
  languageNames: Record<Locale, string>;
  nav: {
    bookButton: string;
  };
  heroTrustBadges: [string, string, string, string];
  pains: Record<
    PainSlug,
    {
      eyebrow: string;
      h1: string;
      subheading: string;
      heroCta: string;
      shortLabel: string;
    }
  >;
  whatYouGet: {
    heading: string;
    subheading: string;
    items: { badge: string; title: string; pains: PainSlug[] }[];
    resultLabel: string;
    resultText: string;
  };
  whyTrustUs: {
    heading: string;
    p1: string;
    p2: string;
    cards: { emoji: string; title: string; body: string; span?: boolean; featured?: boolean }[];
  };
  didYouKnow: {
    heading: string;
    subheading: string;
    facts: { q: string; a: string }[];
  };
  ourPromise: {
    h2: string;
    p1: string;
    p2: string;
  };
  quizIntro: {
    heading: string;
    subheading: string;
  };
  footer: {
    tagline: string;
    privacy: string;
  };
  quiz: {
    progressLabel: string; // use {n} and {total} placeholders
    backButton: string;
    city: {
      question: string;
      barcelona: string;
      other: string;
    };
    timeframe: {
      question: string;
      already: string;
      lt1m: string;
      m1to3: string;
      later: string;
    };
    pain: {
      question: string;
      deposit: string;
      admin: string;
      belongings: string;
      urgent: string;
      other: string;
    };
    contact: {
      heading: string;
      namePlaceholder: string;
      phonePlaceholder: string;
      consent: string;
      submitButton: string;
      submitting: string;
      error: string;
    };
  };
  results: {
    qualified: {
      badge: string;
      heading: string;
      body: string;
      bookingHeading: string;
      bookingBody: string;
      bookingButton: string;
      checklistHeading: string;
    };
    notQualified: {
      badge: string;
      heading: string;
      body: string;
      checklistHeading: string;
    };
    downloadPdf: string;
    restartButton: string;
  };
  checklist: {
    generic: ChecklistContent;
    qualified: ChecklistContent;
  };
  privacy: {
    title: string;
    intro: string;
    items: string[];
  };
}
