"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks, footerLinks } from "@/lib/site.config";
import { SocialLinks } from "@/components/nav/SocialLinks";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center text-text-primary"
      >
        {open ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-[57px] border-b border-border bg-bg-base px-6 py-6">
          <nav className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-text-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <SocialLinks className="mt-6" />
        </div>
      )}
    </div>
  );
}
