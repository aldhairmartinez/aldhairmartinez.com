import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PipelineDiagram } from "@/components/content/PipelineDiagram";
import { ProductionArchitecture } from "@/components/content/ProductionArchitecture";
import { DataLayerPanel } from "@/components/content/DataLayerPanel";
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
            <StatusDot status="ok" label="live" />
            <p className="text-sm leading-relaxed text-text-muted">
              The Grafana Faro Web SDK, in{" "}
              <InlineCode>components/analytics/FaroInit.tsx</InlineCode>, is
              connected to a real Grafana Cloud Frontend Observability
              collector — live in both local development and production,
              gated behind <InlineCode accent>NEXT_PUBLIC_FARO_URL</InlineCode>.
              Errors, Web Vitals, and session data are collected at 100%
              sampling for V1. Session Replay isn&apos;t enabled yet.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusDot status="warn" label="live — local" />
            <p className="text-sm leading-relaxed text-text-muted">
              A FastAPI backend (<InlineCode>backend/</InlineCode>),
              instrumented with OpenTelemetry (FastAPI + httpx
              auto-instrumentation), running locally in Docker Desktop — not
              yet hosted in production.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusDot status="warn" label="live — local" />
            <p className="text-sm leading-relaxed text-text-muted">
              Grafana Alloy, also running locally in Docker Desktop, relays
              the backend&apos;s traces over OTLP to Grafana Cloud Tempo /
              Application Observability.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusDot status="warn" label="live — local" />
            <p className="text-sm leading-relaxed text-text-muted">
              Browser-to-backend distributed trace correlation: Faro attaches
              a W3C trace context header to the contact form&apos;s request,
              and FastAPI continues that same trace rather than starting a
              new one — a contact form submission produces one continuous
              trace across both.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusDot status="warn" label="live — local" />
            <p className="text-sm leading-relaxed text-text-muted">
              The contact form sends real email through Resend to{" "}
              <InlineCode>hello@aldhairmartinez.com</InlineCode>, via the
              same local FastAPI backend.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <StatusDot status="warn" label="live — local" />
            <p className="text-sm leading-relaxed text-text-muted">
              PostgreSQL, running locally alongside the backend, persists
              contact submissions, resume-download and project-view
              analytics, and deployment history — plain <InlineCode>psycopg</InlineCode>{" "}
              with a connection pool, no ORM. Every query appears as its own
              span in the same traces as the request that triggered it. See
              the data layer below.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading
          index="04"
          title="Data layer"
          description="Read live from the local PostgreSQL database — empty or absent entirely in production, same as everything else backend-dependent on this page."
        />
        <DataLayerPanel />
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="05" title="Planned" />
        <ul className="flex flex-col gap-3">
          {[
            "Enable Grafana Faro Session Replay once it's available on this stack.",
            "Redis — next/later, only once there's a real caching, performance, or shared-state need.",
            "Kafka — later, only once there's a real asynchronous/event-processing need.",
            "AWS — future production phase: move FastAPI, Alloy, and PostgreSQL into real production infrastructure. Also brings GitHub Actions deployment recording, production secrets management, a real production backend URL, and production frontend → backend connectivity.",
            "Google Workspace — future: turn hello@aldhairmartinez.com from a forwarding address into a full mailbox.",
            "Add synthetic monitoring for availability and deployment health.",
            "Add k6 load testing against the FastAPI backend.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border py-16">
        <SectionHeading index="06" title="Why build it this way" />
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
