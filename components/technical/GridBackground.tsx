import { cn } from "@/lib/cn";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-grid", className)}
    />
  );
}
