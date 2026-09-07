import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { render } from "datocms-structured-text-to-html-string";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/datocms";
import { getBlogCopy } from "@/lib/i18n/blog";
import { BOOKING_URL } from "@/lib/config";
import Breadcrumbs from "@/components/Breadcrumbs";
import PillButton from "@/components/PillButton";

type Params = { locale: string; slug: string };

function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

// Re-fetched at most once an hour (see lib/datocms.ts) — new/edited slugs
// show up without a full redeploy even though the page is statically
// generated at build time for slugs known then.
export const revalidate = 3600;

export async function generateStaticParams() {
  return (
    await Promise.all(
      LOCALES.map(async (locale) => {
        const slugs = await getAllArticleSlugs(locale);
        return slugs.map((slug) => ({ locale, slug }));
      })
    )
  ).flat();
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  if (!isValidLocale(params.locale)) return {};
  const { locale, slug } = params;
  const article = await getArticleBySlug(slug, locale);
  if (!article) return {};

  const path = `/${locale}/blog/${slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/blog/${slug}`])),
        "x-default": `/${DEFAULT_LOCALE}/blog/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: path,
      images: article.image ? [article.image.url] : ["/og-image.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: article.image ? [article.image.url] : ["/og-image.png"],
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  if (!isValidLocale(params.locale)) notFound();
  const { locale, slug } = params;

  const article = await getArticleBySlug(slug, locale);
  if (!article) notFound();

  const contentHtml = article.content ? render(article.content) : null;
  const copy = getBlogCopy(locale);

  return (
    <main className="bg-paper pb-16 sm:pb-section">
      {/* `narrow` keeps the trail on the article's own 3xl measure while the
          sticky band still spans the viewport. */}
      <Breadcrumbs
        locale={locale}
        items={[{ label: copy.article.sectionLabel, href: "/blog" }, { label: article.title }]}
        narrow
      />

      <div className="container-page max-w-3xl pt-10">
        <h1 className="font-display text-heading-lg text-ink">{article.title}</h1>
        {article.description && <p className="mt-4 text-body text-slate">{article.description}</p>}

        {article.image && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-card">
            <Image
              src={article.image.url}
              alt={article.image.alt ?? article.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {contentHtml && (
          <div className="article-content mt-10" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        )}

        {/* An article used to end on a single "back to homepage" link, which
            left every reader who finished it at a dead end and gave the
            article no outgoing links at all. It now closes the way the rest
            of the site does: two places to continue reading, then the same
            free-call ask. */}
        <div className="mt-16 border-t border-hairline pt-8">
          <p className="tag">{copy.article.readNextHeading}</p>
          <nav className="mt-4 flex flex-col gap-3">
            <Link
              href={`/${locale}/glossary`}
              className="text-caption text-slate transition-colors hover:text-ink"
            >
              {copy.article.glossaryLink}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-caption text-slate transition-colors hover:text-ink"
            >
              {copy.article.allGuidesLink}
            </Link>
          </nav>
        </div>

        <div className="card-neutral mt-10">
          <h2 className="font-display text-heading-sm text-ink">{copy.article.ctaHeading}</h2>
          <p className="mt-3 max-w-xl text-caption text-slate">{copy.article.ctaBody}</p>
          <div className="mt-8">
            <PillButton href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              {copy.article.ctaButton}
            </PillButton>
          </div>
        </div>
      </div>
    </main>
  );
}
