import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ProjectStatus = "live" | "in-progress" | "planned";
export type ArticleStatus = "published" | "planned";

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  tags: string[];
  status: ProjectStatus;
  date: string;
  githubUrl?: string;
  externalUrl?: string;
  featured?: boolean;
}

export interface ArticleFrontmatter {
  title: string;
  summary: string;
  tags: string[];
  status: ArticleStatus;
  date?: string;
  featured?: boolean;
  // Kept in the content backlog but excluded from the public listing/build
  // (see getAllArticles) — for ideas that exist as a title but aren't ready
  // to show publicly yet, planned or not.
  hidden?: boolean;
}

export interface ContentEntry<T> {
  slug: string;
  frontmatter: T;
  html: string;
}

async function renderMarkdown(source: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark-dimmed",
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(source);

  return String(file);
}

async function readCollection<T>(dir: string): Promise<ContentEntry<T>[]> {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".mdx"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(fullDir, file), "utf-8");
      const { data, content } = matter(raw);
      const html = await renderMarkdown(content);
      return { slug, frontmatter: data as T, html };
    })
  );

  return entries;
}

export async function getAllProjects(): Promise<ContentEntry<ProjectFrontmatter>[]> {
  const entries = await readCollection<ProjectFrontmatter>("projects");
  return entries.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getProjectBySlug(
  slug: string
): Promise<ContentEntry<ProjectFrontmatter> | undefined> {
  const entries = await getAllProjects();
  return entries.find((e) => e.slug === slug);
}

export async function getFeaturedProjects(): Promise<ContentEntry<ProjectFrontmatter>[]> {
  const entries = await getAllProjects();
  return entries.filter((e) => e.frontmatter.featured);
}

export async function getAllArticles(): Promise<ContentEntry<ArticleFrontmatter>[]> {
  const entries = (await readCollection<ArticleFrontmatter>("writing")).filter(
    (e) => !e.frontmatter.hidden
  );
  return entries.sort((a, b) => {
    if (!a.frontmatter.date) return 1;
    if (!b.frontmatter.date) return -1;
    return a.frontmatter.date < b.frontmatter.date ? 1 : -1;
  });
}

export async function getArticleBySlug(
  slug: string
): Promise<ContentEntry<ArticleFrontmatter> | undefined> {
  const entries = await getAllArticles();
  return entries.find((e) => e.slug === slug);
}
