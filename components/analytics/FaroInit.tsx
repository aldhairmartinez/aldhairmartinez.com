"use client";

import { useEffect } from "react";

const FARO_URL = process.env.NEXT_PUBLIC_FARO_URL;
const FARO_APP_NAME = process.env.NEXT_PUBLIC_FARO_APP_NAME ?? "aldhairmartinez-com";
const FARO_ENVIRONMENT = process.env.NEXT_PUBLIC_FARO_ENVIRONMENT ?? "production";
// Matches the backend's OTEL_RESOURCE_ATTRIBUTES service.namespace
// (docker-compose.yml) — same namespace, different service.name per side,
// so Grafana can associate them as parts of the same application.
const FARO_APP_NAMESPACE = "aldhairmartinez-com";
// Only attach traceparent/tracestate to cross-origin requests aimed at our
// own backend — never to third-party calls (e.g. none today, but this is
// what stops trace headers leaking to arbitrary origins in the future).
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PRODUCTION_HOSTNAME = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aldhairmartinez.com").hostname;
  } catch {
    return "aldhairmartinez.com";
  }
})();

// Grafana Faro frontend instrumentation. Entirely opt-in via env vars — with
// NEXT_PUBLIC_FARO_URL unset (the default until a real collector endpoint
// exists), this component does nothing and ships no extra JS to the client
// beyond this no-op effect. No credentials live in this file: the collector
// URL is a public, write-only ingestion endpoint, the same pattern used by
// tools like Sentry's DSN.
export function FaroInit() {
  useEffect(() => {
    if (!FARO_URL) return;

    // The Grafana Cloud collector's CORS allowlist only permits localhost
    // and the real production hostname — deliberately, so that adding LAN
    // testing doesn't widen production's CORS config. A LAN IP (e.g. when
    // testing from a phone on the same Wi-Fi) would get a same-origin-policy
    // rejection on every send, so skip initializing Faro there entirely
    // rather than let it fail on every request.
    const hostname = window.location.hostname;
    const isAllowedOrigin =
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === PRODUCTION_HOSTNAME;
    if (!isAllowedOrigin) return;

    // Faro registers itself on window._faroInternal on first successful
    // init and never unregisters (the property is defined non-configurable
    // by the SDK itself). Checking that marker directly - not just a local
    // "disposed" flag scoped to this effect instance - is what actually
    // prevents a second real initializeFaro() call from happening at all
    // in dev, where React Strict Mode's double-invoke and Fast Refresh
    // remounts can both re-run this effect against the same window. This
    // is dev-only: production's static export never double-mounts.
    if ((window as unknown as { _faroInternal?: unknown })._faroInternal) return;

    let disposed = false;

    Promise.all([import("@grafana/faro-web-sdk"), import("@grafana/faro-web-tracing")]).then(
      ([{ initializeFaro, getWebInstrumentations }, { TracingInstrumentation }]) => {
        if (disposed || (window as unknown as { _faroInternal?: unknown })._faroInternal) return;

        initializeFaro({
          url: FARO_URL,
          app: {
            name: FARO_APP_NAME,
            namespace: FARO_APP_NAMESPACE,
            environment: FARO_ENVIRONMENT,
          },
          // V1 decision: capture every session (no sampling) — this site's
          // traffic is low enough that 100% costs nothing meaningful, and it
          // gives a complete picture while the instrumentation is new.
          // Revisit if/when volume grows.
          sessionTracking: {
            samplingRate: 1,
          },
          instrumentations: [
            ...getWebInstrumentations(),
            new TracingInstrumentation({
              instrumentationOptions: {
                // Without this, the browser never attaches traceparent to
                // cross-origin fetches (a same-origin-only default) — so the
                // backend would otherwise always start a new root trace
                // instead of continuing the browser's.
                propagateTraceHeaderCorsUrls: API_URL
                  ? [new RegExp(`^${API_URL.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`)]
                  : [],
              },
            }),
          ],
        });
      }
    );

    return () => {
      disposed = true;
    };
  }, []);

  return null;
}
