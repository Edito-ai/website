import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import ContentSection from "@/components/site/ContentSection";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/site";
import { BLOG_POSTS, getBlogPost } from "@/lib/blogPosts";

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
      <main className="relative overflow-hidden px-5 pt-32 pb-24 sm:px-6 sm:pt-36 md:pt-44">
        <div
          aria-hidden
          className="animate-drift absolute -top-1/4 left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,var(--accent-soft),transparent_60%)] opacity-40"
        />

        <article className="relative mx-auto max-w-2xl">
          <p className="font-mono text-xs tracking-widest text-muted uppercase">
            {post.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-balance md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">{post.description}</p>

          <div className="mt-10">
            <Link
              href="/demo"
              className="btn-liquid relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--accent),0_8px_32px_-8px_var(--accent)]"
            >
              Try Broll — book a demo
            </Link>
          </div>

          <div className="mt-16">
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
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link href="/blog" className="text-accent underline underline-offset-4">
              ← Back to all posts
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
