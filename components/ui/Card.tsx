import Link from "next/link";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  href,
}: {
  className?: string;
  children: React.ReactNode;
  href?: string;
}) {
  const classes = cn(
    "group relative rounded-md border border-border bg-bg-raised-solid/40 p-6 transition-colors duration-150",
    href && "hover:border-border-strong hover:bg-bg-overlay",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <div className={classes}>{children}</div>;
}
