import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { getAllProjects, getAllArticles } from "@/lib/content";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/experience",
  "/projects",
  "/writing",
  "/speaking",
  "/resume",
  "/observability",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, articles] = await Promise.all([getAllProjects(), getAllArticles()]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteConfig.url}/projects/${p.slug}`,
    lastModified: p.frontmatter.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/writing/${a.slug}`,
    lastModified: a.frontmatter.date,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...projectEntries, ...articleEntries];
}
