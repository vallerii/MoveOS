import type { Locale } from "./types";

/**
 * Glossary — /[locale]/glossary and /[locale]/glossary/[term].
 *
 * Purpose: the pain pages and articles use Spanish rental vocabulary a
 * foreign tenant in Barcelona meets for the first time (fianza, INCASÒL,
 * desistimiento, cédula de habitabilidad). Each of those words is its own
 * search query with a clear informational intent, and each has a natural
 * next step on this site. One term, one page, one definition — see the
 * Glossar template in SEO_CONTENT_SYSTEM.md.
 *
 * Editorial rules for anything added here:
 *   - Only terms that actually appear in our own pages and matter to a
 *     tenant or an owner in Barcelona. No filler vocabulary for page count.
 *   - Legal statements cite the actual rule (article + law), and only
 *     rules that were verified against a primary source. `sources` below is
 *     rendered on the page so a reader can check us.
 *   - No amounts that move (index values, prices). The rule stays true for
 *     years; "the IRAV was X% in 2026" does not.
 *   - This is general information, not legal advice — every page repeats
 *     that in `disclaimer`, matching the boundary the terms of service set.
 *
 * English only for now (see LOCALES in ./types.ts); getGlossaryCopy falls
 * back to `en` for any other locale.
 */

export interface GlossaryLink {
  /** Path WITHOUT the locale prefix, e.g. "/deposit". */
  href: string;
  label: string;
}

export interface GlossaryTerm {
  slug: string;
  /** The heading and the H1 — the term itself, as people search it. */
  term: string;
  /** English gloss shown next to the Spanish term where they differ. */
  alsoKnownAs?: string;
  /** Search snippet copy — its own short line, not the definition. */
  metaTitle: string;
  metaDescription: string;
  /** One or two sentences. The answer, before anything else. */
  definition: string;
  /** Why it matters here, in Barcelona, for this reader. */
  whyItMatters: string[];
  /** Optional concrete example — only where it genuinely clarifies. */
  example?: string;
  /** Cited rules, rendered under the text. */
  sources?: string[];
  /** Pages on this site that continue the topic. */
  related: GlossaryLink[];
  /** Other terms worth reading next. */
  seeAlso?: string[];
}

export interface GlossaryCopy {
  hub: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    h1: string;
    intro: string;
    /** Section headings on the hub. */
    tenantsHeading: string;
    ownersHeading: string;
  };
  term: {
    definitionHeading: string;
    whyHeading: string;
    exampleHeading: string;
    relatedHeading: string;
    seeAlsoHeading: string;
    sourcesHeading: string;
    disclaimer: string;
    ctaHeading: string;
    ctaBody: string;
    ctaButton: string;
  };
  /** Order is the order shown on the hub. */
  terms: GlossaryTerm[];
  /** Slugs shown under "for owners" on the hub; the rest are tenant-side. */
  ownerTerms: string[];
}

