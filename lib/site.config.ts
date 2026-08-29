// Central site configuration. Update the values marked TODO before launch —
// everything else (nav, footer, metadata, contact page) reads from here.

export const siteConfig = {
  name: "Aldhair Martinez",
  role: "Solutions Engineer",
  domain: "aldhairmartinez.com",
  // Falls back to the Cloudflare Pages preview URL until the custom domain
  // is attached and NEXT_PUBLIC_SITE_URL is set in the Pages project.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldhairmartinez.com",
  description:
    "Solutions Engineer working across observability, cloud infrastructure, DevOps/SRE, developer tooling, and AI.",
  email: "hello@aldhairmartinez.com",
  social: {
    github: "https://github.com/aldhairmartinez",
    linkedin: "https://www.linkedin.com/in/aldhairmartinez",
  },
} as const;

// /speaking stays implemented but out of primary nav until there's public
// speaking material to show — add it back here once that's true.
export const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
] as const;

export const footerLinks = [
  { href: "/observability", label: "Observability" },
  { href: "/contact", label: "Contact" },
] as const;

export type Domain = {
  name: string;
  description: string;
};

export const domains: Domain[] = [
  {
    name: "Observability",
    description:
      "Metrics, logs, traces, and profiles — instrumenting systems so the failure mode is visible before the incident review.",
  },
  {
    name: "Cloud Infrastructure",
    description:
      "AWS and Azure environments spanning Kubernetes, serverless, and traditional VMs.",
  },
  {
    name: "DevOps / SRE",
    description:
      "Incident response, sizing, reliability engineering, and the operational habits that keep systems boring.",
  },
  {
    name: "Developer Tooling",
    description:
      "Terraform, Docker, CI/CD, and the collector and pipeline plumbing that gets telemetry where it needs to go.",
  },
  {
    name: "AI",
    description:
      "Applying AI-assisted development to solution engineering — faster environments, same emphasis on architecture and story.",
  },
];
