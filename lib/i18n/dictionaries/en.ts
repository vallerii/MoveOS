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
  heroTrustBadges: ["Barcelona", "100% free", "15 minutes", "Personalised", "No obligation"],
  pains: {
    deposit: {
      eyebrow: "Free Deposit Protection Review · Barcelona",
      h1: "Don't Lose Your Deposit When You Move Out",
      subheading:
        "Most tenants lose part of their deposit simply because they don't know their rights. Get a free deposit review and find out what to do before handing back the keys — so you get it all back.",
      metaTitle: "Don't Lose Your Rental Deposit",
      metaDescription:
        "Free deposit check for Barcelona renters: what to do before handing back the keys so you get your full deposit back — no common mistakes.",
      heroCta: "Get My Deposit Review",
      shortLabel: "Deposit",
    },
    admin: {
      eyebrow: "Free Move-Out Admin Check · Barcelona",
      h1: "Moving Out Shouldn't Mean a Mountain of Paperwork",
      subheading:
        "A forgotten subscription or unpaid bill has a way of showing up months after you move. Get a free move-out admin review so nothing slips through the cracks.",
      metaTitle: "Moving-Out Admin Checklist",
      metaDescription:
        "Free move-out admin review for Barcelona renters: subscriptions, bills, address changes — so nothing comes back to bite you later.",
      heroCta: "Get My Admin Review",
      shortLabel: "Moving Admin",
    },
    belongings: {
      eyebrow: "Free Move-Out Review · Barcelona",
      h1: "Don't Let Your Old Furniture Become a Problem",
      subheading:
        "Furniture and belongings you can't take with you are a common source of last-minute stress and cost. Get a free review and a clear plan for what to do with them.",
      metaTitle: "What To Do With Old Furniture",
      metaDescription:
        "Free move-out review for Barcelona renters: a clear plan for what to do with furniture and belongings you can't take with you.",
      heroCta: "Get My Belongings Review",
      shortLabel: "Furniture & Belongings",
    },
    urgent: {
      eyebrow: "Free Urgent Move-Out Review · Barcelona",
      h1: "Moving Out Earlier Than Planned? Do It Right.",
      subheading:
        "Moving out earlier than planned often costs more than you'd expect — in penalties and lost deposit. Get a free urgent move-out review before you give notice.",
      metaTitle: "Moving Out Early? Do It Right",
      metaDescription:
        "Moving out earlier than planned? Free urgent move-out review for Barcelona renters — avoid penalties and protect your deposit.",
      heroCta: "Get My Urgent Move-Out Review",
      shortLabel: "Urgent Move-Out",
    },
    buyout: {
      eyebrow: "Lease Buyout · Barcelona",
      h1: "Want a Bonus for Moving Out and Your Deposit Back?",
      subheading:
        "You've been renting well below today's market price and you're planning to move out — book a free 15-minute consultation.\nWe'll go through your situation, estimate a possible bonus, and explain how to get your deposit back the same day, without the usual month-long wait.",
      metaTitle: "Bonus for Moving Out, Deposit Back",
      metaDescription:
        "If your rent is below market price, you may get a bonus for moving out plus your deposit back the same day. Free consultation in Barcelona.",
      heroCta: "Book a Free Consultation",
      heroCtaMobile: "Book a Consultation",
      shortLabel: "Lease Buyout",
      howItWorks: {
        heading: "How It Works",
        subheading: "No hidden catch — here's what happens at each step.",
        steps: [
          {
            title: "Free consultation (15 minutes)",
            body: "Tell us about your lease: how much you pay, how long you've been renting, when you're planning to move out. No documents needed at this stage.",
          },
          {
            title: "We estimate the gap with the market",
            body: "We compare your rent with current prices in the area. If your lease is well below market, the right to it has real value.",
          },
          {
            title: "We buy out that right",
            body: "In effect, we pay you to give up the lease, because it's worth money on today's market. That's where the bonus comes from — compensation for the right you're giving up, not a gift.",
          },
          {
            title: "Exact numbers",
            body: "If it looks promising, you send us the lease itself — you'll have an offer with a specific amount within the hour.",
          },
          {
            title: "You decide",
            body: "If you agree, we handle the deal and your deposit comes back the day you move out. If not, you pay nothing and lose nothing.",
          },
        ],
      },
    },
    repair: {
      eyebrow: "Minor Repairs Before Handover · Barcelona",
      h1: "Small Repairs Before You Move Out — So You Get Your Full Deposit Back",
      subheading:
        "We only fix what actually matters for getting your deposit back — no full renovation, no overpaying. Send us before/after photos and we'll tell you exactly what's worth repairing.",
      metaTitle: "Small Repairs Before You Move Out",
      metaDescription:
        "We only fix what's needed to get your deposit back — no full renovation, no overpaying. Free repair assessment from before/after photos.",
      heroCta: "Get a Repair Assessment",
      shortLabel: "Minor Repairs",
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
      {
        badge: "Missed Value",
        title: "Just walking away means losing a payout you didn't even know you could get",
        pains: ["buyout"],
      },
      {
        badge: "Slow Refund",
        title: "A standard deposit return can take a month — not a day",
        pains: ["buyout"],
      },
      {
        badge: "DIY Valuation",
        title: "Without an independent market comparison, it's hard to know what your lease is really worth",
        pains: ["buyout"],
      },
      {
        badge: "Overdoing It",
        title: "Repairing things that aren't even damage is money down the drain",
        pains: ["repair"],
      },
      {
        badge: "Wrong Contractor",
        title: "A regular repair crew doesn't know what landlords actually check at handover",
        pains: ["repair"],
      },
      {
        badge: "Small Details",
        title: "One missed scratch or nail hole can cost you part of your deposit",
        pains: ["repair"],
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
      buyout: [
        {
          q: "Your old lease might be worth money.",
          a: "If you're renting well below today's market price, that lease itself has real value — you may be able to get compensated for giving it up, instead of just walking away.",
        },
        {
          q: "Your deposit doesn't have to wait a month.",
          a: "When the deal is structured properly, your deposit can be paid out the day you move — not after the standard one-month legal wait.",
        },
        {
          q: "The assessment takes less than an hour.",
          a: "Send us your lease and you'll get an offer with a real number within the hour — no visits, no middlemen.",
        },
        {
          q: "The valuation risk is on us, not you.",
          a: "We assess the gap versus market price ourselves and take on the risk of the deal — the assessment itself costs you nothing.",
        },
      ],
      repair: [
        {
          q: "Not every scratch needs a repair.",
          a: "A landlord may try to charge you for what's actually normal wear and tear — knowing the difference before you pay is what matters.",
        },
        {
          q: "A full renovation isn't what you need before moving out.",
          a: "Often a spot touch-up on one wall or a single replaced tile is enough — not re-doing the whole apartment.",
        },
        {
          q: "Before/after photos settle a dispute faster than a repair crew.",
          a: "A well-documented condition — before and after the small fixes — clears up most landlord objections on its own.",
        },
        {
          q: "A minimal budget doesn't mean a lost deposit.",
          a: "As a repair company, we know exactly what landlords actually check at handover — and we only fix that.",
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
      buyout: "Here's how we help: we assess the gap versus market price, take on the deal's risk, and pay your deposit back the day you move — no month-long wait.",
      repair: "Here's how we help: we review your before/after photos, separate normal wear from real damage, and fix the minimum needed for your full deposit back.",
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
  },
  results: {
    qualified: {
      badge: "You're a great fit ✅",
      heading: "Let's get you moved out with zero stress",
      body: "Grab your checklist below and book your free 15-minute call — or just email us directly.",
      bookingHeading: "Let's talk through your specific situation",
      bookingBody: "A free 15-minute call — pick any time that works, no obligation.",
      bookingButton: "Pick a time",
      emailAltText: "Or email us directly",
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
    viewChecklistButton: "Open checklist",
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
      title: "Move-Out Checklist for Your Barcelona Apartment",
      intro:
        "The idea behind this checklist: once you hand back the keys, you should have a complete evidence pack proving the condition you left it in and that every obligation is closed.",
      sections: [
        {
          heading: "1. Your lease and the move-in report",
          items: [
            "Pull up your lease and the original move-in inventory report: what it listed, whether there was an inventario, what damage and photos were recorded when you moved in.",
            "Check what your lease says about painting, walls, furniture, cleaning — by law, minor wear from normal use is the tenant's responsibility, but the apartment doesn't need to look brand new.",
          ],
        },
        {
          heading: "2. Minor repairs — the minimum needed",
          items: [
            "Fill in your own holes, remove your own fixtures, fix any damage you clearly caused.",
            "Don't repaint the whole apartment automatically — compare against the move-in condition and your lease terms first.",
          ],
        },
        {
          heading: "3. A genuinely full clean",
          items: [
            "Kitchen, oven, fridge, inside the cabinets, bathroom, toilet, shower, windows, balcony/terrace, storage room, furniture — each one, not just a general once-over.",
          ],
        },
        {
          heading: "4. Photos — as thorough as possible",
          items: [
            "Every room from four angles, plus the floor, ceiling, walls, doors, windows.",
            "Radiators/AC units, furniture, inside the cabinets, kitchen appliances, inside the fridge, the oven, the sink.",
            "Bathroom/shower, toilet, balcony, storage room, and the parking spot if it's part of the lease.",
            "Close-ups of anywhere that could realistically become a dispute. Don't hold back on how many photos you take.",
          ],
        },
        {
          heading: "5. One continuous video of the whole apartment",
          items: [
            "Start at the front door and walk through without stopping: entrance → rooms → cabinets → kitchen → appliances → bathroom → toilet → balcony → storage room.",
            "Say the handover date and address out loud on the recording.",
            "End the video on the meter readings — together with the photos, this gives far stronger evidence than ten random photos.",
          ],
        },
        {
          heading: "6. Meter readings",
          items: [
            "On handover day, photograph the electricity, gas, and water meters so the meter number and reading are both visible.",
            "Keep your most recent bills.",
          ],
        },
        {
          heading: "7. The handover report (acta de entrega)",
          items: [
            "Draft a document (acta de entrega de llaves / documento de finalización del arrendamiento) with the address, date and time, who handed over and who received, the apartment's condition, and the meter readings.",
            "State the exact number and type of keys handed over: building entrance, apartment, mailbox, parking, garage remote, and so on.",
            "Get signatures from both parties.",
            "Try to get wording along the lines of \"La vivienda se entrega en correcto estado, sin daños pendientes\" — it's much harder for anyone to suddenly \"find\" damage three weeks later.",
            "To get your deposit back, INCASÒL specifically asks for a document like this signed by both parties (or other proof the property was handed back).",
          ],
        },
        {
          heading: "8. Every key, handed over on record",
          items: [
            "Photograph the keys before handover, e.g.: Apartment — 3, Building — 2, Mailbox — 1, Garage remote — 1.",
            "That count should match what's written in the signed report — it seems trivial until a locksmith's bill shows up a month later.",
          ],
        },
        {
          heading: "9. Sort out your deposit (fianza)",
          items: [
            "Get confirmation that the fianza was registered with INCASÒL.",
            "Request the deposit refund in writing.",
            "Include the IBAN the money should be sent to.",
            "Record the exact handover date — the refund deadline is counted from it.",
            "Don't agree to any deduction without a written explanation and supporting evidence.",
            "Keep in mind: when a lease ends, it's the landlord who requests the deposit refund from INCASÒL, and INCASÒL pays the landlord, not you directly — worth checking that they've actually filed the request.",
            "Legal anchor: under Article 36 of the LAU, if a month has passed since the handover date and the deposit hasn't been returned, the amount starts accruing legal interest!",
          ],
        },
        {
          heading: "10. Close out your utilities and services",
          items: [
            "Electricity and gas: check with your landlord first — a change of account holder (cambio de titular) or a full cancellation. Cutting the power and gas isn't always the right call.",
            "Separately close water, internet, mobile/fibre tied to the address, alarm system, home insurance, parking/garage — keep the cancellation confirmation numbers.",
          ],
        },
        {
          heading: "11. Check your final payments",
          items: [
            "Confirm rent, electricity, gas, water, internet, parking, and any other payments your lease made you responsible for are all settled.",
            "Keep the payment confirmations.",
          ],
        },
        {
          heading: "12. Send your landlord a final letter",
          items: [
            "On handover day, send a letter/email: the date, the apartment's address, confirmation it's been fully vacated and handed back, that all keys were handed over, the meter readings, a link to your photos, and a request to return the deposit to your IBAN.",
            "This creates one more dated, written record — easy to produce if a dispute comes up later.",
          ],
        },
        {
          heading: "How we can help",
          items: [
            "Lease and move-in report: we go through them and tell you plainly what counts as normal wear under the law and what doesn't, so you're not billed for something that isn't your responsibility.",
            "Minor repairs: if something genuinely needs fixing, our repair crew does targeted, minimal work — only what actually affects your deposit, with no spend on a full renovation.",
            "Cleaning: we tell you which areas to prioritise first, based on what landlords actually check at handover.",
            "Photos and video: we help you shoot the full evidence from this list, or review what you've already shot, so you end up with real proof of the apartment's condition — not a few random shots.",
            "Meter readings: we make sure they're taken and recorded together with the handover report, not lost in email threads.",
            "Handover report: we draft it with legally precise wording and make sure both parties actually sign it — your main defence against a claim raised after the fact.",
            "Keys: we record the exact number and type of keys handed over in the report, so one \"forgotten\" key can't become a reason to delay your refund.",
            "Fianza and INCASÒL: we file the deposit refund request, check that the landlord has actually applied to INCASÒL, and claim the legal interest under Article 36 of the LAU if the deadline is missed.",
            "Utility contracts: we close or transfer electricity, gas, water, internet, and insurance, and collect the cancellation confirmations, so an unexpected bill doesn't show up six months later.",
            "Final payments: we check everything is settled before handover, so the landlord has no formal excuse to delay the refund.",
            "Final letter: we draft and send the landlord a closing letter with the date, meter readings, and refund request, so your handover date is legally on record.",
            "At any of these stages, if the landlord is slow to respond, refuses to sign the report, or tries to withhold money without grounds, we negotiate with them directly on your behalf.",
          ],
        },
      ],
      disclaimer:
        "This is general information, not legal advice. Rules vary by region and contract — check your specific situation.",
    },
  },
  checklistPage: {
    backLink: "← Back to the site",
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
