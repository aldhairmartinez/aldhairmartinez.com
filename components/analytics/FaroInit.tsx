"use client";

import { useEffect } from "react";

const FARO_URL = process.env.NEXT_PUBLIC_FARO_URL;
const FARO_APP_NAME = process.env.NEXT_PUBLIC_FARO_APP_NAME ?? "aldhairmartinez-com";
const FARO_ENVIRONMENT = process.env.NEXT_PUBLIC_FARO_ENVIRONMENT ?? "production";

// Grafana Faro frontend instrumentation. Entirely opt-in via env vars — with
// NEXT_PUBLIC_FARO_URL unset (the default until a real collector endpoint
// exists), this component does nothing and ships no extra JS to the client
// beyond this no-op effect. No credentials live in this file: the collector
// URL is a public, write-only ingestion endpoint, the same pattern used by
// tools like Sentry's DSN.
export function FaroInit() {
  useEffect(() => {
    if (!FARO_URL) return;

    let disposed = false;

    import("@grafana/faro-web-sdk").then(({ initializeFaro, getWebInstrumentations }) => {
      if (disposed) return;

      initializeFaro({
        url: FARO_URL,
        app: {
          name: FARO_APP_NAME,
          environment: FARO_ENVIRONMENT,
        },
        // V1 decision: capture every session (no sampling) — this site's
        // traffic is low enough that 100% costs nothing meaningful, and it
        // gives a complete picture while the instrumentation is new.
        // Revisit if/when volume grows.
        sessionTracking: {
          samplingRate: 1,
        },
        instrumentations: getWebInstrumentations(),
      });
    });

    return () => {
      disposed = true;
    };
  }, []);

  return null;
}
