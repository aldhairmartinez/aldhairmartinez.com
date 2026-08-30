import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResumeDownloadButton } from "@/components/content/ResumeDownloadButton";
import { RoleCard } from "@/components/content/RoleCard";
import { EarlierRoleItem } from "@/components/content/EarlierRoleItem";
import { SkillsPanel } from "@/components/content/SkillsPanel";
import {
  grafanaRoles,
  earlierRoles,
  skillGroups,
  education,
  professionalSummary,
} from "@/lib/experience";
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

      <div className="flex flex-wrap items-center gap-3 border-b border-border py-8">
        <ResumeDownloadButton
          fileType="pdf"
          href="/aldhairmartinez_resume.pdf"
          download="aldhairmartinez_resume.pdf"
          variant="primary"
        >
          Download PDF
        </ResumeDownloadButton>
        <ResumeDownloadButton
          fileType="docx"
          href="/aldhairmartinez_resume.docx"
          download="aldhairmartinez_resume.docx"
          variant="secondary"
        >
          Download DOCX
        </ResumeDownloadButton>
      </div>

      <div className="py-16">
        <SectionHeading index="01" title="Professional Summary" />
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
          {professionalSummary}
        </p>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="02" title="Grafana Labs" />
        <div>
          {grafanaRoles.map((role, i) => (
            <RoleCard key={i} role={role} />
          ))}
        </div>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="03" title="Earlier Experience" />
        <div className="flex flex-col">
          {earlierRoles.map((role) => (
            <EarlierRoleItem key={role.company} role={role} />
          ))}
        </div>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="04" title="Technical Skills" />
        <SkillsPanel groups={skillGroups} />
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="05" title="Education" />
        <div className="flex flex-col">
          {education.map((entry) => (
            <div
              key={entry.institution}
              className="flex flex-col gap-1 border-b border-border py-4 last:border-b-0"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="text-sm font-medium text-text-primary">
                  {entry.institution}{" "}
                  <span className="text-text-muted">— {entry.degree}</span>
                </span>
                <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
                  {entry.location} · {entry.dateRange}
                </span>
              </div>
              {entry.note && (
                <p className="text-sm text-text-muted">{entry.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
