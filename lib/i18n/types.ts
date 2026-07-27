export type Locale = "en" | "es" | "ru";

export const LOCALES: Locale[] = ["en", "es", "ru"];
export const DEFAULT_LOCALE: Locale = "ru";

export type PainSlug = "deposit" | "admin" | "belongings" | "urgent" | "buyout" | "repair";

export const PAIN_SLUGS: PainSlug[] = ["deposit", "admin", "belongings", "urgent", "buyout", "repair"];

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
  heroTrustBadges: [string, string, string, string, string];
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
  didYouKnow: {
    heading: string;
    subheading: string;
    facts: Record<PainSlug, { q: string; a: string }[]>;
  };
  whyUs: {
    eyebrow: string;
    heading: string;
    intro: string;
    body: Record<PainSlug, string>;
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
  };
  results: {
    qualified: {
      badge: string;
      heading: string;
      body: string;
      bookingHeading: string;
      bookingBody: string;
      bookingButton: string;
      emailAltText: string;
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
