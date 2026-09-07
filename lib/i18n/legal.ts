import type { Metadata } from "next";
import { COMPANY, CONTACT_EMAIL, SITE_URL } from "../config";
import { getDictionary } from "./index";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./types";

/**
 * Copy for the four legal pages the site needs to run paid traffic in Spain:
 *
 *   /[locale]/legal-notice — Aviso Legal. Required by art. 10 of Spain's
 *      LSSI-CE (Ley 34/2002) for any site carrying out commercial activity:
 *      it must publish who is behind the site, their tax ID, address and
 *      registry entry.
 *   /[locale]/privacy      — GDPR (EU 2016/679) + LOPDGDD (LO 3/2018)
 *      privacy policy. Meta also requires a reachable privacy policy for any
 *      ad that collects personal data.
 *   /[locale]/cookies      — cookie policy, required by art. 22.2 LSSI-CE
 *      because the site loads the Meta Pixel (see components/MetaPixel.tsx).
 *   /[locale]/terms        — terms of service: what the free consultation is
 *      and, just as importantly, what it is not (we are not a law firm and
 *      this is not legal advice — the pain pages talk about LAU articles and
 *      INCASÒL claims, so that boundary has to be written down).
 *
 * Kept in its own module rather than in the shared `Dictionary` (lib/i18n/
 * types.ts) for the same reason as home.ts / host.ts: these pages aren't
 * pain-shaped, and widening Dictionary would mean writing legal text in
 * three languages for a site that currently serves one.
 *
 * The site is English-only (see LOCALES in ./types.ts), so only `en` is
 * populated; getLegalCopy falls back to it for any other locale. NOTE for
 * whoever re-enables Spanish: a Spanish-facing business is normally expected
 * to publish these in Spanish, so /es needs a real translation, not a
 * machine one.
 */

export type LegalDocSlug = "legal-notice" | "privacy" | "cookies" | "terms";

/** Order used by the footer's legal row and by sitemap.ts. */
export const LEGAL_DOC_SLUGS: LegalDocSlug[] = ["legal-notice", "privacy", "cookies", "terms"];

export interface LegalSection {
  heading: string;
  /** Paragraphs. */
  body?: string[];
  /** Hairline-divided list rows, rendered after `body`. */
  items?: string[];
  /** Only used by the cookie inventory. */
  table?: { headers: string[]; rows: string[][] };
}

export interface LegalDoc {
  /** Short label for the footer and cross-links between the documents. */
  navLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: LegalSection[];
}

export interface LegalCopy {
  lastUpdatedLabel: string;
  /** ISO date — rendered as-is, and used for <time dateTime>. */
  lastUpdated: string;
  /** Shown while LEGAL_REVIEW_PENDING is true (see below). */
  draftNotice: string;
  relatedHeading: string;
  docs: Record<LegalDocSlug, LegalDoc>;
}

/**
 * These four documents were drafted against the standard Spanish
 * requirements, but they have NOT been reviewed by a lawyer and the company
 * details they cite are still the placeholders in lib/config.ts. While this
 * is true, each page prints `draftNotice` at the bottom. Flip it to false
 * once real details are in place and counsel has signed the texts off.
 */
export const LEGAL_REVIEW_PENDING = true;

const ADDRESS = COMPANY.addressLines.join(", ");

