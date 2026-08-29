import Link from "next/link";
import { navLinks } from "@/lib/site.config";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/nav/SocialLinks";
import { MobileMenu } from "@/components/nav/MobileMenu";

export function Navbar() {
  return (
    <header className="relative z-20 border-b border-border bg-bg-base">
      <Container className="flex h-[57px] items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight text-text-primary"
        >
          aldhair<span className="text-accent-secondary">martinez</span>.com
        </Link>

        <nav className="hidden items-center gap-7 font-mono text-[13px] uppercase tracking-wide sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-muted transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center sm:flex">
          <SocialLinks />
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
