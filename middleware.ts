import { NextResponse, type NextRequest } from "next/server";
import { ALL_LOCALES, LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";

/**
 * Retired locale prefixes — every locale that still has a dictionary but is
 * no longer served (see LOCALES in lib/i18n/types.ts). Today: es, ru.
 *
 * These URLs were live and linked (and are in Google's index), so they get a
 * permanent redirect to the English equivalent of the same page rather than
 * a 404: /ru/deposit → /en/deposit, /es/host/first-time → /en/host/first-time.
 * The moment a locale is added back to LOCALES it drops out of this list and
 * stops being redirected — nothing else needs changing.
 */
const RETIRED_LOCALES = ALL_LOCALES.filter((l) => !LOCALES.includes(l));

export function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  const first = segments[0] as Locale | undefined;

  if (first && RETIRED_LOCALES.includes(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${[DEFAULT_LOCALE, ...segments.slice(1)].join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, the API routes, and any request with a
  // file extension (the checklist PDFs, og-image.png, sitemap.xml, robots.txt).
  matcher: ["/((?!_next/|api/|.*\\.).*)"],
};
