# MoveOS — Move-Out Review Landing Page (MVP)

A single-page Next.js 14 + Tailwind CSS landing page for Meta (Instagram/Facebook) ads.
Goal: get the visitor to leave their phone number and book a free 15-minute
"Move-Out Review" call — not to sell anything directly.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- No external UI/icon libraries (icons are hand-rolled inline SVG, outline style)
- No database — lead capture is a stateless API route (see below)

## Local setup

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

- `NEXT_PUBLIC_META_PIXEL_ID` — your Meta Pixel ID. If set, the pixel fires
  `PageView` on load and `Lead` when the form is submitted successfully.
- `LEAD_WEBHOOK_URL` — a webhook that receives every submitted lead as JSON
  (`{ phone, consent, source, page, userAgent, createdAt }`). Point this at
  Zapier, Make, n8n, a Telegram bot, or your CRM's inbound webhook so leads
  land somewhere durable. **Without this, leads only appear in server logs —
  set it before running real ad spend.**

## Pages

- `/` — the landing page (Hero, What You'll Get, Why Trust Us, Did You Know,
  Our Promise, final CTA — each with a phone capture form).
- `/thank-you` — shown after a successful submission. Also useful as a
  Meta "URL contains" custom conversion if you'd rather not rely on the pixel
  `Lead` event alone.
- `/privacy` — placeholder privacy policy. **Must be replaced with a real,
  reviewed policy before running ads** — Meta requires a privacy policy link
  for any ad collecting personal data, and GDPR applies since this targets
  Barcelona.

## Before running ads

1. Replace `/privacy` with a real policy.
2. Set `LEAD_WEBHOOK_URL` so leads don't only live in server logs.
3. Set `NEXT_PUBLIC_META_PIXEL_ID` and verify the `Lead` event fires (Meta
   Events Manager → Test Events).
4. Swap placeholder copy/branding as needed and deploy (e.g. Vercel).

## A note on validating the hypothesis faster

This repo is a full custom build, which is the right call if you want pixel
tracking, full design control, and a clean base to iterate on. But if the
main open question right now is *"will this offer + audience convert on
Meta at all"* rather than *"what should the final product look like,"* there
are faster ways to get a signal before investing in a custom app:

- **Meta Instant Forms (Lead Ads)** — skips a landing page entirely; the
  form opens natively inside Instagram/Facebook, pre-fills the phone number,
  and typically converts better *and* cheaper than sending traffic off-platform.
  You lose the branded page, but for a pure "should we chase this hypothesis"
  test it's the fastest path to a real cost-per-lead number.
- **A no-code page (Tally, Typeform, Unbounce) behind the ad** — same
  low-friction phone-capture idea, live in under an hour, no deploy needed.

If early signal looks good, this Next.js site is the natural next step for a
branded, pixel-tracked, fully-controlled version. Worth deciding which
question you're answering first — "does this offer work?" vs. "does this
exact page convert?" — since the cheaper tests answer the first one faster.
