import type { MetadataRoute } from "next";
import { LOCALES, PAIN_SLUGS } from "@/lib/i18n/types";
import { SITE_URL } from "@/lib/config";
import { getAllArticleSlugs } from "@/lib/datocms";

const CHECKLIST_TYPES = ["qualified", "generic"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

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
