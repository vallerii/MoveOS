"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n/types";

/**
 * The Next.js root layout (app/layout.tsx) owns the single <html> tag and
 * can't know the locale of nested routes. This sets `lang` on the client
 * once we know which locale segment rendered.
 */
export default function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
