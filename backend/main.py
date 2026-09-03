"""aldhairmartinez-portfolio-observability API — V3 data layer.

Runs locally via Docker (see ../docker-compose.yml) on http://localhost:8000
while the Next.js frontend runs on http://localhost:3000 — CORS below is
what allows the browser to call from one origin to the other.

This is local-only. Production (aldhairmartinez.com, Cloudflare Pages)
remains fully static and does not talk to this backend — deploying a real,
publicly-reachable version of this API is a separate, later decision.
"""

import os
import secrets
from contextlib import asynccontextmanager
from typing import Literal

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import analytics
import contacts
import db
import deployments
from email_client import EmailDeliveryError, send_contact_email
from telemetry import setup_telemetry

APP_VERSION = "0.1.0"


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init_pool()
    yield
    db.close_pool()


app = FastAPI(title="aldhairmartinez-portfolio-observability API", version=APP_VERSION, lifespan=lifespan)
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
        with db.get_connection() as conn, conn.cursor() as cur:
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
    submission_id = None
    try:
        submission_id = contacts.insert_submission(payload.name, payload.email, payload.message)
    except Exception:
        # Postgres being down shouldn't stop a visitor's message from being
        # attempted — but there's nothing to update afterward if so.
        pass

    try:
        send_contact_email(payload.name, payload.email, payload.message)
    except EmailDeliveryError as err:
        if submission_id is not None:
            contacts.mark_email_result(submission_id, sent=False, error=str(err))
        raise HTTPException(
            status_code=502,
            detail="Email delivery is temporarily unavailable. Please email hello@aldhairmartinez.com directly.",
        )

    if submission_id is not None:
        contacts.mark_email_result(submission_id, sent=True)

    return {
        "received": True,
        "name": payload.name,
        "email": payload.email,
        "message": payload.message,
    }


class ResumeDownloadRequest(BaseModel):
    file_type: Literal["pdf", "docx"]


@app.post("/api/analytics/resume-download")
def analytics_resume_download(payload: ResumeDownloadRequest):
    analytics.record_resume_download(payload.file_type)
    return {"recorded": True}


class ProjectViewRequest(BaseModel):
    project_slug: str = Field(min_length=1, max_length=64)


@app.post("/api/analytics/project-view")
def analytics_project_view(payload: ProjectViewRequest):
    if not analytics.is_valid_slug(payload.project_slug):
        raise HTTPException(status_code=422, detail="Invalid project_slug.")
    analytics.record_project_view(payload.project_slug)
    return {"recorded": True}


@app.get("/api/analytics/summary")
def analytics_summary():
    return analytics.get_summary()


class DeploymentRequest(BaseModel):
    version: str = Field(min_length=1)
    commit_sha: str | None = None
    environment: Literal["production", "local"]
    notes: str | None = None


def require_deploy_token(x_deploy_token: str = Header(default="")):
    expected = os.getenv("DEPLOY_TOKEN", "")
    if not expected or not secrets.compare_digest(x_deploy_token, expected):
        raise HTTPException(status_code=401, detail="Invalid or missing deploy token.")


@app.get("/api/deployments")
def get_deployments():
    return deployments.list_deployments()


@app.post("/api/deployments", dependencies=[Depends(require_deploy_token)])
def create_deployment(payload: DeploymentRequest):
    deployment_id = deployments.insert_deployment(
        payload.version, payload.commit_sha, payload.environment, payload.notes
    )
    return {"id": deployment_id}
