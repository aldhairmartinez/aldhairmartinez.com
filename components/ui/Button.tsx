import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[4px] px-4 py-2.5 font-mono text-[13px] uppercase tracking-wider transition-colors duration-150 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-accent-secondary";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-primary text-text-primary hover:bg-accent-primary/85 border border-accent-primary",
  secondary:
    "border border-border-strong text-text-primary hover:border-accent-secondary hover:bg-bg-overlay",
  ghost:
    "text-text-muted hover:text-text-primary",
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
  download?: string | boolean;
  className?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  href,
  download,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);

  if (download && href) {
    // Static file download (e.g. the resume) — a plain anchor with `download`
    // triggers a save-as, which next/link's client-side routing doesn't do.
    return (
      <a href={href} download={download} className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
