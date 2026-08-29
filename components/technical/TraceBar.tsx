import { cn } from "@/lib/cn";

const segments = [
  { width: "18%", opacity: 0.9 },
  { width: "9%", opacity: 0.5 },
  { width: "34%", opacity: 0.7 },
  { width: "12%", opacity: 0.4 },
  { width: "22%", opacity: 0.6 },
];

// A single simulated trace/span row — decorative, evokes a waterfall view
// without pretending to show real telemetry.
export function TraceBar({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex h-1.5 w-full items-center gap-[2px]", className)}
    >
      {segments.map((s, i) => (
        <span
          key={i}
          className="h-full rounded-[1px] bg-accent-secondary"
          style={{ width: s.width, opacity: s.opacity }}
        />
      ))}
    </div>
  );
}
