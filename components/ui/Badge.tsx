import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  // Reserved for the rare, specific one-off — never a rule applied to a tag
  // by name or category. Keep uses of this to a single instance at a time.
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[3px] border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
        accent ? "border-accent-orange/50 text-accent-orange" : "border-border text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
