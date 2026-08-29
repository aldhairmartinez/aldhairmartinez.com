import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusDot } from "@/components/ui/StatusDot";
import { projectStatusMeta, isAccentProjectTag } from "@/lib/status";
import { projectMotifs, TopologyMotif } from "@/components/technical/ProjectMotifs";
import type { ContentEntry, ProjectFrontmatter } from "@/lib/content";

export function ProjectCard({ entry }: { entry: ContentEntry<ProjectFrontmatter> }) {
  const { frontmatter, slug } = entry;
  const meta = projectStatusMeta[frontmatter.status];
  const Motif = projectMotifs[slug] ?? TopologyMotif;

  return (
    <Card href={`/projects/${slug}`} className="flex h-full flex-col justify-between gap-5">
      <Motif className="h-12 w-full rounded-sm border border-border/60 bg-bg-overlay/30" />
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-text-primary">
            {frontmatter.title}
          </h3>
          <StatusDot status={meta.status} label={meta.label} className="shrink-0" />
        </div>
        <p className="text-sm leading-relaxed text-text-muted">{frontmatter.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {frontmatter.tags.map((tag) => (
          <Badge key={tag} accent={isAccentProjectTag(slug, tag)}>
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
