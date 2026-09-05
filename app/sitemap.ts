import type { MetadataRoute } from "next";
import { LOCALES, PAIN_SLUGS } from "@/lib/i18n/types";
import { HOST_LOCALES } from "@/lib/i18n/host";
import { HOST_FIRST_TIME_LOCALES } from "@/lib/i18n/hostFirstTime";
import { SITE_URL } from "@/lib/config";
import { getAllArticleSlugs } from "@/lib/datocms";

const CHECKLIST_TYPES = ["qualified", "generic"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Homepages — one per locale, and the highest-priority URLs on the site.
  // They were missing entirely: Google found them through internal links,
  // but nothing in the sitemap declared them or their hreflang set.
  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
      },
    });
  }

  // Landlord pages. Both are locale-gated at the route level (a locale
  // outside HOST_LOCALES / HOST_FIRST_TIME_LOCALES 404s), so the sitemap
  // iterates those lists rather than LOCALES — otherwise it would submit
  // URLs that answer 404, which Search Console reports as errors.
  for (const locale of HOST_LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}/host`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(HOST_LOCALES.map((l) => [l, `${SITE_URL}/${l}/host`])),
      },
    });
  }

  for (const locale of HOST_FIRST_TIME_LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}/host/first-time`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          HOST_FIRST_TIME_LOCALES.map((l) => [l, `${SITE_URL}/${l}/host/first-time`]),
        ),
      },
    });
  }

  // Pain pages are the main landing pages — one URL per locale × pain,
  // each pointing at its siblings via alternates so Google can tell they're
  // translations of the same page rather than duplicate content.
  for (const pain of PAIN_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}/${pain}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/${pain}`])),
        },
      });
    }
  }

  for (const type of CHECKLIST_TYPES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}/checklist/${type}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.4,
      });
    }
  }

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    });
  }

  // Articles from DatoCMS (see lib/datocms.ts) — same pattern as pain
  // pages, one URL per locale × slug.
  for (const locale of LOCALES) {
    const slugs = await getAllArticleSlugs(locale);
    for (const slug of slugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
