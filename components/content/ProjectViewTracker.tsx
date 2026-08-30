"use client";

import { useEffect, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fires an anonymous view-count beacon once, on mount. Renders nothing.
// Local dev only — no-ops entirely if NEXT_PUBLIC_API_URL is unset.
export function ProjectViewTracker({ slug }: { slug: string }) {
  // React Strict Mode double-invokes effects in dev (mount, cleanup,
  // mount again) — without this guard, one real page visit records two
  // rows locally. Production doesn't double-mount, so this only matters
  // for keeping local dev counts honest.
  const firedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!API_URL || firedFor.current === slug) return;
    firedFor.current = slug;
    fetch(`${API_URL}/api/analytics/project-view`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_slug: slug }),
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