const en: GlossaryCopy = {
  hub: {
    metaTitle: "Renting in Spain: Glossary",
    metaDescription:
      "Plain-English definitions of the Spanish rental terms you meet when moving out in Barcelona: fianza, INCASÒL, LAU, desistimiento and more.",
    eyebrow: "Glossary",
    h1: "Renting in Spain, term by term",
    intro:
      "Every word here appears in a real Barcelona lease, deposit form or handover report — and every one of them has cost someone money because it wasn't clear. One term per page: what it means, why it matters, and what to do about it.",
    tenantsHeading: "If you rent",
    ownersHeading: "If you rent out",
  },
  term: {
    definitionHeading: "Definition",
    whyHeading: "Why it matters",
    exampleHeading: "Example",
    relatedHeading: "Where this comes up",
    seeAlsoHeading: "Related terms",
    sourcesHeading: "Sources",
    disclaimer:
      "General information about how renting works in Spain, not legal advice on your situation. Movingo is not a law firm.",
    ctaHeading: "Not sure how this applies to your flat?",
    ctaBody: "Fifteen minutes, free, no obligation — bring your lease and we'll tell you where you stand.",
    ctaButton: "Book a free call",
  },
  ownerTerms: ["cedula-de-habitabilidad", "zona-tensionada"],
  terms: [
    {
      slug: "fianza",
      term: "Fianza",
      alsoKnownAs: "rental deposit",
      metaTitle: "Fianza: What a Spanish Rental Deposit Is",
      metaDescription:
        "The fianza is Spain's legal rental deposit: one month's rent for a home, returned within a month of handing back the keys. What the law says.",
      definition:
        "The fianza is the security deposit Spanish law requires at the start of a tenancy: one month's rent for a residential lease, two months for any other use. It is not a payment to the landlord — it is money held against unpaid rent or damage, and it comes back to you when the tenancy ends.",
      whyItMatters: [
        "The deposit has to be returned within one month of you handing back the keys. After that month, the outstanding amount accrues statutory interest — the landlord does not get to sit on it while they decide.",
        "The fianza is a legal minimum, not a ceiling: a landlord may also ask for an additional guarantee (a bank guarantee, extra months, a guarantor). That extra money is contractual and is treated differently from the fianza itself, so it is worth knowing which part of what you paid is which before you ask for it back.",
        "In Catalonia the landlord must lodge the fianza with INCASÒL. If it was never lodged, that is the landlord's breach, not yours — and it is usually the first thing worth checking when a deposit is slow to come back.",
      ],
      sources: ["Article 36, Ley 29/1994 de Arrendamientos Urbanos (LAU)"],
      related: [
        { href: "/deposit", label: "Getting your deposit back" },
        { href: "/repair", label: "Repairs before you move out" },
      ],
      seeAlso: ["incasol", "lau", "inventory-report"],
    },
    {
      slug: "incasol",
      term: "INCASÒL",
      alsoKnownAs: "Institut Català del Sòl — where Catalan deposits are registered",
      metaTitle: "INCASÒL: Where Your Deposit Is Held",
      metaDescription:
        "In Catalonia the landlord must lodge your fianza with INCASÒL within two months of signing. How to check it was registered, and why it matters.",
      definition:
        "INCASÒL, the Institut Català del Sòl, is the public body that holds rental deposits in Catalonia. The landlord — not the tenant — must lodge the fianza there within two months of the contract being signed, and reclaims it from INCASÒL when the tenancy ends.",
      whyItMatters: [
        "Registration is the paper trail. A deposit that sits in INCASÒL's records is documented at a fixed amount on a fixed date, which removes most of the argument about what was paid.",
        "Not lodging it is an administrative breach that can be sanctioned. It also tells you something useful about how the tenancy is being run — and it is a strong position to be in when you ask for the money back.",
        "The return runs through the same channel: the landlord requests it from INCASÒL and the money is transferred back. That process takes time on its own, which is why a landlord who only starts it after you have left is already late against the one-month rule in the LAU.",
      ],
      example:
        "You can ask your landlord for the deposit's registration reference at any point during the tenancy. Asking early — long before the move-out — is a normal request, and it is far easier than reconstructing it in the last week.",
      sources: [
        "Llei 13/1996, de 29 de juliol, del Registre de fiances dels contractes de lloguer de finques urbanes",
        "Decret 147/1997, de 10 de juny (Catalonia)",
      ],
      related: [
        { href: "/deposit", label: "Getting your deposit back" },
        { href: "/urgent", label: "Moving out sooner than planned" },
      ],
      seeAlso: ["fianza", "lau"],
    },
    {
      slug: "lau",
      term: "LAU",
      alsoKnownAs: "Ley de Arrendamientos Urbanos — Spain's Urban Leases Act",
      metaTitle: "LAU: The Spanish Law Behind Your Lease",
      metaDescription:
        "Ley 29/1994 (LAU) sets the rules your Spanish lease follows: deposit, repairs, notice and early termination — and where it beats the contract.",
      definition:
        "The LAU — Ley 29/1994 de Arrendamientos Urbanos — is the national law governing residential and commercial leases in Spain. It sets the framework your contract sits inside: deposit, duration and renewal, repair obligations, notice, and how a tenancy ends.",
      whyItMatters: [
        "Much of the LAU is mandatory in the tenant's favour for a residential lease. A clause in the contract that gives you less than the law does is not automatically valid just because you signed it.",
        "Most move-out disputes come down to three of its articles: the deposit and its return, who pays for what repairs, and what happens if you leave early. Knowing which one your situation falls under changes the conversation with a landlord from opinion to rule.",
        "The LAU is not the whole picture in Catalonia: regional rules add to it, including deposit registration and rent limits in designated areas. When they conflict in practice, that is a question worth asking a lawyer rather than guessing.",
      ],
      sources: ["Ley 29/1994, de 24 de noviembre, de Arrendamientos Urbanos"],
      related: [
        { href: "/deposit", label: "Getting your deposit back" },
        { href: "/urgent", label: "Moving out sooner than planned" },
      ],
      seeAlso: ["fianza", "desistimiento", "wear-and-tear"],
    },
    {
      slug: "inventory-report",
      term: "Inventario / acta de entrega",
      alsoKnownAs: "check-in inventory and handover report",
      metaTitle: "Check-In Inventory and Handover Report",
      metaDescription:
        "The inventario records the flat's condition at move-in, the acta de entrega at move-out. Why these two documents decide most deposit disputes.",
      definition:
        "The inventario is the record of what was in the flat and what condition it was in on the day you moved in. The acta de entrega is the equivalent for the day you hand back the keys — signed by both sides, ideally with photos and meter readings.",
      whyItMatters: [
        "Nothing in Spanish law says you must have one, which is exactly why it decides so many disputes: without a before-and-after record, a claim about a mark on a wall becomes one person's word against another's.",
        "The document matters most when it is boring — dated photos of every room, meter readings, the number of keys handed over, and a line stating the landlord has no further claims. Three weeks later, that last line is the one that pays for itself.",
        "If you never signed an inventory at move-in, you are not without options: photos with metadata, the listing photos the flat was advertised with, and correspondence about problems you reported all serve as evidence of the condition you took on.",
      ],
      related: [
        { href: "/deposit", label: "Getting your deposit back" },
        { href: "/repair", label: "Repairs before you move out" },
      ],
      seeAlso: ["fianza", "wear-and-tear"],
    },
    {
      slug: "wear-and-tear",
      term: "Desgaste por uso ordinario",
      alsoKnownAs: "fair wear and tear",
      metaTitle: "Wear and Tear vs Damage in a Rental",
      metaDescription:
        "Spanish law splits repairs between landlord and tenant: ordinary wear is one thing, damage another. Where the line falls and who pays.",
      definition:
        "Desgaste por uso ordinario is the deterioration that comes from living in a flat normally — faded paint, worn floor finish, tired seals. The LAU makes the landlord responsible for keeping the home habitable, while small repairs arising from ordinary use fall to the tenant.",
      whyItMatters: [
        "Ordinary wear is not deductible from your deposit. A landlord who repaints a flat you lived in for four years and bills you for it is charging you for their own maintenance cycle.",
        "Damage is different: a hole, a broken fitting, a stain that is not coming out. The honest test is whether the condition follows from normal use over the time you were there, not whether the flat looks brand new.",
        "The grey zone — furnished flats especially — is where the check-in inventory earns its keep. Photographed at move-in and again at move-out, most arguments about which side of the line something falls on end quickly.",
      ],
      sources: ["Article 21, Ley 29/1994 de Arrendamientos Urbanos (LAU)"],
      related: [
        { href: "/repair", label: "Repairs before you move out" },
        { href: "/deposit", label: "Getting your deposit back" },
      ],
      seeAlso: ["inventory-report", "fianza", "lau"],
    },
    {
      slug: "desistimiento",
      term: "Desistimiento",
      alsoKnownAs: "ending the lease early",
      metaTitle: "Desistimiento: Leaving a Lease Early",
      metaDescription:
        "Spanish law lets a tenant end a lease after six months with 30 days' notice. What compensation a landlord can claim — and when they can't.",
      definition:
        "Desistimiento is the tenant's right to walk away from a residential lease before its term is up. Under the LAU you may do this once at least six months have passed, giving the landlord at least 30 days' written notice.",
      whyItMatters: [
        "The right exists whether or not the contract mentions it. A clause saying you owe the whole remaining term does not override it.",
        "Compensation is capped and conditional: the landlord can claim it only if the contract expressly provides for it, and at most one month's rent for each year still to run, pro rata for part-years. No clause, no compensation.",
        "The notice is what makes the date real. Written, dated, and sent so you can prove it arrived — a WhatsApp conversation without a clear date is where these cases get messy.",
      ],
      sources: ["Article 11, Ley 29/1994 de Arrendamientos Urbanos (LAU)"],
      related: [
        { href: "/urgent", label: "Moving out sooner than planned" },
        { href: "/buyout", label: "Leaving early by agreement" },
      ],
      seeAlso: ["lau", "fianza"],
    },
    {
      slug: "empadronamiento",
      term: "Empadronamiento",
      alsoKnownAs: "registering on the padrón municipal",
      metaTitle: "Empadronamiento: The Padrón Explained",
      metaDescription:
        "The padrón is Spain's municipal register of who lives where. Why it matters for residency, healthcare and schools — and what to do when you move.",
      definition:
        "Empadronamiento is registration on the padrón municipal, your town hall's record of who lives at an address. It is the administrative proof that you live where you say you live.",
      whyItMatters: [
        "It is the document a long list of other processes ask for: residency paperwork, a health card, school places, some bank and utility procedures.",
        "It follows the address, not the person. When you move, you register at the new address — and in doing so you are removed from the old one, which is what stops your name staying attached to a flat you no longer occupy.",
        "Landlords sometimes ask tenants not to register. Being on the padrón is a right that follows from actually living there, and it is a normal part of moving in.",
      ],
      related: [
        { href: "/admin", label: "Move-out paperwork and admin" },
        { href: "/urgent", label: "Moving out sooner than planned" },
      ],
      seeAlso: ["suministros"],
    },
    {
      slug: "suministros",
      term: "Suministros",
      alsoKnownAs: "utilities: alta, baja and cambio de titular",
      metaTitle: "Suministros: Utilities When You Move Out",
      metaDescription:
        "Alta, baja and cambio de titular explained: how utility contracts work in Spain, and what to close or transfer when you leave a flat.",
      definition:
        "Suministros are the utility supplies to a flat — electricity, water, gas, internet. Three words govern what happens to them: alta (starting a supply), baja (cancelling it) and cambio de titular (transferring the contract to someone else's name).",
      whyItMatters: [
        "Whose name the contract is in decides who gets the bills after you leave. If the contract is yours and you neither cancel nor transfer it, consumption by the next occupant is billed to you.",
        "Cancelling outright is not always the right move. A baja can mean the next tenant pays a new connection charge, and a landlord may reasonably prefer a cambio de titular — worth agreeing before you act, and worth putting in writing.",
        "Take meter readings on the day you hand back the keys and keep them with the handover report. A final bill that arrives a month later is much easier to challenge against a photographed reading.",
      ],
      related: [
        { href: "/admin", label: "Move-out paperwork and admin" },
        { href: "/deposit", label: "Getting your deposit back" },
      ],
      seeAlso: ["empadronamiento", "inventory-report"],
    },
    {
      slug: "cedula-de-habitabilidad",
      term: "Cédula de habitabilidad",
      alsoKnownAs: "certificate of occupancy",
      metaTitle: "Cédula de Habitabilidad in Catalonia",
      metaDescription:
        "In Catalonia a home can't be rented out without a valid cédula de habitabilidad. What it certifies, when it expires, what to check before listing.",
      definition:
        "The cédula de habitabilidad is the Catalan certificate stating that a dwelling meets the minimum conditions to be lived in. In Catalonia it is required to rent a home out, and it is issued for a limited period, after which it has to be renewed.",
      whyItMatters: [
        "It is an owner's document, and it is checked at the point of doing things: signing a lease, registering the deposit, contracting utilities in some cases. Discovering it has expired the week a tenant is due to move in is a costly way to find out.",
        "Renewal usually means a technician's visit and a certificate — a normal, scheduled task rather than an emergency, as long as the expiry date is known in advance.",
        "The certificate carries its own issue and expiry dates on the document itself. That is the authoritative version — worth reading before relying on anything you were told about it.",
      ],
      related: [
        { href: "/host/first-time", label: "Renting out for the first time" },
        { href: "/host", label: "Short-term rental management" },
      ],
      seeAlso: ["zona-tensionada", "lau"],
    },
    {
      slug: "zona-tensionada",
      term: "Zona de mercado residencial tensionado",
      alsoKnownAs: "designated stressed rental area",
      metaTitle: "Zona Tensionada: Rent Caps in Catalonia",
      metaDescription:
        "In a declared zona tensionada the rent for a new lease is capped by the previous contract or an official index. What Barcelona owners should check.",
      definition:
        "A zona de mercado residencial tensionado is an area an autonomous community has formally declared as having a strained rental market. Inside one, the rent for a new lease is capped — as a rule by reference to the previous contract on the same home, or by an official index for large landlords.",
      whyItMatters: [
        "Catalonia was the first region to apply the mechanism and it covers many municipalities, Barcelona included. For an owner it is the difference between the rent they expected and the rent the contract may legally carry.",
        "Which cap applies depends on the case: whether the home was let before, and whether the owner counts as a large landlord. Certain situations allow an uplift — a substantial renovation, a longer lease term, energy improvements — under conditions set by the rules.",
        "Declarations are made for a set period and are reviewed and renewed, and the index that governs updates is republished. Before signing, check the current status of the specific municipality rather than relying on a figure quoted last year.",
      ],
      sources: ["Ley 12/2023, de 24 de mayo, por el derecho a la vivienda"],
      related: [
        { href: "/host/first-time", label: "Renting out for the first time" },
        { href: "/host", label: "Short-term rental management" },
      ],
      seeAlso: ["cedula-de-habitabilidad", "lau"],
    },
  ],
};

const GLOSSARY_COPY: Partial<Record<Locale, GlossaryCopy>> = { en };

export function getGlossaryCopy(locale: Locale): GlossaryCopy {
  return GLOSSARY_COPY[locale] ?? en;
}

export function getGlossaryTerm(locale: Locale, slug: string): GlossaryTerm | undefined {
  return getGlossaryCopy(locale).terms.find((t) => t.slug === slug);
}

/** Slugs in hub order — used by generateStaticParams and the sitemap. */
export function getGlossarySlugs(locale: Locale): string[] {
  return getGlossaryCopy(locale).terms.map((t) => t.slug);
}
