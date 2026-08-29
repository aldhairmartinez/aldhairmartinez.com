import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoleCard } from "@/components/content/RoleCard";
import { EarlierRoleItem } from "@/components/content/EarlierRoleItem";
import { grafanaRoles, earlierRoles } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Career timeline — Grafana Labs Solutions Engineering and earlier roles.",
};

export default function ExperiencePage() {
  return (
    <Container>
      <PageHeader
        label="Experience"
        title="Career timeline"
        description="Grafana Labs, in reverse chronological order, followed by earlier roles."
      />

      <div className="py-16">
        <SectionHeading index="01" indexAccent title="Grafana Labs" />
        <div>
          {grafanaRoles.map((role, i) => (
            <RoleCard key={i} role={role} />
          ))}
        </div>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="02" title="Earlier career" />
        <div className="flex flex-col">
          {earlierRoles.map((role) => (
            <EarlierRoleItem key={role.company} role={role} />
          ))}
        </div>
      </div>
    </Container>
  );
}