const en: LegalCopy = {
  lastUpdatedLabel: "Last updated",
  lastUpdated: "2026-09-07",
  draftNotice:
    "This document is a working draft prepared for the Movingo launch. It has not yet been reviewed by a qualified Spanish lawyer, and the company details it cites are placeholders. Do not rely on it as legal advice.",
  relatedHeading: "Other legal documents",
  docs: {
    "legal-notice": {
      navLabel: "Legal Notice",
      title: "Legal Notice",
      metaTitle: "Legal Notice",
      metaDescription:
        "Provider details for movingo.es under article 10 of Spain's LSSI-CE: registered name, tax ID, address, registry entry and contact details.",
      intro:
        "This legal notice sets out who operates this website and on what terms you may use it, as required by article 10 of Spanish Law 34/2002 on information society services and electronic commerce (LSSI-CE).",
      sections: [
        {
          heading: "Who runs this website",
          items: [
            `Registered name: ${COMPANY.legalName}`,
            `Tax ID (NIF/CIF): ${COMPANY.taxId}`,
            `Registered address: ${ADDRESS}`,
            `Mercantile Registry: ${COMPANY.registry}`,
            `Email: ${CONTACT_EMAIL}`,
            `Website: ${SITE_URL}`,
            `Area served: ${COMPANY.serviceArea}`,
          ],
        },
        {
          heading: "What this website is for",
          body: [
            "This site presents Movingo's services for tenants moving out of a rented home in Barcelona and for owners renting one out, and lets you book a free introductory call or download our move-out checklists.",
            "It is an informational and lead-generation site. Nothing published here is a binding offer, a valuation, or advice on your particular situation, and no contract is formed by browsing it or by booking a call.",
          ],
        },
        {
          heading: "Using the site",
          body: [
            "By using this site you agree to use it lawfully and in good faith. In particular, you agree not to:",
          ],
          items: [
            "Use the site or its content for any unlawful purpose, or in a way that damages the rights of Movingo or of third parties.",
            "Attempt to gain unauthorised access to the site, its servers or any connected system, or to interfere with its normal operation.",
            "Introduce malicious code, scrape the site at a volume that degrades it, or use automated systems to submit false enquiries.",
            "Reproduce, copy, distribute or transform the site's content outside the limits allowed by law.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The site's design, texts, illustrations, checklists, logos and source code belong to Movingo or are used under licence, and are protected by Spanish and EU intellectual and industrial property law.",
            "You may read and print our checklists for your own personal use. Any other use — republishing, commercial reuse, or reuse as part of another product or service — needs our prior written permission.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We keep the information on this site as accurate and current as we reasonably can, but content published here is general information about moving out in Spain, not advice on your specific tenancy, and outcomes described on the site are illustrative rather than guaranteed.",
            "We are not liable for decisions taken solely on the basis of content published here, nor for interruptions, errors or unavailability of the site, except where Spanish law does not allow that exclusion.",
          ],
        },
        {
          heading: "Links to other sites",
          body: [
            "This site links to third-party services — our booking calendar, mail provider and public sources such as INCASÒL or the AEPD. We do not control those sites and are not responsible for their content or their privacy practices. Following such a link means their terms apply, not ours.",
          ],
        },
        {
          heading: "Personal data and cookies",
          body: [
            "How we handle personal data is set out in our Privacy Policy, and the cookies and similar technologies this site uses are described in our Cookie Policy.",
          ],
        },
        {
          heading: "Applicable law and jurisdiction",
          body: [
            "This legal notice is governed by Spanish law. Any dispute arising from the use of this site will be heard by the courts of Barcelona, except where you use the site as a consumer, in which case the courts with jurisdiction are those provided for by consumer protection law — usually those of your place of residence.",
            "As a consumer you may also use the European Commission's online dispute resolution platform at https://ec.europa.eu/consumers/odr.",
          ],
        },
      ],
    },

    privacy: {
      navLabel: "Privacy Policy",
      title: "Privacy Policy",
      metaTitle: "Privacy Policy",
      metaDescription:
        "How Movingo collects, uses and protects your personal data under the GDPR and Spain's LOPDGDD — what we collect, why, how long we keep it, and your rights.",
      intro:
        "This policy explains what personal data Movingo collects through this website, why we use it, who else sees it, and the rights you have over it under the General Data Protection Regulation (EU 2016/679, GDPR) and Spain's Organic Law 3/2018 (LOPDGDD).",
      sections: [
        {
          heading: "Who is responsible for your data",
          body: [
            "The data controller is the company identified below. You can contact us about anything in this policy, including exercising your rights, at the email address given.",
          ],
          items: [
            `Controller: ${COMPANY.legalName} (${COMPANY.taxId})`,
            `Address: ${ADDRESS}`,
            `Email: ${CONTACT_EMAIL}`,
          ],
        },
        {
          heading: "What we collect",
          body: ["We only ask for what we need to help you with a move-out. Depending on how you use the site, that can include:"],
          items: [
            "Contact details you give us: your name, phone number and email address.",
            "What you tell us about your situation: your city, when you are moving out, which situation applies to you, and anything else you choose to write to us or say on the call.",
            "Documents you choose to send us by email — for example a lease or a move-in report — including any personal data they contain.",
            "Booking data when you schedule a call: the slot you pick and the details our scheduling provider records.",
            "Technical data: IP address, browser and device type, pages visited, and the cookie identifiers described in our Cookie Policy.",
          ],
        },
        {
          heading: "Why we use it, and on what legal basis",
          items: [
            "To answer your enquiry and hold the free consultation — legal basis: steps taken at your request before entering into a contract (art. 6.1.b GDPR).",
            "To provide any service you go on to engage us for — legal basis: performance of that contract (art. 6.1.b GDPR).",
            "To send you the checklist or materials you asked for — legal basis: your consent (art. 6.1.a GDPR).",
            "To measure and improve our advertising with the Meta Pixel, and to keep the site secure and working — legal basis: your consent for the advertising and analytics cookies (art. 6.1.a GDPR and art. 22.2 LSSI-CE), and our legitimate interest in a secure, functioning site (art. 6.1.f GDPR).",
            "To comply with our tax, accounting and consumer law obligations — legal basis: legal obligation (art. 6.1.c GDPR).",
          ],
        },
        {
          heading: "How long we keep it",
          items: [
            "Enquiries that do not become clients: up to 12 months from our last contact, then deleted.",
            "Client files: for the duration of the engagement and afterwards for as long as any claim relating to it can be brought.",
            "Accounting and tax records: the retention periods Spanish law requires (generally 4 to 6 years).",
            "Cookie data: the retention periods listed in our Cookie Policy.",
          ],
        },
        {
          heading: "Who else sees your data",
          body: [
            "We do not sell your data. We share it only with providers who process it on our instructions under a data processing agreement, and with authorities where the law requires it. Our providers cover:",
          ],
          items: [
            "Website hosting and delivery.",
            "Email and office tools used to correspond with you.",
            "The scheduling provider that runs the booking page for the free call.",
            "The content platform serving the articles on the site.",
            "Meta Platforms, for advertising measurement through the Meta Pixel, where you have consented to advertising cookies.",
            "The CRM or automation tool that receives submitted enquiries so nothing is lost.",
            "Our accountants and, where relevant, external lawyers advising on a case.",
          ],
        },
        {
          heading: "Transfers outside the European Economic Area",
          body: [
            "Some of these providers are based in, or store data in, countries outside the EEA — principally the United States. Where that happens we rely on the safeguards the GDPR requires: an adequacy decision (such as the EU–US Data Privacy Framework) or the European Commission's Standard Contractual Clauses. You can ask us for a copy of the safeguards that apply.",
          ],
        },
        {
          heading: "Your rights",
          body: ["You can exercise any of the following rights free of charge by emailing us at " + CONTACT_EMAIL + ". We may ask you to confirm your identity, and we will answer within one month."],
          items: [
            "Access — ask what data we hold about you and get a copy.",
            "Rectification — have inaccurate or incomplete data corrected.",
            "Erasure — ask us to delete your data where we no longer need it.",
            "Restriction — ask us to pause processing while a dispute is resolved.",
            "Portability — receive the data you gave us in a machine-readable format.",
            "Objection — object to processing based on our legitimate interest.",
            "Withdraw consent — at any time, without affecting processing carried out before you withdrew it.",
          ],
        },
        {
          heading: "Complaints",
          body: [
            "If you think we have handled your data incorrectly, please tell us first so we can put it right. You also have the right to complain to the Spanish data protection authority, the Agencia Española de Protección de Datos (AEPD), C/ Jorge Juan 6, 28001 Madrid — www.aepd.es.",
          ],
        },
        {
          heading: "Automated decisions and profiling",
          body: [
            "We do not make decisions about you by purely automated means. Advertising platforms may show our ads to audiences built from cookie data where you have consented to that; you can opt out at any time through your cookie settings and through the platform's own ad settings.",
          ],
        },
        {
          heading: "Security and minors",
          body: [
            "We apply appropriate technical and organisational measures to protect your data, and we limit access to the people who need it to help you.",
            "This site and our services are intended for adults. We do not knowingly collect data from anyone under 18; if you believe we have, contact us and we will delete it.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We may update this policy as our service or our providers change. The date at the top of this page always shows the current version, and material changes will be flagged on the site.",
          ],
        },
      ],
    },

    cookies: {
      navLabel: "Cookie Policy",
      title: "Cookie Policy",
      metaTitle: "Cookie Policy",
      metaDescription:
        "Which cookies and similar technologies movingo.es uses, what each one is for, how long it lasts, and how to accept, refuse or delete them.",
      intro:
        "This policy explains the cookies and similar technologies used on this website, in line with article 22.2 of Spain's LSSI-CE and the GDPR. It sits alongside our Privacy Policy, which covers personal data more broadly.",
      sections: [
        {
          heading: "What cookies are",
          body: [
            "A cookie is a small file a website stores on your device so it can recognise that device on a later visit. Similar technologies — pixels, local storage, tracking scripts — do much the same job and are treated the same way here.",
            "Cookies that are strictly necessary for the site to work can be used without your permission. Everything else — measurement, advertising — needs your consent, which you can give, refuse or withdraw at any time.",
          ],
        },
        {
          heading: "Cookies used on this site",
          table: {
            headers: ["Cookie / technology", "Provider", "Purpose", "Type", "Duration"],
            rows: [
              [
                "Session and security cookies",
                "Movingo (this site)",
                "Keep the site working, remember your cookie choice, and protect forms from abuse.",
                "Strictly necessary",
                "Session to 12 months",
              ],
              [
                "_fbp",
                "Meta Platforms Ireland Ltd.",
                "Identifies a browser so we can measure how many people who saw a Movingo ad went on to enquire.",
                "Advertising",
                "3 months",
              ],
              [
                "fr",
                "Meta Platforms Ireland Ltd.",
                "Delivers and measures advertising on Meta's platforms.",
                "Advertising",
                "3 months",
              ],
              [
                "Meta Pixel script",
                "Meta Platforms Ireland Ltd.",
                "Reports page views and completed enquiries back to our ad account, so we can tell which ads bring people who actually need help.",
                "Advertising",
                "See Meta's own policy",
              ],
            ],
          },
          body: [
            "The site does not use advertising cookies to build a profile of you beyond what is described above, and does not share cookie data with advertising networks other than Meta.",
          ],
        },
        {
          heading: "Managing your cookies",
          body: [
            "You can withdraw your consent or change your choice at any time. You can also control cookies in your browser, and delete the ones already stored:",
          ],
          items: [
            "Chrome, Firefox, Safari and Edge all let you block or delete cookies from their privacy or site settings.",
            "Meta's ad preferences let you control how your data is used for advertising on its platforms: www.facebook.com/adpreferences.",
            "The Spanish data protection authority publishes a plain-language guide to cookies at www.aepd.es.",
            "Blocking strictly necessary cookies may stop parts of this site working as intended.",
          ],
        },
        {
          heading: "Where cookie data goes",
          body: [
            "Cookie data collected by Meta is processed by Meta Platforms Ireland Ltd. and may be transferred outside the EEA under the safeguards described in our Privacy Policy. Data collected by the strictly necessary cookies stays with us and our hosting provider.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If we add or remove a tool that sets cookies, we will update the table above and the date at the top of this page.",
          ],
        },
      ],
    },

    terms: {
      navLabel: "Terms of Service",
      title: "Terms of Service",
      metaTitle: "Terms of Service",
      metaDescription:
        "The terms on which Movingo provides its free move-out consultation, checklists and related services for tenants and owners in Barcelona.",
      intro:
        "These terms govern your use of this website and the services Movingo offers through it. By booking a call, downloading a checklist or writing to us, you accept them.",
      sections: [
        {
          heading: "Who we are",
          body: [
            `This site and the services described on it are provided by ${COMPANY.legalName} (${COMPANY.taxId}), ${ADDRESS}, contactable at ${CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: "What we offer",
          items: [
            "A free introductory call of about 15 minutes about your move-out or your rental, with no obligation.",
            "Free materials: move-out checklists and the guidance published on this site.",
            "Practical help with a move-out — deposit recovery, admin, belongings, urgent departures, lease buyouts and repairs — where we agree to take it on. Anything beyond the free call is agreed separately in writing before it starts, including its price.",
          ],
        },
        {
          heading: "What we are not",
          body: [
            "Movingo is not a law firm and does not provide legal representation. The pages on this site refer to Spanish tenancy rules — such as the LAU and deposit registration with INCASÒL — as general information about how the process works.",
            "Nothing on this site, and nothing said on the free call, is legal, tax or financial advice on your particular situation, and no lawyer–client relationship arises from it. Where a case needs a lawyer, we will say so, and can point you to one.",
            "We are not an estate agency and do not act for landlords against tenants, or the other way round, in the same matter.",
          ],
        },
        {
          heading: "Booking a call",
          body: [
            "Calls are booked through our scheduling page and confirmed by email. Please tell us in advance if you cannot attend so the slot can go to someone else; we may cancel or reschedule a call ourselves, in which case we will offer you another slot.",
            "The free call covers Barcelona. If you are moving out elsewhere in Spain we will tell you honestly whether we can help.",
          ],
        },
        {
          heading: "Your responsibilities",
          items: [
            "Give us accurate information — the guidance we can give is only as good as what you tell us.",
            "Only send us documents you are entitled to share.",
            "Take your own decisions about your tenancy. We help you prepare, but the choices, signatures and deadlines remain yours.",
          ],
        },
        {
          heading: "Fees and consumer rights",
          body: [
            "The consultation and the checklists are free. Any paid service is quoted and agreed in writing beforehand.",
            "If you engage us as a consumer for a paid service concluded at a distance, you have 14 calendar days to withdraw under Royal Legislative Decree 1/2007. If you ask us to start within that period, you may still withdraw, but we may charge for the part of the service already performed.",
          ],
        },
        {
          heading: "Availability of the site",
          body: [
            "We aim to keep the site available, but we do not guarantee uninterrupted access and may change, suspend or withdraw parts of it, including the free materials, at any time.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We are responsible for providing our services with reasonable care and skill. We are not liable for outcomes that depend on third parties — a landlord, an agency, a public body — or for losses caused by information you did not give us or gave us inaccurately.",
            "Nothing in these terms limits liability that Spanish law does not allow to be limited, including liability for fraud or for gross negligence, or a consumer's statutory rights.",
          ],
        },
        {
          heading: "Intellectual property",
          body: [
            "The site, its content and our checklists belong to Movingo or are used under licence. You may use them for your own move-out; any commercial reuse needs our written permission.",
          ],
        },
        {
          heading: "Personal data",
          body: [
            "We process the data you give us as described in our Privacy Policy, and use cookies as described in our Cookie Policy.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms as the service develops. The version published here at the time you book or engage us is the one that applies, and the date at the top of the page shows when it was last changed.",
          ],
        },
        {
          heading: "Complaints, applicable law and jurisdiction",
          body: [
            `If something goes wrong, write to us at ${CONTACT_EMAIL} and we will try to resolve it directly.`,
            "These terms are governed by Spanish law. Disputes will be heard by the courts of Barcelona, except where you contract as a consumer, in which case the courts provided for by consumer protection law apply. Consumers may also use the European Commission's online dispute resolution platform at https://ec.europa.eu/consumers/odr.",
          ],
        },
      ],
    },
  },
};

/** English-only for now — see the note at the top of this file. */
const LEGAL_COPY: Partial<Record<Locale, LegalCopy>> = { en };

export function getLegalCopy(locale: Locale): LegalCopy {
  return LEGAL_COPY[locale] ?? en;
}

export function getLegalDoc(locale: Locale, slug: LegalDocSlug): LegalDoc {
  return getLegalCopy(locale).docs[slug];
}

/**
 * Metadata shared by the four legal routes — same title suffix, description
 * and hreflang set as every other page, so the route files stay six lines
 * each. Returns {} for a locale the site doesn't serve, matching the
 * convention in the pain and privacy routes.
 */
export function legalMetadata(locale: string, slug: LegalDocSlug): Metadata {
  if (!LOCALES.includes(locale as Locale)) return {};
  const activeLocale = locale as Locale;
  const doc = getLegalDoc(activeLocale, slug);
  const dict = getDictionary(activeLocale);
  const path = `/${activeLocale}/${slug}`;

  return {
    title: `${doc.metaTitle}${dict.meta.titleSuffix}`,
    description: doc.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/${slug}`])),
        "x-default": `/${DEFAULT_LOCALE}/${slug}`,
      },
    },
  };
}
