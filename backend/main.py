"""aldhairmartinez.com API — V2 foundation.

Deliberately small: no auth yet. A local PostgreSQL connection exists as a
foundation only — no schema, no feature uses it yet.
Runs locally via Docker (see ../docker-compose.yml) on http://localhost:8000
while the Next.js frontend runs on http://localhost:3000 — CORS below is
what allows the browser to call from one origin to the other.

This is local-only. Production (aldhairmartinez.com, Cloudflare Pages)
remains fully static and does not talk to this backend — deploying a real,
publicly-reachable version of this API is a separate, later decision.
"""

import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import get_connection
from email_client import EmailDeliveryError, send_contact_email
from telemetry import setup_telemetry

APP_VERSION = "0.1.0"

app = FastAPI(title="aldhairmartinez.com API", version=APP_VERSION)
setup_telemetry(app, APP_VERSION)

# Comma-separated list, e.g. "http://localhost:3000,http://localhost:3001"
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_methods=["GET", "POST"],
    # traceparent/tracestate: W3C Trace Context headers Faro's tracing
    # instrumentation attaches so this request continues the browser's
    # trace instead of starting a new root one. Not CORS-safelisted
    # headers, so the browser's preflight needs these listed explicitly.
    allow_headers=["Content-Type", "traceparent", "tracestate"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/version")
def version():
    return {"version": APP_VERSION}


@app.get("/health/db")
def health_db():
    try:
        with get_connection() as conn, conn.cursor() as cur:
            cur.execute("SELECT version();")
            (pg_version,) = cur.fetchone()
    except Exception:
        raise HTTPException(status_code=503, detail="Database connection failed.")

    return {"status": "ok", "postgres_version": pg_version}


class ContactRequest(BaseModel):
    name: str = Field(min_length=1)
    email: str = Field(min_length=1)
    message: str = Field(min_length=1)


@app.post("/api/contact")
def contact(payload: ContactRequest):
    try:
        send_contact_email(payload.name, payload.email, payload.message)
    except EmailDeliveryError:
        raise HTTPException(
            status_code=502,
            detail="Email delivery is temporarily unavailable. Please email hello@aldhairmartinez.com directly.",
        )

    return {
        "received": True,
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
    }
