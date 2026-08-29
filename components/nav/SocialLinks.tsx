import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Link
        href={siteConfig.social.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-text-muted transition-colors hover:text-text-primary"
      >
        <GithubIcon size={18} />
      </Link>
      <Link
        href={siteConfig.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-text-muted transition-colors hover:text-text-primary"
      >
        <LinkedinIcon size={18} />
      </Link>
    </div>
  );
}
