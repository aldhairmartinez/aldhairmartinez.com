import { cn } from "@/lib/cn";

export function SectionHeading({
  index,
  indexAccent,
  title,
  description,
  className,
}: {
  index?: string;
  // One-off use only — this is not a "highlight the section number" rule,
  // just a way to mark a single specific instance when it earns it.
  indexAccent?: boolean;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-3", className)}>
      <div className="flex items-baseline gap-3">
        {index && (
          <span
            className={cn(
              "font-mono text-xs",
              indexAccent ? "text-accent-orange" : "text-text-faint"
            )}
          >
            {index}
          </span>
        )}
        <h2 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
