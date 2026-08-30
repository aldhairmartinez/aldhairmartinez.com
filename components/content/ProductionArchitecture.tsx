import { Laptop, Zap, Globe, MonitorSmartphone, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { CloudIcon } from "@/components/technical/CloudIcon";
import { cn } from "@/lib/cn";

type Stage = {
  name: string;
  sentence: string;
  role: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  highlight?: boolean;
};

// Cloudflare Pages is the one deliberately-orange stage — it's the CI/CD
// boundary where development/source control becomes production delivery.
// Every other stage stays monochrome; only the connecting arrows are orange
// throughout, since they represent the flow itself rather than any one stage.
const stages: Stage[] = [
  {
    name: "Local Development",
    sentence: "Code is written, tested, and built locally before anything ships.",
    role: "YOUR MACHINE",
    Icon: Laptop,
  },
  {
    name: "GitHub",
    sentence: "Every commit is pushed to a public, version-controlled repository.",
    role: "SOURCE OF TRUTH",
    Icon: GithubIcon,
  },
  {
    name: "Cloudflare Pages",
    sentence: "Builds the static export and deploys it to production automatically.",
    role: "CI/CD • DEPLOY",
    Icon: Zap,
    highlight: true,
  },
  {
    name: "Cloudflare Edge",
    sentence: "Static assets are cached and served from Cloudflare's global network.",
    role: "GLOBAL DELIVERY",
    Icon: Globe,
  },
  {
    name: "Cloudflare DNS",
    sentence: "Resolves aldhairmartinez.com to the nearest edge location.",
    role: "DNS → PAGES",
    Icon: CloudIcon,
  },
  {
    name: "Visitor",
    sentence: "The site loads over HTTPS on desktop and mobile alike.",
    role: "WEB & MOBILE",
    Icon: MonitorSmartphone,
  },
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Static Export → /out",
  "No backend in production",
  "HTTPS enabled",
];

function FlowArrow() {
  return (
    <div
      aria-hidden
      className="flex shrink-0 items-center justify-center py-2 lg:h-auto lg:w-6 lg:py-0"
    >
      <ArrowRight size={20} strokeWidth={2} className="rotate-90 text-accent-orange lg:rotate-0" />
    </div>
  );
}

export function ProductionArchitecture() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col pt-4 lg:flex-row lg:items-stretch lg:justify-center lg:overflow-x-auto lg:overflow-y-visible lg:pb-1">
        {stages.map((stage, i) => {
          const Icon = stage.Icon;
          return (
            <div key={stage.name} className="flex flex-col lg:flex-row lg:items-stretch">
              <div
                className={cn(
                  "flex flex-col gap-3 rounded-md border p-5 lg:w-[140px]",
                  stage.highlight
                    ? "border-accent-orange/40 bg-accent-orange/5"
                    : "border-border bg-bg-raised-solid/40"
                )}
              >
                <div className="flex h-12 items-center justify-center">
                  <Icon
                    size={32}
                    className={stage.highlight ? "text-accent-orange" : "text-accent-secondary"}
                  />
                </div>

                <div className="flex flex-col items-center gap-2">
                  <h3
                    className={cn(
                      "text-center text-base font-semibold",
                      stage.highlight ? "text-accent-orange" : "text-text-primary"
                    )}
                  >
                    {stage.name}
                  </h3>
                  <span
                    aria-hidden
                    className={cn(
                      "h-[2px] w-6 rounded-full",
                      stage.highlight ? "bg-accent-orange/60" : "bg-border-strong"
                    )}
                  />
                </div>

                <p className="flex-1 text-xs leading-relaxed text-text-muted">
                  {stage.sentence}
                </p>

                <Badge
                  accent={stage.highlight}
                  className="mt-auto w-full justify-center text-center"
                >
                  {stage.role}
                </Badge>
              </div>
              {i < stages.length - 1 && <FlowArrow />}
            </div>
          );
        })}
      </div>

      <div className="rounded-md border border-border p-4">
        <span className="mb-3 block text-center font-mono text-[10px] uppercase tracking-wider text-text-faint">
          Frontend stack
        </span>
        <div className="flex flex-wrap justify-center gap-2">
          {stack.map((item) => (
            <Badge key={item}>{item}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
