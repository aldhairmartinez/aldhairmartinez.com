import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Aldhair Martinez.",
};

const links = [
  // The email icon is the one deliberately-orange detail on this page —
  // not a rule about "primary contact methods," just this one.
  { label: siteConfig.email, href: `mailto:${siteConfig.email}`, Icon: Mail, accent: true },
  { label: "GitHub", href: siteConfig.social.github, Icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedinIcon },
];

export default function ContactPage() {
  return (
    <Container>
      <PageHeader label="Contact" title="Get in touch" />

      <div className="flex max-w-sm flex-col gap-4 py-16">
        {links.map(({ label, href, Icon, accent }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group flex items-center gap-3 rounded-md border border-border px-5 py-4 text-sm text-text-primary transition-colors hover:border-border-strong hover:bg-bg-overlay"
          >
            <Icon size={18} className={accent ? "text-accent-orange" : "text-accent-secondary"} />
            {label}
          </a>
        ))}
      </div>
    </Container>
  );
}
