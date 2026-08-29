import type { ProjectStatus, ArticleStatus } from "@/lib/content";

type StatusMeta = { status: "ok" | "warn" | "neutral"; label: string };

export const projectStatusMeta: Record<ProjectStatus, StatusMeta> = {
  live: { status: "ok", label: "live" },
  "in-progress": { status: "warn", label: "in progress" },
  planned: { status: "neutral", label: "planned" },
};

export const articleStatusMeta: Record<ArticleStatus, StatusMeta> = {
  published: { status: "ok", label: "published" },
  planned: { status: "neutral", label: "planned" },
};

// A single, specific tag chip called out in orange — not a rule about the
// tag name (the same tag elsewhere stays neutral gray). Deliberately a
// one-off; do not generalize this into a per-tag color rule.
export function isAccentProjectTag(slug: string, tag: string) {
  return slug === "this-website" && tag === "OpenTelemetry";
}
