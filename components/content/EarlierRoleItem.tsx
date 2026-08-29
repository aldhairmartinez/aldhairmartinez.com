import type { EarlierRole } from "@/lib/experience";

export function EarlierRoleItem({ role }: { role: EarlierRole }) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-border py-4 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm font-medium text-text-primary">
          {role.company} <span className="text-text-muted">— {role.title}</span>
        </span>
        <span className="font-mono text-xs uppercase tracking-wide text-text-faint">
          {role.location}
          {role.location && role.dateRange && " · "}
          {role.dateRange}
        </span>
      </div>
      {role.bullet && (
        <p className="text-sm leading-relaxed text-text-muted">{role.bullet}</p>
      )}
    </div>
  );
}
