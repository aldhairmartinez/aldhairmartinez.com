import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site.config";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/nav/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-5 font-mono text-xs uppercase tracking-wide text-text-muted">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-xs text-text-faint">
            This site is instrumented with OpenTelemetry.
          </p>
          <Link
            href="/observability"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-[4px] border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted transition-colors hover:border-accent-secondary hover:text-text-primary"
          >
            View Observability
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <SocialLinks />
          <span className="font-mono text-xs text-text-faint">
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
        </div>
      </Container>
    </footer>
  );
}
