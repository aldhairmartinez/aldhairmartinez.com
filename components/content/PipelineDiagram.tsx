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
    detail: "Frontend instrumentation SDK, gated by env var",
    status: "warn",
    statusLabel: "integrated, not yet connected",
  },
  {
    label: "Python / FastAPI backend",
    detail: "Application layer for backend telemetry",
    status: "neutral",
    statusLabel: "planned",
  },
  {
    label: "PostgreSQL / Redis / Kafka",
    detail: "Data and messaging layer",
    status: "neutral",
    statusLabel: "planned",
  },
  {
    label: "OpenTelemetry / Grafana Alloy",
    detail: "Collector and pipeline layer",
    status: "neutral",
    statusLabel: "planned",
  },
  {
    label: "Grafana Cloud",
    detail: "Metrics, logs, traces, profiles backend",
    status: "neutral",
    statusLabel: "planned",
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
