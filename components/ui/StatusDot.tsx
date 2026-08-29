import { cn } from "@/lib/cn";

type Status = "ok" | "warn" | "alert" | "neutral";

const statusColor: Record<Status, string> = {
  ok: "bg-status-ok",
  warn: "bg-status-warn",
  alert: "bg-status-alert",
  neutral: "bg-text-faint",
};

export function StatusDot({
  status = "neutral",
  label,
  className,
}: {
  status?: Status;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-text-muted",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", statusColor[status])} aria-hidden />
      {label}
    </span>
  );
}
