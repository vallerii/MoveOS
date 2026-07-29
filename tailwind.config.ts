import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0EA5A8",
          "primary-dark": "#0B8285",
          secondary: "#2E7D32",
          background: "#FAF8F3",
          accent: "#F4B942",
          ink: "#1C2321",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      // Explicit type scale (see hierarchy notes below) — each tier is a
      // single utility (`text-hero`, `text-section`, etc.) that bundles
      // size, line-height, letter-spacing and weight together, instead of
      // stacking ad hoc text-*/font-* classes per usage.
      //   hero        — page-level h1
      //   section     — section h2
      //   subheading  — intro copy under a section heading
      //   card-title  — headings inside cards/steps
      //   body        — running paragraph text
      //   small       — fine print, meta labels
      // hero/section/subheading/card-title use clamp() so the size itself
      // scales fluidly from mobile up to the desktop max (62/48/22/24px) —
      // no sm:/md:/lg: prefixes needed at the call site.
      fontSize: {
        hero: ["clamp(2.125rem, 1.3rem + 4vw, 3.875rem)", { lineHeight: "1.05", letterSpacing: "-0.04em", fontWeight: "800" }],
        section: ["clamp(1.75rem, 1.2rem + 2.8vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "800" }],
        subheading: ["clamp(1.0625rem, 0.92rem + 0.7vw, 1.375rem)", { lineHeight: "1.6", fontWeight: "500" }],
        "card-title": ["clamp(1.1875rem, 1.05rem + 0.7vw, 1.5rem)", { lineHeight: "1.3", fontWeight: "700" }],
        body: ["18px", { lineHeight: "1.7", fontWeight: "400" }],
        small: ["16px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,35,33,0.04), 0 8px 24px rgba(28,35,33,0.06)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
