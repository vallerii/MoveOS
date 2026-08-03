import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { render } from "datocms-structured-text-to-html-string";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/datocms";

type Params = { locale: string; slug: string };

function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

// Short local copy — this page doesn't fit the shared `Dictionary` type
// (only one string needed), same reasoning as lib/i18n/home.ts for why the
// homepage keeps its own small dictionary instead of widening the shared
// one for a single page.
const BACK_LABEL: Record<Locale, string> = {
  en: "← Back to homepage",
  es: "← Volver al inicio",
  ru: "← На главную",
};

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

  return (
    <main className="py-16 sm:py-24">
      <div className="container-page max-w-3xl">
        <Link href={`/${locale}`} className="text-small font-semibold text-brand-primary hover:text-brand-primary-dark">
          {BACK_LABEL[locale]}
        </Link>

        <h1 className="mt-6 text-section text-brand-ink">{article.title}</h1>
        {article.description && <p className="mt-4 text-subheading text-brand-ink/70">{article.description}</p>}

        {article.image && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
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
      </div>
    </main>
  );
}
