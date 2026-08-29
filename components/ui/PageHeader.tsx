export function PageHeader({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border py-16">
      <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
        {label}
      </span>
      <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
