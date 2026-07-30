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
  pains: Record<
    PainSlug,
    {
      img: string;
      eyebrow: string;
      h1: string;
      subheading: string;
      // Three result-oriented badges shown under the hero, specific to
      // this pain's outcome for the tenant (e.g. deposit back, penalty
      // avoided). Order maps 1:1 to badgeIcons[pain] in Hero.tsx.
      badges: [string, string, string];
      // Dedicated short copy for <title>/<meta description> — h1/subheading
      // are written for the hero (long, persuasive); search snippets need
      // their own copy that fits Google's display budget (~60/~155 chars).
      metaTitle: string;
      metaDescription: string;
      heroCta: string;
      // Optional — shorter CTA copy for narrow screens, where the full
      // heroCta can wrap or crowd the pill button. Falls back to heroCta.
      heroCtaMobile?: string;
      shortLabel: string;
      // Optional — only populated for pains that need to explain their
      // mechanism explicitly (e.g. buyout, where "up to 2000€" needs
      // context for it not to read as a bare hook).
      howItWorks?: {
        heading: string;
        subheading: string;
        // Optional — short line shown directly under the heading (used by
        // RepairShowcase's intro; buyout's HowItWorks doesn't render it).
        intro?: string;
        steps: {
          title: string;
          body: string;
          // Optional — short checkmark line under the card (why this specific
          // repair matters). Only populated for repair; ignored by the plain
          // HowItWorks timeline (buyout).
          highlight?: string;
        }[];
      };
    }
  >;
  whatYouGet: {
    heading: string;
    subheading: string;
    items: { badge: string; title: string; pains: PainSlug[] }[];
    resultLabel: string;
    // Per-pain "Result" line shown in the standout card at the end of the
    // mistakes grid — was a single shared string before, which meant the
    // exact same sentence repeated verbatim across all 6 landing pages.
    resultText: Record<PainSlug, string>;
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
    // Homepage-only step — the site doesn't know the visitor's pain up
    // front (unlike a /deposit or /repair landing page, where it's implied
    // by the URL), so it's asked directly. The answer picks which
    // `topic` question below gets shown next.
    painIntro: {
      question: string;
    };
    // Per-pain follow-up question, specific to that pain's topic (e.g.
    // before/after photos for repair, notice period for urgent) — this is
    // what makes quiz step 2/3 actually differ by page instead of being
    // the same two generic questions everywhere.
    topic: Record<PainSlug, { question: string; options: string[] }>;
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
    viewChecklistButton: string;
    // Short lead-in before the checklist link — same "Or ..." style as
    // qualified.emailAltText, used to replace what used to be a full
    // separate card (heading + intro paragraph + two buttons) with one
    // compact line.
    checklistAltText: string;
  };
  checklist: {
    generic: ChecklistContent;
    qualified: ChecklistContent;
  };
  checklistPage: {
    backLink: string;
  };
  privacy: {
    title: string;
    intro: string;
    items: string[];
  };
}
