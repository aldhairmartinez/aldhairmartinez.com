import { StatusDot } from "@/components/ui/StatusDot";

type Stage = {
  label: string;
  detail: string;
  status: "ok" | "warn" | "neutral";
  statusLabel: string;
};

const stages: Stage[] = [
  {
    label: "Browser",
    detail: "Next.js / TypeScript / React, statically exported",
    status: "ok",
    statusLabel: "live",
  },
  {
    label: "Grafana Faro",
    detail: "Frontend instrumentation SDK, connected in dev and production",
    status: "ok",
    statusLabel: "live",
  },
  {
    label: "FastAPI backend",
    detail: "OpenTelemetry-instrumented (FastAPI + httpx auto-instrumentation), running in Docker Desktop",
    status: "warn",
    statusLabel: "live — local",
  },
  {
    label: "Grafana Alloy",
    detail: "Local OTLP relay — receives backend traces, exports to Grafana Cloud. Running in Docker Desktop",
    status: "warn",
    statusLabel: "live — local",
  },
  {
    label: "PostgreSQL / Redis / Kafka",
    detail: "Data layer — PostgreSQL first (contact history, analytics), Redis and Kafka later as real needs arise",
    status: "neutral",
    statusLabel: "planned",
  },
  {
    label: "Grafana Cloud",
    detail: "Tempo / Application Observability — receives Faro and Alloy-relayed backend traces, correlated via W3C trace context",
    status: "ok",
    statusLabel: "live",
  },
];

export function PipelineDiagram() {
  return (
    <div className="flex flex-col">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-border-strong"
              style={{
                background:
                  stage.status === "ok"
                    ? "var(--color-status-ok)"
                    : stage.status === "warn"
                      ? "var(--color-status-warn)"
                      : "var(--color-bg-base)",
              }}
            />
            {i < stages.length - 1 && (
              <span className="w-px flex-1 bg-border" style={{ minHeight: 32 }} />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-sm font-semibold text-text-primary">{stage.label}</h3>
              <StatusDot status={stage.status} label={stage.statusLabel} />
            </div>
            <p className="text-sm text-text-muted">{stage.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
