import { StatusDot } from "@/components/ui/StatusDot";
import type { Role } from "@/lib/experience";

export function RoleCard({ role }: { role: Role }) {
  return (
    <div className="relative border-l border-border py-8 pl-8 first:pt-0">
      <span className="absolute -left-[5px] top-9 h-[9px] w-[9px] rounded-full border border-border-strong bg-bg-base" />
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-text-primary">{role.title}</h3>
        {role.current && <StatusDot status="ok" label="current" />}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wide text-text-faint">
        <span>{role.company}</span>
        {role.dateRange && (
          <>
            <span aria-hidden>·</span>
            <span className={role.current ? "text-accent-orange" : undefined}>
              {role.dateRange}
            </span>
          </>
        )}
      </div>
      <ul className="flex flex-col gap-2">
        {role.bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-text-muted"
          >
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
