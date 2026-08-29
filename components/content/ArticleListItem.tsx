import Link from "next/link";
import { StatusDot } from "@/components/ui/StatusDot";
import { articleStatusMeta } from "@/lib/status";
import type { ContentEntry, ArticleFrontmatter } from "@/lib/content";

// A single word within a single title, called out in orange — a one-off,
// not a rule about the word itself (it stays plain everywhere else it
// might appear). Keyed by slug so it's easy to see it's deliberately scoped.
const titleHighlights: Record<string, string> = {
  "production-realistic-se-demos-with-ai": "AI",
};

function renderTitle(title: string, highlight?: string) {
  if (!highlight) return title;
  const index = title.indexOf(highlight);
  if (index === -1) return title;
  return (
    <>
      {title.slice(0, index)}
      <span className="text-accent-orange">{highlight}</span>
      {title.slice(index + highlight.length)}
    </>
  );
}

export function ArticleListItem({ entry }: { entry: ContentEntry<ArticleFrontmatter> }) {
  const { frontmatter, slug } = entry;
  const meta = articleStatusMeta[frontmatter.status];

  return (
    <Link
      href={`/writing/${slug}`}
      className="group flex flex-col gap-2 border-b border-border py-6 first:pt-0 last:border-b-0"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-medium text-text-primary transition-colors group-hover:text-accent-secondary">
          {renderTitle(frontmatter.title, titleHighlights[slug])}
        </h3>
        <StatusDot status={meta.status} label={meta.label} className="shrink-0" />
      </div>
      <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
        {frontmatter.summary}
      </p>
      <div className="flex gap-3 font-mono text-[11px] uppercase tracking-wide text-text-faint">
        {frontmatter.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </Link>
  );
}
