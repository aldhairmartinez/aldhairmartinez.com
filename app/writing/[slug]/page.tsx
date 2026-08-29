import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { StatusDot } from "@/components/ui/StatusDot";
import { Container } from "@/components/ui/Container";
import { getAllArticles, getArticleBySlug } from "@/lib/content";
import { articleStatusMeta } from "@/lib/status";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/writing/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.summary,
  };
}

export default async function ArticlePage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter, html } = article;
  const meta = articleStatusMeta[frontmatter.status];

  return (
    <Container>
      <div className="flex flex-col gap-4 border-b border-border py-16">
        <Link
          href="/writing"
          className="font-mono text-xs uppercase tracking-wide text-text-muted hover:text-text-primary"
        >
          ← All writing
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            {frontmatter.title}
          </h1>
          <StatusDot status={meta.status} label={meta.label} />
        </div>
        <p className="max-w-2xl text-base leading-relaxed text-text-muted">
          {frontmatter.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>

      <div
        className="prose-technical py-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Container>
  );
}
