import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContentSection from "@/components/site/ContentSection";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/site";
import { BLOG_POSTS, getBlogPost, readingMinutes } from "@/lib/blogPosts";
import PageHero, { PageBody } from "@/components/site/PageHero";
import { Cover } from "@/components/site/BlogGrid";

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
    <div style={{ "--annbar-offset": "0px" } as CSSProperties}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow={post.eyebrow}
          title={post.title}
          lede={post.description}
          cta={{ href: "/early-access", label: "Try Broll — get early access" }}
          meta={
            <>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              · {readingMinutes(post)} min read · Broll team
            </>
          }
        />

        <article>
          <PageBody>
            {post.sections.map((section) => (
              <ContentSection key={section.heading} title={section.heading}>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </ContentSection>
            ))}
          </PageBody>
        </article>

        {related.length > 0 && (
          <section className="px-5 pt-16 pb-28 sm:px-8 md:pb-36">
            <div className="mx-auto max-w-6xl border-t border-line pt-16">
              <div className="flex items-end justify-between gap-6">
                <h2 className="font-display text-3xl md:text-4xl">Keep reading.</h2>
                <Link href="/blog" className="link-draw text-sm text-ink-2/75">
                  All guides
                </Link>
              </div>
              <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/blog/${r.slug}`} className="group block">
                      <Cover index={BLOG_POSTS.indexOf(r)} eyebrow={r.eyebrow} />
                      <p className="slate mt-5">{readingMinutes(r)} min read</p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-balance transition-colors duration-300 group-hover:text-red">
                        {r.title}
                      </h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
