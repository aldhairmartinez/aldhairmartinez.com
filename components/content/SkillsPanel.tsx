import { Badge } from "@/components/ui/Badge";
import type { SkillGroup } from "@/lib/experience";

export function SkillsPanel({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="flex flex-col gap-6 rounded-md border border-border p-5">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-3">
          <span className="font-mono text-[11px] uppercase tracking-wider text-text-faint">
            {group.label}
          </span>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
