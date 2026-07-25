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
    bookButton: "Free Move-Out Review",
  },
  heroTrustBadges: ["100% free", "15 minutes", "Personalised", "No obligation"],
  pains: {
    deposit: {
      eyebrow: "Free Deposit Protection Review · Barcelona",
      h1: "Don't Lose Your Deposit When You Move Out",
      subheading:
        "Most tenants lose part of their deposit simply because they don't know their rights. Get a free deposit review and find out what to do before handing back the keys — so you get it all back.",
      heroCta: "Get My Deposit Review",
      shortLabel: "Deposit",
    },
    admin: {
      eyebrow: "Free Move-Out Admin Check · Barcelona",
      h1: "Moving Out Shouldn't Mean a Mountain of Paperwork",
      subheading:
        "A forgotten subscription or unpaid bill has a way of showing up months after you move. Get a free move-out admin review so nothing slips through the cracks.",
      heroCta: "Get My Admin Review",
      shortLabel: "Moving Admin",
    },
    belongings: {
      eyebrow: "Free Move-Out Review · Barcelona",
      h1: "Don't Let Your Old Furniture Become a Problem",
      subheading:
        "Furniture and belongings you can't take with you are a common source of last-minute stress and cost. Get a free review and a clear plan for what to do with them.",
      heroCta: "Get My Belongings Review",
      shortLabel: "Furniture & Belongings",
    },
    urgent: {
      eyebrow: "Free Urgent Move-Out Review · Barcelona",
      h1: "Moving Out Earlier Than Planned? Do It Right.",
      subheading:
        "Moving out earlier than planned often costs more than you'd expect — in penalties and lost deposit. Get a free urgent move-out review before you give notice.",
      heroCta: "Get My Urgent Move-Out Review",
      shortLabel: "Urgent Move-Out",
    },
  },
  whatYouGet: {
    heading: "Mistakes That Cost Renters Money When They Move Out",
    subheading: "Things most tenants find out too late — we go through them for your specific situation.",
    items: [
      {
        badge: "Deductions",
        title: "Illegal deductions are the #1 reason tenants lose their deposit",
        pains: ["deposit"],
      },
      {
        badge: "Photo Report",
        title: "Without photos and a signed report, you can't prove your case",
        pains: ["deposit", "urgent", "belongings"],
      },
      {
        badge: "Utilities",
        title: "An unclosed meter can land you a bill months after you've left",
        pains: ["admin"],
      },
      {
        badge: "Address Change",
        title: "A forgotten address update comes back to bite you later",
        pains: ["admin"],
      },
      {
        badge: "Belongings",
        title: "Furniture with nowhere to go means stress and cost in your last week",
        pains: ["belongings"],
      },
      {
        badge: "Early Exit",
        title: "Leaving early often means a penalty and a smaller deposit refund",
        pains: ["urgent"],
      },
      {
        badge: "Documents",
        title: "One missing document is enough to delay your deposit",
        pains: ["deposit", "admin", "urgent"],
      },
    ],
    resultLabel: "The Result",
    resultText: "Leave with everything sorted — deposit, admin, and belongings.",
  },
  didYouKnow: {
    heading: "Did You Know?",
    subheading: "A few things most tenants only find out after it's too late.",
    facts: {
      deposit: [
        {
          q: "Your deposit might be held by the government, not your landlord.",
          a: "In Catalonia, the mandatory deposit is lodged with INCASÒL, not sitting in your landlord's personal account — this can be checked.",
        },
        {
          q: "Your landlord has exactly one month to return your deposit.",
          a: "By law, the deposit must be returned within a month of handing back the keys. Silence after that isn't normal — it's a breach.",
        },
        {
          q: "Normal wear and tear isn't grounds for a deduction.",
          a: "Faded paint or a worn floor from years of living there is wear and tear, not damage. Telling the two apart is the whole dispute.",
        },
        {
          q: "Most disputes are settled by one photo, not a lawyer.",
          a: "A well-documented move-in and move-out condition report closes the question before it even comes up.",
        },
      ],
      admin: [
        {
          q: "A forgotten subscription keeps charging your card after you move.",
          a: "Streaming, gym, deliveries — subscriptions don't cancel themselves. Checking the list takes 10 minutes and saves months of charges.",
        },
        {
          q: "Internet providers rarely move faster than 2 weeks.",
          a: "Even an urgent request to cancel or transfer your internet in Spain usually takes 1–2 weeks — plan ahead.",
        },
        {
          q: "A forgotten padrón update can bite at the worst time.",
          a: "Your registered address affects doctor appointments, school enrolment, and some immigration processes.",
        },
        {
          q: "Mail to your old address can keep arriving for months.",
          a: "Bank, tax office, insurance — the list of places with your address is usually longer than you'd think.",
        },
      ],
      belongings: [
        {
          q: "Furniture left behind often becomes your landlord's problem — and yours.",
          a: "If your landlord finds items after you've left, it can delay your deposit or add removal costs.",
        },
        {
          q: "Selling furniture a week before moving is nearly impossible.",
          a: "Good used-furniture listings usually take 2–4 weeks to sell — you won't have time in the final days.",
        },
        {
          q: "Storage is cheaper than you think — if you book early.",
          a: "Short-term storage prices in Barcelona spike during peak moving season (summer, end of the school year).",
        },
        {
          q: "Not everything that looks like junk is easy to throw out.",
          a: "Bulky items like furniture and mattresses can't just be left on the street — Barcelona has specific rules and pickup schedules (trastos).",
        },
      ],
      urgent: [
        {
          q: "Leaving early doesn't always mean a penalty.",
          a: "Many contracts allow early termination with compensation capped at one month's rent — not losing your whole deposit, as many fear.",
        },
        {
          q: "Your notice period starts from the written notice, not the conversation.",
          a: "Telling your landlord in person doesn't count — most contracts require written notice (email or burofax).",
        },
        {
          q: "Leaving \"tomorrow\" is almost never free, legally speaking.",
          a: "Even in urgent cases, contracts usually assume a minimum notice period — skipping it can mean paying for months you won't live there.",
        },
        {
          q: "Panic is the worst advisor when you need to leave fast.",
          a: "Most costly mistakes in an urgent move happen in the first 24 hours, before anyone actually reads the contract.",
        },
      ],
    },
  },
  whyUs: {
    eyebrow: "Why MoveOS",
    heading: "Every move-out is different",
    intro: "Your lease, your landlord, the apartment's condition, and your timeline all matter. Our only job is getting you through your move without stress.",
    body: {
      deposit: "Here's how we help: we review your move-out act and photos and tell you how to get your full deposit back.",
      admin: "Here's how we help: we go through your paperwork and flag mistakes, so you don't overpay or get blamed unfairly.",
      belongings: "Here's how we help: we build an inventory and plan your move, so nothing gets lost or broken.",
      urgent: "Here's how we help: we tell you exactly what to do first, step by step — no panic.",
    },
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
      secondaryHeading: "Leave your number too — we'll send the checklist and a confirmation",
      namePlaceholder: "Your name (optional)",
      phonePlaceholder: "Your phone number",
      consent: "I agree to be contacted by MoveOS. See our Privacy Policy.",
      submitButton: "Get my checklist",
      submitting: "Sending…",
      error: "Something went wrong. Please try again in a moment.",
      bookingHeading: "Let's talk through your specific situation",
      bookingBody: "A free 15-minute call — pick any time that works, no obligation.",
      bookingButton: "Book your call",
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
