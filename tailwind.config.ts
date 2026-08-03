import type { Config } from "tailwindcss";

/**
 * Design system: "Steep" — serif analytics on warm paper.
 *
 * Near-monochrome white canvas, editorial serif display type at weight 400,
 * a single warm peach accent used at most once per page, hairline borders,
 * 24px card radius, fully-rounded pill buttons, and shadow reserved
 * exclusively for floating product artifacts.
 *
 * Tokens below mirror the reference `variables.css` / `theme.css` 1:1 —
 * translated from the Tailwind v4 `@theme` syntax into this project's
 * v3 `theme.extend` config.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Steep palette. `ink` is the ONLY dark surface in the system —
        // every CTA and headline resolves to it. The peach/brown pair is
        // the only chroma allowed; nothing else is introduced.
        ink: "#17191c",
        paper: "#ffffff",
        mist: "#f2f2f3",
        fog: "#fafafb",
        slate: "#777b86",
        ash: "#979799",
        smoke: "#a3a6af",
        peach: "#fbe1d1",
        sienna: "#5d2a1a",
        hairline: "#ececec",
      },
      fontFamily: {
        // NOTE the inner quotes on "Source Serif 4" — they are load-bearing.
        // Tailwind writes family lists verbatim, so an unquoted entry emits
        // `font-family:Source Serif 4,...`. A bare `4` isn't a valid CSS
        // identifier (identifiers can't start with a digit), which makes the
        // whole declaration invalid and the browser drops it — the headline
        // then silently falls back to the body sans. Any family name with a
        // digit or a space needs quoting here.
        //
        // Signifier substitute — the display/headline serif. Stays at
        // weight 400 at every size; that restraint is the signature.
        display: ['"Source Serif 4"', "ui-serif", "Georgia", "serif"],
        // Sohne substitute — the body/UI/nav workhorse.
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      // Steep type scale. Display/heading tiers use clamp() so the serif
      // scales fluidly down to mobile instead of needing sm:/md:/lg:
      // prefixes at each call site; the upper bound of each clamp is the
      // exact token size (90 / 64 / 44 / 26px).
      //
      // Tracking gets tighter as size grows — that's the typographic
      // signature: -0.025em at display, -0.015em at heading, -0.009em at
      // the 26/18px tiers, 0 at body sizes.
      fontSize: {
        // Floor and slope both lowered from the original clamp(2.75rem,
        // 1.6rem + 5.2vw, 5.625rem) — at narrow phone widths (~320-390px)
        // the old curve floored at 2.75rem/44px, which was wide enough to
        // wrap short lines like "с уверенностью." mid-phrase (orphaning a
        // single word, e.g. just "с", on its own line). The steeper slope
        // (6.3vw vs 5.2vw) means this still reaches the same 5.625rem max
        // at the same ~1238px viewport width the old curve did, so tablet/
        // desktop sizing is effectively unchanged — only the narrow-phone
        // end of the curve moved.
        display: ["clamp(2rem, 0.75rem + 6.3vw, 5.625rem)", { lineHeight: "1.12", letterSpacing: "-0.025em", fontWeight: "400" }],
        "heading-lg": ["clamp(2.25rem, 1.5rem + 3.4vw, 4rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "400" }],
        heading: ["clamp(1.875rem, 1.35rem + 2.2vw, 2.75rem)", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "400" }],
        "heading-sm": ["clamp(1.375rem, 1.2rem + 0.75vw, 1.625rem)", { lineHeight: "1.18", letterSpacing: "-0.009em", fontWeight: "400" }],
        subheading: ["1.375rem", { lineHeight: "1.5", letterSpacing: "-0.009em", fontWeight: "400" }],
        "body-lg": ["1.25rem", { lineHeight: "1.35", fontWeight: "400" }],
        body: ["1.0625rem", { lineHeight: "1.35", fontWeight: "400" }],
        caption: ["0.9375rem", { lineHeight: "1.5", fontWeight: "400" }],
        meta: ["0.875rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
      fontWeight: {
        // Half-step weights — the scale is finer than standard 400/500/700.
        // Reach for these before ever jumping to 500.
        w430: "430",
        w450: "450",
        w480: "480",
      },
      borderRadius: {
        // Two structural radii carry the system: 9999px on buttons,
        // 24px on content cards. Everything else is a supporting tier.
        image: "12px",
        input: "16px",
        "card-sm": "16px",
        artifact: "20px",
        card: "24px",
      },
      boxShadow: {
        // Shadow is rationed: content cards get NONE. Only floating
        // product artifacts (and overlays) earn elevation.
        artifact:
          "rgba(4, 23, 43, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
        overlay: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 40px 0px",
        popover: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.08) 0px 4px 24px 0px",
      },
      // Pinning the hero means committing it to exactly one viewport, so the
      // effect is only safe where its content actually fits — otherwise the
      // foot of it (the badges row) gets clipped by its own overflow. This
      // gates on height as well as width; below it the hero is an ordinary
      // block in the flow and nothing is lost but the effect.
      screens: {
        pin: { raw: "(min-width: 1280px) and (min-height: 780px)" },
      },
      maxWidth: {
        page: "1200px",
      },
      spacing: {
        section: "80px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
