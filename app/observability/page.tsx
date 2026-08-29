import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PipelineDiagram } from "@/components/content/PipelineDiagram";
import { ProductionArchitecture } from "@/components/content/ProductionArchitecture";
import { StatusDot } from "@/components/ui/StatusDot";
import { InlineCode } from "@/components/ui/InlineCode";

export const metadata: Metadata = {
  title: "Observability",
  description: "How this site is instrumented today, and where the architecture is headed.",
};

export default function ObservabilityPage() {
  return (
    <Container>
      <PageHeader
        label="Observability"
        title="How this site is observed"
        description="This page is meant to stay accurate, not aspirational — it's updated as each piece actually ships, not before."
      />

      <div className="py-16">
        <SectionHeading
          index="01"
          title="Production architecture"
          description="How a commit becomes a live page, end to end."
        />
        <ProductionArchitecture />
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading
          index="02"
          title="Pipeline"
          description="Current status of each stage in the long-term telemetry architecture."
        />
        <PipelineDiagram />
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="03" title="Implemented today" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <StatusDot status="ok" label="live" />
            <p className="text-sm leading-relaxed text-text-muted">
              The site itself is statically exported and served from
              Cloudflare Pages&apos; CDN.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusDot status="warn" label="integrated, not yet connected" />
            <p className="text-sm leading-relaxed text-text-muted">
              The Grafana Faro Web SDK is integrated in the codebase, in{" "}
              <InlineCode>components/analytics/FaroInit.tsx</InlineCode>, and
              only initializes when <InlineCode accent>NEXT_PUBLIC_FARO_URL</InlineCode>{" "}
              is set. That variable is currently unset in production, so no
              frontend telemetry is being collected from real visitors yet.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="04" title="Planned" />
        <ul className="flex flex-col gap-3">
          {[
            "Connect Faro to a real Grafana Cloud Frontend Observability collector, enabling real user monitoring, frontend error tracking, and Core Web Vitals.",
            "Add a Python/FastAPI backend service as the first non-static piece of the stack.",
            "Introduce PostgreSQL, Redis, and eventually Kafka as backend state and messaging needs arise.",
            "Deploy an OpenTelemetry Collector (Grafana Alloy) to receive and route telemetry from both frontend and backend.",
            "Add synthetic monitoring for availability and deployment health.",
            "Add k6 load testing once there's a backend worth load testing.",
            "Introduce Docker, Kubernetes/EKS, and Terraform as the backend and infrastructure footprint grows.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="05" title="Why build it this way" />
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
          Most portfolio sites either skip observability entirely or fake it
          with a screenshot of someone else&apos;s dashboard. Neither is
          interesting. This page exists so the site&apos;s own telemetry story is
          something a visitor — or another engineer — can actually verify
          against the code, not just take on faith. No credentials or
          collector endpoints are hardcoded anywhere in this repository;
          everything above is configured through environment variables, and
          this page will be updated as each stage moves from planned to real.
        </p>
      </div>
    </Container>
  );
}
