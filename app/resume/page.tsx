import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoleCard } from "@/components/content/RoleCard";
import { grafanaRoles, earlierRoles } from "@/lib/experience";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Resume",
  description: "Web resume for Aldhair Martinez, Solutions Engineer.",
};

export default function ResumePage() {
  return (
    <Container>
      <PageHeader
        label="Resume"
        title={siteConfig.name}
        description={siteConfig.role}
      />

      <div className="py-16">
        <SectionHeading index="01" title="Grafana Labs" />
        <div>
          {grafanaRoles.map((role, i) => (
            <RoleCard key={i} role={role} />
          ))}
        </div>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="02" title="Earlier career" />
        <ul className="flex flex-col gap-3">
          {earlierRoles.map((role) => (
            <li
              key={role.company}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border py-3 last:border-b-0"
            >
              <span className="text-sm font-medium text-text-primary">{role.company}</span>
              <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-wide text-text-muted">
                {role.title}
                {role.dateRange && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{role.dateRange}</span>
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
