import "server-only";

/**
 * Minimal DatoCMS GraphQL Content Delivery API client — no SDK dependency,
 * just fetch(). Used to pull "Article" records into the homepage's trust
 * section (see components/Home/HomeTrust.tsx) and the article detail page
 * (app/[locale]/blog/[slug]/page.tsx), replacing what used to be hardcoded
 * copy in lib/i18n/home.ts.
 *
 * Requires DATOCMS_API_TOKEN (a DatoCMS "Content Delivery API" token — see
 * .env.example). Every helper here fails soft: on a missing token, network
 * error, or GraphQL error it logs and returns an empty result instead of
 * throwing, so a CMS hiccup never takes the homepage down — the trust
 * section just renders fewer/no article cards.
 */

const DATOCMS_GRAPHQL_ENDPOINT = "https://graphql.datocms.com/";

// DatoCMS locale codes for this project match the site's own Locale type
// exactly (en / es / ru), so no mapping is needed between the two.
export type ArticleLocale = "en" | "es" | "ru";

export type DatoImage = {
  url: string;
  alt: string | null;
  width: number;
  height: number;
};

export type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  image: DatoImage | null;
};

export type ArticleDetail = ArticleSummary & {
  content: { value: unknown } | null;
};

async function datocmsFetch<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    console.warn("[datocms] DATOCMS_API_TOKEN is not set — skipping fetch, no articles will render.");
    return null;
  }

  try {
    const res = await fetch(DATOCMS_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
      // Don't let a slow/unreachable DatoCMS stall the build or a page
      // request indefinitely.
      signal: AbortSignal.timeout(10_000),
      // ISR: re-fetch at most once an hour, so publishing/editing an
      // article in DatoCMS shows up on the site without a full redeploy.
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error(`[datocms] request failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = (await res.json()) as { data?: T; errors?: unknown };
    if (json.errors) {
      console.error("[datocms] GraphQL errors:", JSON.stringify(json.errors));
      return null;
    }

    return json.data ?? null;
  } catch (err) {
    console.error("[datocms] fetch threw:", err);
    return null;
  }
}

const ARTICLE_SUMMARY_FIELDS = `
  slug
  title
  description
  image {
    url
    alt
    width
    height
  }
`;

// The trust section's grid was built for exactly 3 fact cards plus a 4th,
// always-present CTA card in the same row (see HomeTrust.tsx) — capped
// here so publishing a 4th+ article doesn't silently break that layout.
const MAX_TRUST_ARTICLES = 3;

const TRUST_ARTICLES_QUERY = `
  query TrustArticles($locale: SiteLocale) {
    allArticles(locale: $locale, orderBy: _firstPublishedAt_DESC) {
      ${ARTICLE_SUMMARY_FIELDS}
    }
  }
`;

/** Published articles for the homepage "Прежде чем сдать ключи" trust section, newest first, capped at 3. */
export async function getTrustArticles(locale: ArticleLocale): Promise<ArticleSummary[]> {
  const data = await datocmsFetch<{ allArticles: ArticleSummary[] }>(TRUST_ARTICLES_QUERY, { locale });
  return (data?.allArticles ?? []).slice(0, MAX_TRUST_ARTICLES);
}

const ARTICLE_BY_SLUG_QUERY = `
  query ArticleBySlug($slug: String, $locale: SiteLocale) {
    article(filter: { slug: { eq: $slug } }, locale: $locale) {
      ${ARTICLE_SUMMARY_FIELDS}
      content {
        value
      }
    }
  }
`;

/** Single published article by slug, for the article detail page. */
export async function getArticleBySlug(slug: string, locale: ArticleLocale): Promise<ArticleDetail | null> {
  const data = await datocmsFetch<{ article: ArticleDetail | null }>(ARTICLE_BY_SLUG_QUERY, { slug, locale });
  return data?.article ?? null;
}

const ALL_ARTICLE_SLUGS_QUERY = `
  query AllArticleSlugs($locale: SiteLocale) {
    allArticles(locale: $locale) {
      slug
    }
  }
`;

/** All published slugs for a locale, for generateStaticParams on the article detail page. */
export async function getAllArticleSlugs(locale: ArticleLocale): Promise<string[]> {
  const data = await datocmsFetch<{ allArticles: { slug: string }[] }>(ALL_ARTICLE_SLUGS_QUERY, { locale });
  return (data?.allArticles ?? []).map((a) => a.slug);
}
