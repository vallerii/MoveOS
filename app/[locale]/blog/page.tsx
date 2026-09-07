import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n/types";
import { getDictionary } from "@/lib/i18n";
import { getBlogCopy } from "@/lib/i18n/blog";
import { getAllArticles } from "@/lib/datocms";
import Breadcrumbs from "@/components/Breadcrumbs";
import Reveal from "@/components/Reveal";

// Same cadence as the article page: a new or edited article appears here
// within the hour without a redeploy.
export const revalidate = 3600;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!LOCALES.includes(params.locale as Locale)) return {};
  const locale = params.locale as Locale;
  const dict = getDictionary(locale);
  const { hub } = getBlogCopy(locale);
  const path = `/${locale}/blog`;

  return {
    title: `${hub.metaTitle}${dict.meta.titleSuffix}`,
    description: hub.metaDescription,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `/${l}/blog`])),
        "x-default": `/${DEFAULT_LOCALE}/blog`,
      },
    },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      type: "website",
      url: path,
      images: ["/og-image.png"],
    },
  };
}

/**
 * Guides hub — the parent every article page now links back up to, and the
 * one page that lists all of them.
 *
 * Fails soft, like everything else that talks to DatoCMS (see
 * lib/datocms.ts): if the CMS is unreachable the page still renders with
 * its heading and an honest empty state rather than 500-ing, which matters
 * more here than usual — this is a statically generated page that gets
 * regenerated on a timer.
 */
export default async function BlogHubPage({ params }: { params: { locale: string } }) {
  if (!LOCALES.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const { hub } = getBlogCopy(locale);
  const articles = await getAllArticles(locale);

  return (
    <main>
      <Breadcrumbs locale={locale} items={[{ label: hub.eyebrow }]} />

      <section className="container-page py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="tag">{hub.eyebrow}</p>
          <h1 className="mt-4 font-display text-heading-lg text-ink">{hub.h1}</h1>
          <p className="mt-6 text-body text-slate">{hub.intro}</p>
        </div>

        {articles.length === 0 ? (
          <p className="mt-16 max-w-xl text-caption text-ash">{hub.emptyState}</p>
        ) : (
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map(({ slug, title, description, image }) => (
              <Reveal key={slug}>
                <Link
                  href={`/${locale}/blog/${slug}`}
                  className="card-neutral flex h-full flex-col transition-colors hover:bg-[#eaeaec]"
                >
                  {image && (
                    <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-image">
                      <Image
                        src={image.url}
                        alt={image.alt ?? title}
                        fill
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h2 className="font-display text-heading-sm text-ink">{title}</h2>
                  {description && <p className="mt-3 text-caption text-slate">{description}</p>}
                  <span className="mt-auto pt-6 text-meta text-ash">{hub.readMore}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
