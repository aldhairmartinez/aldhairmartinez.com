import Link from "next/link";
import { Activity, Cloud, Workflow, Terminal, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GridBackground } from "@/components/technical/GridBackground";
import { TopologyGraphic } from "@/components/technical/TopologyGraphic";
import { ProjectCard } from "@/components/content/ProjectCard";
import { domains } from "@/lib/site.config";
import { getFeaturedProjects } from "@/lib/content";

const domainIcons = [Activity, Cloud, Workflow, Terminal, Sparkles];

export default async function Home() {
  const featured = await getFeaturedProjects();

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <GridBackground />
        <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
              <span className="text-accent-orange">Aldhair Martinez</span> / Solutions Engineer
            </p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Solutions Engineer at the intersection of technical depth
              and business outcomes — across observability, cloud
              infrastructure, DevOps/SRE, developer tooling, and AI.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-text-muted">
              I spend most of my time on problems where the answer isn&apos;t
              immediately obvious — where an architecture, a failure mode, or a
              cost curve has to be worked out rather than looked up. That&apos;s
              the part of this job I like most, and it&apos;s what this site is
              slowly becoming a record of.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Button href="/projects" variant="primary">
                View Projects
              </Button>
              <Button href="/writing" variant="secondary">
                Read Writing
              </Button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <TopologyGraphic className="w-full" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20">
        <Container>
          <SectionHeading
            index="01"
            title="What I work across"
            description="Technical sales cycles that span discovery, architecture, custom demos, sizing, and validation."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {domains.map((domain, i) => {
              const Icon = domainIcons[i];
              return (
                <div
                  key={domain.name}
                  className="flex flex-col gap-3 rounded-md border border-border p-5"
                >
                  <Icon size={18} strokeWidth={1.5} className="text-accent-secondary" />
                  <h3 className="text-sm font-semibold text-text-primary">
                    {domain.name}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-muted">
                    {domain.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {featured.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading
              index="02"
              title="Selected work"
              description="A public, gradually-expanding technical portfolio — see the full list on the Projects page."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((project) => (
                <ProjectCard key={project.slug} entry={project} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-text-muted transition-colors hover:text-text-primary"
              >
                All projects
                <span className="transition-colors group-hover:text-accent-orange">→</span>
              </Link>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
