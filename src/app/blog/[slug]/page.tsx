import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageShell from "@/components/v2/PageShell";
import CtaBand from "@/components/v2/CtaBand";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/site";
import { BLOG_POSTS, getBlogPost, readingMinutes } from "@/lib/blogPosts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: { absolute: `${post.title} — Broll` },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Related posts: the curated list first (skipping slugs that don't exist
  // yet), then same-category posts, three in all.
  const related = [
    ...(post.relatedSlugs ?? []).map(getBlogPost),
    ...BLOG_POSTS.filter((p) => p.eyebrow === post.eyebrow),
  ]
    .filter((p): p is NonNullable<typeof p> => !!p && p.slug !== post.slug)
    .filter((p, i, all) => all.findIndex((q) => q.slug === p.slug) === i)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${SITE_URL}/blog/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        url: `${SITE_URL}/blog/${post.slug}`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        author: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
      },
      breadcrumbJsonLd(post.title, `/blog/${post.slug}`),
    ],
  };

  return (
    <PageShell jsonLd={structuredData}>
      <article className="mx-auto box-border flex max-w-[1440px] flex-col px-6 lg:px-10 pt-20 md:pt-24">
        <header className="flex max-w-[880px] flex-col gap-6 border-b border-line-2 pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[13px] text-muted">
            <Link href="/blog" className="hover:text-ink">
              BLOG
            </Link>
            <span aria-hidden>/</span>
            <span className="text-red">{post.eyebrow.toUpperCase()}</span>
          </nav>
          <h1 className="m-0 text-[clamp(36px,5vw,68px)] leading-[1.04] font-semibold tracking-[-0.045em] text-balance">
            {post.title}
          </h1>
          <p className="m-0 max-w-[680px] text-lg leading-[1.6] text-soft md:text-[19px]">{post.description}</p>
          <span className="font-mono text-[13px] text-muted">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}{" "}
            · {readingMinutes(post)} min read · Broll team
          </span>
        </header>
        <div className="flex max-w-[760px] flex-col gap-12 py-14">
          {post.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-4">
              <h2 className="m-0 text-[clamp(24px,2.6vw,32px)] leading-[1.15] font-semibold tracking-[-0.03em]">
                {section.heading}
              </h2>
              {section.paragraphs.map((para) => (
                <p key={para} className="m-0 text-[17px] leading-[1.75] text-soft">
                  {para}
                </p>
              ))}
              {section.list && (
                <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[17px] leading-[1.6] text-ink-2">
                      <span className="mt-[11px] size-2 shrink-0 rounded-[2px] bg-crimson" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto box-border max-w-[1440px] px-6 lg:px-10 pb-8">
          <div className="flex flex-col gap-8 border-t border-line-2 pt-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="h-section">Keep reading.</h2>
              <Link href="/blog" className="link-arrow">
                All guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="flex min-h-[220px] flex-col gap-3.5 rounded-[20px] border border-line bg-[#0C0D15] p-7 text-ink transition-colors hover:border-wine-line"
                >
                  <span className="mono-label">{r.eyebrow.toUpperCase()}</span>
                  <h3 className="m-0 text-[21px] leading-[1.25] font-semibold tracking-[-0.02em]">{r.title}</h3>
                  <span className="mt-auto font-mono text-xs text-muted">{readingMinutes(r)} min read</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand heading="Try agentic editing on your own footage." secondaryLabel="Explore the product" secondaryHref="/product" />
    </PageShell>
  );
}
