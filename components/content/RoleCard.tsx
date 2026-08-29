"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/cn";
import type { Role } from "@/lib/experience";

export function RoleCard({ role }: { role: Role }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative border-l border-border py-8 pl-8 first:pt-0">
      <span className="absolute -left-[5px] top-9 h-[9px] w-[9px] rounded-full border border-border-strong bg-bg-base" />
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold text-text-primary">{role.title}</h3>
        {role.current && <StatusDot status="ok" label="current" />}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wide text-text-faint">
        <span>{role.company}</span>
        {role.location && (
          <>
            <span aria-hidden>·</span>
            <span>{role.location}</span>
          </>
        )}
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

      {role.webDetail && role.webDetail.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-text-faint transition-colors hover:text-accent-secondary"
          >
            <ChevronDown
              size={14}
              className={cn("transition-transform", expanded && "rotate-180")}
            />
            {expanded ? "Hide additional detail" : "Show additional detail"}
          </button>

          {expanded && (
            <ul className="mt-3 flex flex-col gap-2 border-l border-border pl-4">
              {role.webDetail.map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-text-muted"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-faint" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
