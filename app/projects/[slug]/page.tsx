import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { StatusDot } from "@/components/ui/StatusDot";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { projectStatusMeta, isAccentProjectTag } from "@/lib/status";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { frontmatter, html } = project;
  const meta = projectStatusMeta[frontmatter.status];

  return (
    <Container>
      <div className="flex flex-col gap-4 border-b border-border py-16">
        <Link
          href="/projects"
          className="font-mono text-xs uppercase tracking-wide text-text-muted hover:text-text-primary"
        >
          ← All projects
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
            <Badge key={tag} accent={isAccentProjectTag(slug, tag)}>
              {tag}
            </Badge>
          ))}
        </div>
        {(frontmatter.githubUrl || frontmatter.externalUrl) && (
          <div className="flex gap-5 font-mono text-xs uppercase tracking-wide">
            {frontmatter.githubUrl && (
              <a
                href={frontmatter.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-secondary hover:text-text-primary"
              >
                GitHub →
              </a>
            )}
            {frontmatter.externalUrl && (
              <a
                href={frontmatter.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-secondary hover:text-text-primary"
              >
                Live →
              </a>
            )}
          </div>
        )}
      </div>

      <div
        className="prose-technical py-16"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Container>
  );
}
