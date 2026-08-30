"use client";

import { Button } from "@/components/ui/Button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fires an anonymous download-count beacon (fire-and-forget, never blocks
// or delays the actual download) before the native <a download> proceeds.
// Local dev only — no-ops entirely if NEXT_PUBLIC_API_URL is unset, same as
// every other backend-dependent piece of this site.
export function ResumeDownloadButton({
  fileType,
  href,
  download,
  variant,
  children,
}: {
  fileType: "pdf" | "docx";
  href: string;
  download: string;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}) {
  function handleClick() {
    if (!API_URL) return;
    fetch(`${API_URL}/api/analytics/resume-download`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_type: fileType }),
      keepalive: true,
    }).catch(() => {
      // Best-effort only — never surface a failed analytics beacon to the
      // visitor trying to download a resume.
    });
  }

  return (
    <Button href={href} download={download} variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}
