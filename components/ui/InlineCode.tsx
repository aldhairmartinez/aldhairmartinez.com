export function InlineCode({
  children,
  accent,
}: {
  children: React.ReactNode;
  // One-off — for the rare instance where a specific config value earns a
  // callout, not a rule about code spans in general.
  accent?: boolean;
}) {
  return (
    <code
      className={
        accent
          ? "rounded-[3px] border border-accent-orange/40 bg-bg-overlay px-1.5 py-0.5 font-mono text-[0.85em] text-accent-orange"
          : "rounded-[3px] border border-border bg-bg-overlay px-1.5 py-0.5 font-mono text-[0.85em] text-text-primary"
      }
    >
      {children}
    </code>
  );
}
