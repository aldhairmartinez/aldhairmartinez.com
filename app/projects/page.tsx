import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectCard } from "@/components/content/ProjectCard";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "A gradually-expanding public technical portfolio.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Container>
      <PageHeader
        label="Projects"
        title="Projects"
        description="Things I'm building, experimenting with, and learning from."
      />

      <div className="grid gap-6 py-16 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} entry={project} />
        ))}
      </div>
    </Container>
  );
}
