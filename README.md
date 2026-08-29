# aldhairmartinez.com

This is my personal site — a professional portfolio and an evolving technical project at the same time. It started as a static Next.js site, and it's meant to grow, piece by piece, into an observed, full-stack application. This README tracks what's actually built alongside what's planned, so the project stays honest about its own state.

Live at [aldhairmartinez.com](https://aldhairmartinez.com).

## What this is

- **A portfolio.** Projects, writing, career history, and a resume for Aldhair Martinez, a Solutions Engineer working across observability, cloud infrastructure, DevOps/SRE, developer tooling, and AI.
- **A technical project.** The site itself is the first entry in [`/projects`](https://aldhairmartinez.com/projects/this-website) — a working example of how a simple static frontend evolves into an observed distributed system, documented as it happens rather than promised up front.

See [`/observability`](https://aldhairmartinez.com/observability) for a living breakdown of what's implemented today versus planned.

## Stack

- **[Next.js](https://nextjs.org/)** (App Router) + **TypeScript** + **[Tailwind CSS](https://tailwindcss.com/)** (v4, CSS-first config)
- **Static export** (`output: 'export'`) — the whole site builds to plain HTML/CSS/JS, no server runtime required
- **[Cloudflare Pages](https://pages.cloudflare.com/)** for hosting
- **MDX-style content** (frontmatter + Markdown) for projects and writing, parsed at build time with `gray-matter` + `remark`/`rehype` + `rehype-pretty-code` (Shiki syntax highlighting) — no CMS, no database
- **[Grafana Faro](https://grafana.com/oss/faro/)** for frontend observability, integrated but inert until a real collector endpoint is configured (see Observability below)
- **[Geist Sans / Geist Mono](https://vercel.com/font)** via `next/font/google`, self-hosted, zero external font requests

### Why static export over an edge adapter

Next.js can run on Cloudflare Pages either as a full SSR app (via an edge-runtime adapter) or as a static export served directly from the CDN. This site has no server-side personalization, no API routes, and no per-request logic — every page is either fully static or driven by build-time content — so static export is the simpler, faster, and cheaper choice: no cold starts, no edge-runtime restrictions on Node APIs, no adapter to maintain. If a future piece of this project genuinely needs a server (see Roadmap), it'll be added as its own service rather than by switching this frontend's rendering mode.

## Project structure

```
app/                    Routes (App Router)
  about/                /about
  contact/              /contact
  experience/           /experience
  observability/        /observability — architecture transparency page
  projects/             /projects and /projects/[slug]
  resume/               /resume
  speaking/             /speaking (implemented, not yet linked in nav)
  writing/              /writing and /writing/[slug]
  layout.tsx            Root layout — fonts, nav, footer, Faro init
  page.tsx              Homepage
  sitemap.ts, robots.ts, opengraph-image.tsx

components/
  ui/                   Button, Card, Badge, StatusDot, Container, etc.
  nav/                  Navbar, Footer, mobile menu, social links
  technical/            Grid background, topology graphic, project motifs
  content/              Project/article cards, role timeline, pipeline diagram
  analytics/            FaroInit — env-gated frontend instrumentation
  icons/                Hand-rolled GitHub/LinkedIn glyphs (lucide-react
                         dropped brand icons; these are minimal inline SVGs)

content/
  projects/*.mdx        One file per project — typed frontmatter + Markdown
  writing/*.mdx         One file per article — same pattern

lib/
  content.ts            Content loader — frontmatter parsing, Markdown→HTML
  site.config.ts        Centralized name, URLs, social links, nav config
  experience.ts         Career timeline data (drives /experience and /resume)
  status.ts             Status → display metadata (also one-off accent rules)
  cn.ts                 Tiny className-merging helper
```

### Content model

Adding a project or article is a matter of dropping a new `.mdx` file into `content/projects/` or `content/writing/` with frontmatter — no component changes required:

```md
---
title: "Example Project"
summary: "One-line description shown on cards and in <meta> tags."
tags: ["Kubernetes", "OpenTelemetry"]
status: "planned"       # live | in-progress | planned  (articles: published | planned)
date: "2026-01-01"
githubUrl: "https://github.com/..."   # optional
externalUrl: "https://..."            # optional
featured: true                        # optional — shows on homepage
hidden: true                          # optional (articles only) — keeps a
                                       # draft in the content backlog without
                                       # publishing a route for it
---

Body content in standard Markdown, including fenced code blocks.
```

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Copy `.env.example` to `.env.local` if you want to test with Faro instrumentation enabled — the site runs fine with no `.env.local` at all.

```bash
npm run build   # static export → ./out
```

## Deployment

Hosted on Cloudflare Pages, connected directly to this GitHub repository:

- **Build command:** `npm run build`
- **Output directory:** `out`
- **Environment variables:** set `NEXT_PUBLIC_SITE_URL` (and the `NEXT_PUBLIC_FARO_*` variables, once a real collector exists) in the Cloudflare Pages project settings — see `.env.example` for the full list. Every `NEXT_PUBLIC_*` variable is bundled into client-side JS, so nothing sensitive belongs here.
- Cloudflare Pages builds a preview deployment for every pull request automatically; production deploys from the default branch.
- Until a custom domain is attached, the site is reachable at its `*.pages.dev` URL.

## Observability

The long-term architecture this project is built toward:

```
Browser
  → Next.js / TypeScript / React
  → Grafana Faro (frontend instrumentation)
  → Python / FastAPI backend
  → PostgreSQL / Redis / Kafka
  → OpenTelemetry / Grafana Alloy
  → Grafana Cloud
```

Today, only the first two stages exist, and the Faro stage is integrated but not yet connected to a live collector — see [`/observability`](https://aldhairmartinez.com/observability) for the current, honest state, kept in sync with the code (not aspirational). No credentials or collector endpoints are hardcoded anywhere in this repository; instrumentation is entirely opt-in through environment variables (`components/analytics/FaroInit.tsx`).

## Roadmap

Introduced progressively, each as a real working piece rather than a diagram promise:

- Connect Grafana Faro to a live Grafana Cloud Frontend Observability collector
- Python/FastAPI backend as the first non-static service
- PostgreSQL, Redis, and eventually Kafka for backend state and messaging
- An OpenTelemetry Collector (Grafana Alloy) receiving and routing telemetry from both frontend and backend
- Synthetic monitoring for availability and deployment health
- k6 load testing once there's a backend worth load testing
- Docker, Kubernetes/EKS, and Terraform as the infrastructure footprint grows
- A published GitHub Actions CI workflow (typecheck/build on PR)

## Contributing

This is a personal portfolio, so it isn't looking for external feature contributions — but if you spot a bug, a broken link, or an accessibility issue, an issue or PR is welcome.

## License

Code in this repository is licensed under the [MIT License](./LICENSE). Written content — the About/Experience copy, project and article text, resume data, and any personal information — is not covered by that license and isn't licensed for reuse.
