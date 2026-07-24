import type { Dictionary } from "../types";

const en: Dictionary = {
  meta: {
    titleSuffix: " | MoveOS Barcelona",
  },
  languageNames: {
    en: "English",
    es: "Español",
    ru: "Русский",
  },
  nav: {
    bookButton: "Get My Free Checklist",
  },
  heroTrustBadges: ["100% free", "15 minutes", "By phone", "No obligation"],
  pains: {
    deposit: {
      eyebrow: "Free Deposit Protection Review · Barcelona",
      h1: "Don't Lose Your Deposit When You Move Out",
      subheading:
        "Get a free 15-minute call with a move-out specialist. Know your rights, avoid costly mistakes, and maximise your chances of getting your full deposit back.",
      heroCta: "Get My Free Checklist",
      shortLabel: "Deposit",
    },
    admin: {
      eyebrow: "Free Move-Out Admin Check · Barcelona",
      h1: "Moving Out Shouldn't Mean a Mountain of Paperwork",
      subheading:
        "Internet, address changes, banks, subscriptions — get a free 15-minute call to make sure nothing falls through the cracks when you move.",
      heroCta: "Get My Free Checklist",
      shortLabel: "Moving Admin",
    },
    belongings: {
      eyebrow: "Free Move-Out Review · Barcelona",
      h1: "Don't Let Your Old Furniture Become a Problem",
      subheading:
        "No time to sell, donate, or store what you're leaving behind? Get a free 15-minute call and a clear plan for what to do with it.",
      heroCta: "Get My Free Checklist",
      shortLabel: "Furniture & Belongings",
    },
    urgent: {
      eyebrow: "Free Urgent Move-Out Review · Barcelona",
      h1: "Moving Out Earlier Than Planned? Do It Right.",
      subheading:
        "Contract, deposit, notice period — get a free 15-minute call to understand your options before you make a costly mistake.",
      heroCta: "Get My Free Checklist",
      shortLabel: "Urgent Move-Out",
    },
  },
  whatYouGet: {
    heading: "What We'll Cover in 15 Minutes",
    subheading: "Not a generic checklist. A short call built around your specific situation.",
    items: [
      {
        badge: "Deductions",
        title: "What your landlord can legally deduct from your deposit",
        pains: ["deposit"],
      },
      {
        badge: "Photo Report",
        title: "How to prepare a photo report for the handover",
        pains: ["deposit", "urgent", "belongings"],
      },
      {
        badge: "Utilities",
        title: "How to cancel or transfer your internet, electricity and gas",
        pains: ["admin"],
      },
      {
        badge: "Address Change",
        title: "How to update your address with banks, subscriptions and official registers",
        pains: ["admin"],
      },
      {
        badge: "Belongings",
        title: "What to do with furniture and belongings you can't take with you",
        pains: ["belongings"],
      },
      {
        badge: "Early Exit",
        title: "How to handle notice periods and early-termination clauses",
        pains: ["urgent"],
      },
      {
        badge: "Documents",
        title: "Which documents to collect before handing back the keys",
        pains: ["deposit", "admin", "urgent"],
      },
    ],
    resultLabel: "The Result",
    resultText: "Leave with everything sorted — deposit, admin, and belongings.",
  },
  whyTrustUs: {
    heading: "Advice Tailored to Your Situation",
    p1: "Moving out isn't the same for everyone. Your rental contract, landlord, apartment condition and timeline all matter.",
    p2: "That's why we don't use generic checklists. During the call, we look at your specific situation and explain what matters before you hand back the keys.",
    cards: [
      {
        emoji: "📄",
        title: "Your Contract",
        body: "Every rental agreement is different. We review the clauses that matter for your move-out.",
      },
      {
        emoji: "⚖️",
        title: "Your Rights",
        body: "We explain what your landlord can and cannot legally deduct.",
      },
      {
        emoji: "🏠",
        title: "Your Situation",
        body: "Not generic advice. Recommendations based on your apartment, documents and timeline.",
        span: true,
        featured: true,
      },
      {
        emoji: "🎁",
        title: "Free & No Obligation",
        body: "Get practical guidance with no cost and no pressure.",
        span: true,
      },
    ],
  },
  didYouKnow: {
    heading: "Did You Know?",
    subheading: "A few things most tenants only find out after it's too late.",
    facts: [
      {
        q: "Your deposit may not even be held by your landlord.",
        a: "For most residential rentals in Catalonia, the mandatory security deposit is normally lodged with INCASÒL rather than remaining in the landlord's personal bank account.",
      },
      {
        q: "Not every clause in a rental contract is enforceable.",
        a: "Some rental agreements include clauses that conflict with mandatory tenant protections under Spanish or Catalan law. Appearing in the contract doesn't automatically make a clause valid.",
      },
      {
        q: "Most deposit disputes can be prevented.",
        a: "The strongest protection isn't a lawyer — it's good preparation before the handover. Proper documentation often makes the difference.",
      },
      {
        q: "Leaving earlier than planned doesn't always mean losing your deposit.",
        a: "Notice periods and early-termination terms vary by contract. Understanding yours before you give notice can save you money and stress.",
      },
    ],
  },
  ourPromise: {
    h2: "We won't give generic advice.",
    p1: "We'll review your specific situation and tell you exactly what to do before you hand back the keys.",
    p2: "Our promise: help you leave with your deposit, your admin and your belongings all sorted.",
  },
  quizIntro: {
    heading: "Ready to move out with confidence?",
    subheading: "Answer a few quick questions — it takes less than a minute.",
  },
  footer: {
    tagline: "MoveOS — calm, informed move-outs in Barcelona.",
    privacy: "Privacy Policy",
  },
  quiz: {
    progressLabel: "Step {n} of {total}",
    backButton: "Back",
    city: {
      question: "Which city are you renting in?",
      barcelona: "Barcelona",
      other: "Another city",
    },
    timeframe: {
      question: "When are you moving out?",
      already: "I've already moved out",
      lt1m: "Within 1 month",
      m1to3: "In 1–3 months",
      later: "More than 3 months / not sure yet",
    },
    pain: {
      question: "What matters most to you right now?",
      deposit: "Getting my deposit back",
      admin: "Sorting out utilities & address changes",
      belongings: "Furniture & belongings I'm leaving behind",
      urgent: "Moving out earlier than planned",
      other: "Just researching for later",
    },
    contact: {
      heading: "Almost done — where should we send your checklist?",
      namePlaceholder: "Your name (optional)",
      phonePlaceholder: "Your phone number",
      consent: "I agree to be contacted by MoveOS. See our Privacy Policy.",
      submitButton: "Get my checklist",
      submitting: "Sending…",
      error: "Something went wrong. Please try again in a moment.",
    },
  },
  results: {
    qualified: {
      badge: "You're a great fit ✅",
      heading: "Let's get you moved out with zero stress",
      body: "Book your free 15-minute call below, and grab your full move-out checklist while you're at it.",
      bookingHeading: "Book your free 15-minute call",
      bookingBody: "Pick any time that works — no obligation, no sales pitch.",
      bookingButton: "Choose a time",
      checklistHeading: "Your full move-out checklist",
    },
    notQualified: {
      badge: "Thanks for sharing",
      heading: "Here's what every tenant should know",
      body: "Right now we're focused on Barcelona renters moving out in the next few months — but here's a free checklist with the essentials for anyone moving out of a rental in Spain.",
      checklistHeading: "What to know before moving out in Spain",
    },
    downloadPdf: "Download as PDF",
    restartButton: "Start over",
  },
  checklist: {
    generic: {
      title: "Moving Out in Spain: What Every Tenant Should Know",
      intro:
        "General information for anyone leaving a rental in Spain — not legal advice, but the basics most tenants only learn the hard way.",
      sections: [
        {
          heading: "Notice period",
          items: [
            "Check your contract's notice period (typically 30 days if you're leaving after the minimum term).",
            "Always give notice in writing (email or burofax) and keep proof you sent it.",
            "Confirm the exact date your landlord considers the contract ended.",
          ],
        },
        {
          heading: "Your deposit (fianza)",
          items: [
            "Your deposit is usually equal to one month's rent and may be registered with a regional deposit agency (e.g. INCASÒL in Catalonia), not just held by your landlord.",
            "Landlords can only deduct for damage beyond normal wear and tear, unpaid rent, or unpaid bills — not for cosmetic aging.",
            "By law, the deposit should be returned within one month of handing back the keys, once any deductions are agreed.",
          ],
        },
        {
          heading: "The handover (check-in/check-out report)",
          items: [
            "Take dated photos and, ideally, video of every room before you leave.",
            "Ask for a signed check-out report (or write one yourself and get your landlord to sign it) comparing condition to move-in.",
            "Note meter readings for electricity, water and gas on the handover date.",
          ],
        },
        {
          heading: "Utilities and subscriptions",
          items: [
            "Contact your utility providers to schedule the transfer or cancellation for your exact move-out date.",
            "Set up a new contract at your next address ahead of time to avoid a gap.",
            "Update your address with your bank, insurance, and any subscriptions or deliveries.",
          ],
        },
        {
          heading: "Official registrations",
          items: [
            "Update your padrón (municipal registration) at your new address.",
            "Update your address with immigration/foreigner authorities if applicable (TIE, DGT for vehicles, etc.).",
          ],
        },
        {
          heading: "If there's a dispute",
          items: [
            "Put everything in writing — disputes are won or lost on documentation, not opinions.",
            "You may be able to bring smaller claims yourself without a lawyer.",
            "Local tenant associations and consumer offices (OMIC) can offer free guidance.",
          ],
        },
      ],
      disclaimer:
        "This is general information, not legal advice. Rules vary by region and contract — check your specific situation.",
    },
    qualified: {
      title: "Your Move-Out Checklist — Barcelona",
      intro:
        "Since you're moving out in Barcelona soon, here's the full picture — deposit, admin, belongings and timing — plus what we'll cover together on your free call.",
      sections: [
        {
          heading: "Protecting your deposit",
          items: [
            "Document the apartment's condition before you start packing, not the night before handover.",
            "Know exactly what counts as \"normal wear and tear\" vs. chargeable damage.",
            "Get a signed check-out report — this is the single biggest factor in deposit disputes.",
          ],
        },
        {
          heading: "Moving admin, handled",
          items: [
            "Book your internet cancellation/transfer at least 2 weeks ahead — providers are slower than you'd expect.",
            "Make a list of everywhere your current address lives: bank, insurer, Seguridad Social, subscriptions, deliveries.",
            "Redirect or update your correspondence before you lose access to your old mailbox.",
          ],
        },
        {
          heading: "Furniture and belongings",
          items: [
            "Decide early what's coming with you, what's being sold, donated, or stored — leaving it for the last week is the most common mistake.",
            "If you need short-term storage or a quick sale, we can point you to trusted partners.",
          ],
        },
        {
          heading: "If you're leaving earlier than planned",
          items: [
            "Check your contract for early-termination clauses and any penalty.",
            "Understand what happens to your deposit if you break the minimum term.",
            "A short call can save you from a costly misstep here.",
          ],
        },
        {
          heading: "On your free 15-minute call, we'll",
          items: [
            "Look at your actual contract and situation, not a generic script.",
            "Walk through what to prepare before your handover date.",
            "Give you a clear, personal action plan.",
          ],
        },
      ],
      disclaimer:
        "This is general information, not legal advice. Rules vary by region and contract — check your specific situation.",
    },
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "This is a placeholder privacy policy for the MoveOS MVP. Replace it with a policy reviewed by a qualified professional before sending paid traffic here. At a minimum it should cover:",
    items: [
      "What data is collected (name, phone, quiz answers) and why (to contact you about your free move-out check and send your checklist).",
      "How long the data is retained.",
      "Which third parties it is shared with (e.g. your CRM, webhook, or scheduling provider).",
      "How users can request access to or deletion of their data, per the GDPR.",
      "Contact details for privacy-related requests.",
    ],
  },
};

export default en;
