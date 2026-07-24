# MoveOS — Move-Out Qualifier Landing Pages (MVP)

A Next.js 14 + Tailwind CSS site for Meta (Instagram/Facebook) ads, testing
Barcelona-renter acquisition. Four landing pages, each opening on a different
pain point, all leading into the same multi-step qualifier quiz. The quiz
routes each visitor to either a free 15-minute call (if they're a fit) or a
free checklist (if not) — and gives everyone a downloadable PDF checklist
either way.

## Stack

- Next.js 14 (App Router, TypeScript), statically generated per locale × pain
- Tailwind CSS
- `@fontsource/inter` (self-hosted, includes Cyrillic) instead of
  `next/font/google` — no Google Fonts fetch at build time
- No external UI/icon libraries (icons are hand-rolled inline SVG, outline style)
- No database — lead capture is a stateless API route (see below)
- Static PDF checklists (generated once, committed to `public/checklists/`)

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/ru/deposit` (change the
default locale in `lib/i18n/types.ts` if you'd rather lead with EN or ES).

## Site structure

Four pains × three locales = 12 landing pages, all sharing one template:

| Pain slug     | Angle                                              |
|---------------|-----------------------------------------------------|
| `deposit`     | Getting your deposit back / avoiding disputes       |
| `admin`       | Utilities, address changes, bureaucracy at move-out |
| `belongings`  | What to do with furniture/things you're leaving     |
| `urgent`      | Moving out earlier than planned                     |

Locales: `en`, `es`, `ru` — e.g. `/ru/deposit`, `/es/urgent`, `/en/admin`.

Each page is nearly identical (What We'll Cover, Why Trust Us, Did You Know,
Our Promise are 100% shared per locale) — only the hero headline/eyebrow and
a couple of highlighted "What We'll Cover" items change per pain, so the
accent is on the specific pain without maintaining four different pages of
copy per language.

All copy lives in `lib/i18n/dictionaries/{en,es,ru}.ts`. Add a language by
creating a new dictionary file matching `lib/i18n/types.ts`'s `Dictionary`
shape, adding the locale to `LOCALES` in `lib/i18n/types.ts`, and adding it to
the `dictionaries` map in `lib/i18n/index.ts`.

## The quiz (qualifier)

`components/Quiz/QuizWizard.tsx` — a four-step, choice-based flow (no free
text except name/phone at the end):

1. City (Barcelona / other)
2. When they're moving out (already / <1mo / 1–3mo / 3mo+ or unsure)
3. Which pain matters most right now (pre-selects the pain of the landing
   page they arrived on, but they can change it)
4. Name (optional) + phone + consent → submits

**Qualification rule** (in `QuizWizard.tsx`, function `isQualified`):
Barcelona **and** moving within the next 3 months — matches "our person" as
scoped with the team. Change the logic there if the criteria evolve.

- **Qualified** → shown a "book your free 15-minute call" CTA
  (`NEXT_PUBLIC_BOOKING_URL`) + the detailed Barcelona checklist.
- **Not qualified** → shown just the general "moving out in Spain" checklist,
  no booking CTA.

Every submission (qualified or not) is POSTed to `/api/lead` with all quiz
answers, so nothing is lost — you can see who didn't qualify and why.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

- `NEXT_PUBLIC_BOOKING_URL` — **required before going live.** The Google
  Calendar "Appointment schedule" booking page link (Google Calendar →
  Settings → Appointment schedules → create one → copy the booking page
  link). Until set, a non-functional placeholder is used.
- `NEXT_PUBLIC_META_PIXEL_ID` — your Meta Pixel ID. If set, the pixel fires
  `PageView` on load and `Lead` when the quiz is submitted successfully.
- `LEAD_WEBHOOK_URL` — a webhook that receives every submitted lead as JSON:
  `{ name, phone, consent, source, locale, landingPain, city, timeframe,
  selectedPain, qualified, page, userAgent, createdAt }`. Point this
  at Zapier, Make, n8n, a Telegram bot, or your CRM's inbound webhook.
  **Without this, leads only appear in server logs.**

## Checklist PDFs

`public/checklists/{en,es,ru}/{generic,qualified}.pdf` — pre-generated,
static files linked from the quiz result screen. The source content lives in
`lib/i18n/dictionaries/*.ts` under `checklist.generic` / `checklist.qualified`
(so on-page text and the PDF stay in sync); regenerate the PDFs with the
script the assistant used (`reportlab`, DejaVu font for Cyrillic) if you edit
that copy — the script isn't checked into this repo, so re-run it from the
same content or rebuild your own generator pointing at those dictionaries.

## Before running ads

1. Set `NEXT_PUBLIC_BOOKING_URL` to a real Google Calendar booking link.
2. Replace `/[locale]/privacy` with a real, reviewed policy in all three
   locales — Meta requires a privacy policy link for any ad collecting
   personal data, and GDPR applies since this targets Barcelona.
3. Set `LEAD_WEBHOOK_URL` so leads don't only live in server logs.
4. Set `NEXT_PUBLIC_META_PIXEL_ID` and verify the `Lead` event fires (Meta
   Events Manager → Test Events).
5. Point each ad set at the matching pain + locale combination
   (e.g. a "deposit dispute" ad in Russian → `/ru/deposit`).

## Node version note

This repo targets Next.js 14.2.5. If `npm run build` or `npm run dev` hangs
with no output on your machine, check `node -v` — Next 14 was built before
Node 22 existed and some environments see build workers stall on very new
Node majors. Node 18.x or 20.x LTS is the safe choice until upgrading to a
newer Next major.
