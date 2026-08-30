"""OpenTelemetry tracing setup — sends spans directly to Grafana Cloud's
OTLP gateway. No Collector/Alloy at this stage: one backend service doesn't
need a fan-in layer yet, and the SDK's own BatchSpanProcessor already
batches spans before sending.

Optional, like Faro and Resend: with OTEL_EXPORTER_OTLP_ENDPOINT unset,
setup_telemetry() does nothing and the app behaves exactly as it did before
tracing existed.
"""

import os

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.httpx import HTTPXClientInstrumentor
from opentelemetry.instrumentation.psycopg import PsycopgInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor


def setup_telemetry(app, service_version: str) -> None:
    if not os.getenv("OTEL_EXPORTER_OTLP_ENDPOINT"):
        return

    # service.name/namespace/deployment.environment come from the standard
    # OTEL_SERVICE_NAME / OTEL_RESOURCE_ATTRIBUTES env vars (set in
    # docker-compose.yml); service.version is passed in explicitly so it
    # stays a single source of truth with APP_VERSION in main.py rather than
    # a second copy of the same string.
    resource = Resource.create({"service.version": service_version})
    provider = TracerProvider(resource=resource)
    provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
    trace.set_tracer_provider(provider)

    FastAPIInstrumentor.instrument_app(app)
    HTTPXClientInstrumentor().instrument()
    PsycopgInstrumentor().instrument()
