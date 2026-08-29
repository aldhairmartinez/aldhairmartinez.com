import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Aldhair Martinez — Solutions Engineer at Grafana Labs.",
};

export default function AboutPage() {
  return (
    <Container>
      <PageHeader
        label="About"
        title={
          <>
            I like problems that don&apos;t have an{" "}
            <span className="text-accent-orange">obvious</span> answer yet.
          </>
        }
      />

      <div className="prose-technical py-16">
        <p>
          Today, I&apos;m a Solutions Engineer at Grafana Labs, working across
          observability, cloud infrastructure, DevOps/SRE, developer tooling,
          and AI. I lead the technical side of sales cycles — discovery,
          architecture, custom demos, sizing, and proof-of-value — across a
          portfolio of accounts spanning several account executives. Most days
          involve some combination of Kubernetes, OpenTelemetry, Terraform,
          and a whiteboard.
        </p>

        <h2>How I got here</h2>
        <p>
          I studied Economics and joined Grafana Labs on the sales side. After
          becoming interested in observability and Solutions Engineering, I
          spent roughly six months building my technical foundation through
          hands-on labs, courses, self-study, and learning from Solutions
          Engineers internally.
        </p>
        <p>
          I became the first SDR in Grafana Labs history to transition into
          Solutions Engineering.
        </p>
        <p>
          I later helped revamp and lead Grafana&apos;s Path to SE program and
          co-created the SE POV Simulator, now part of formal SE onboarding —
          built because I remembered exactly what was hard to learn on my own,
          and wanted the next hire to skip that part.
        </p>

        <h2>What I actually do</h2>
        <p>
          Today I work hands-on across observability, cloud infrastructure,
          DevOps/SRE, developer tooling, and AI, including AWS, Azure,
          Kubernetes/EKS, <span className="text-accent-orange">OpenTelemetry</span>,
          Terraform, Docker, serverless, metrics, logs, traces, and
          large-scale telemetry environments.
        </p>
        <p>
          Day to day that means running competitive POVs against platforms
          like Datadog, Dynatrace, Splunk, and New Relic, sizing environments
          that span hundreds of millions of active series, and building demo
          environments that mirror what a prospect&apos;s infrastructure
          actually looks like — not a generic template. It also means the less
          visible parts of the job: mentoring newer SEs, working closely with
          Product and Engineering when a customer&apos;s need points at a gap,
          and staying commercially aware enough to know when the right answer
          is a smaller deal now instead of a bigger one that never closes.
        </p>

        <h2>Outside of work</h2>
        <p>
          I spend a lot of my own time the same way I spend my work time —
          poking at new technology and AI tooling until I understand how it
          actually works. Outside of that: reading, gaming, collecting,
          sneakers and fashion, and watching football and basketball.
        </p>
      </div>
    </Container>
  );
}
