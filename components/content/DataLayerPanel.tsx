"use client";

import { useEffect, useState } from "react";
import { InlineCode } from "@/components/ui/InlineCode";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Deployment = {
  id: number;
  version: string;
  commit_sha: string | null;
  environment: string;
  notes: string | null;
  deployed_at: string;
};

type Summary = {
  resume_downloads_by_type: Record<string, number>;
  top_projects: { slug: string; views: number }[];
  total_contact_submissions: number;
};

// Local dev only — no-ops entirely if NEXT_PUBLIC_API_URL is unset, same
// pattern as ContactForm and every other backend-dependent piece here.
export function DataLayerPanel() {
  const [deployments, setDeployments] = useState<Deployment[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!API_URL) return;
    Promise.all([
      fetch(`${API_URL}/api/deployments`).then((r) => r.json()),
      fetch(`${API_URL}/api/analytics/summary`).then((r) => r.json()),
    ])
      .then(([d, s]) => {
        setDeployments(d);
        setSummary(s);
      })
      .catch(() => setError(true));
  }, []);

  if (!API_URL) return null;

  return (
    <div className="flex flex-col gap-10">
      {error && (
        <p className="text-sm text-status-alert">Could not reach the local backend.</p>
      )}

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
          Deployment history
        </span>
        {deployments && deployments.length === 0 && (
          <p className="text-sm text-text-muted">No deployments recorded yet.</p>
        )}
        {deployments && deployments.length > 0 && (
          <ul className="flex flex-col gap-2">
            {deployments.map((d) => (
              <li key={d.id} className="flex flex-wrap items-baseline gap-3 text-sm">
                <span className="font-mono text-xs text-text-faint">
                  {new Date(d.deployed_at).toLocaleDateString()}
                </span>
                <span className="text-text-primary">{d.version}</span>
                <span className="font-mono text-[11px] uppercase text-text-faint">
                  {d.environment}
                </span>
                {d.commit_sha && <InlineCode>{d.commit_sha.slice(0, 7)}</InlineCode>}
                {d.notes && <span className="text-text-muted">{d.notes}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
          Analytics summary
        </span>
        {summary && (
          <ul className="flex flex-col gap-1 text-sm text-text-muted">
            <li>
              Resume downloads:{" "}
              {Object.entries(summary.resume_downloads_by_type)
                .map(([type, count]) => `${count} ${type}`)
                .join(", ") || "none yet"}
            </li>
            <li>Contact form submissions: {summary.total_contact_submissions}</li>
            <li>
              Most-viewed projects:{" "}
              {summary.top_projects.length > 0
                ? summary.top_projects.map((p) => `${p.slug} (${p.views})`).join(", ")
                : "none yet"}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
