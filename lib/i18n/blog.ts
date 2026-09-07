import type { Locale } from "./types";

/**
 * Copy for the guides section: the hub at /[locale]/blog and the few shared
 * strings the article page needs (see app/[locale]/blog/[slug]/page.tsx).
 *
 * The articles themselves live in DatoCMS — this file only holds the frame
 * around them. Until now there was no frame at all: /[locale]/blog answered
 * 404 and articles were reachable only from three cards on the homepage,
 * which left them effectively orphaned for both readers and crawlers.
 *
 * English only for now (see LOCALES in ./types.ts).
 */
export interface BlogCopy {
  hub: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    /** Shown when DatoCMS returns nothing (unreachable, or no articles yet). */
    emptyState: string;
    readMore: string;
  };
  article: {
    /** Breadcrumb label for the section — also the "back" target. */
    sectionLabel: string;
    readNextHeading: string;
    glossaryLink: string;
    allGuidesLink: string;
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
  };
}

const en: BlogCopy = {
  hub: {
    metaTitle: "Guides to Moving Out in Barcelona",
    metaDescription:
      "Practical guides for renters and owners in Barcelona: deposits, paperwork, repairs, leaving early and what the law actually says.",
    eyebrow: "Guides",
    h1: "Guides to renting and moving out in Barcelona",
    intro:
      "What we get asked on the free calls, written down: what to do before you hand back the keys, which rules actually apply, and where people lose money without realising.",
    emptyState: "New guides are on the way. In the meantime, the checklists and the glossary cover the essentials.",
    readMore: "Read the guide",
  },
  article: {
    sectionLabel: "Guides",
    readNextHeading: "Keep reading",
    glossaryLink: "Glossary: renting in Spain, term by term",
    allGuidesLink: "All guides",
    ctaHeading: "Questions about your own move-out?",
    ctaBody: "Fifteen minutes, free, no obligation — we'll tell you what to do next in your situation.",
    ctaButton: "Book a free call",
  },
};

const BLOG_COPY: Partial<Record<Locale, BlogCopy>> = { en };

export function getBlogCopy(locale: Locale): BlogCopy {
  return BLOG_COPY[locale] ?? en;
}
