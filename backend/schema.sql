-- V3 data layer. Idempotent: safe to run on every startup.
-- No foreign keys between these tables on purpose — each is an independent
-- event/fact log, not a relational object graph. project_views.project_slug
-- references a project's identity in content/projects/*.mdx, not a DB table
-- (project metadata lives in MDX, not Postgres).

CREATE TABLE IF NOT EXISTS contact_submissions (
    id            BIGSERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    email         TEXT NOT NULL,
    message       TEXT NOT NULL,
    email_sent    BOOLEAN NOT NULL DEFAULT false,
    email_error   TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
    ON contact_submissions (created_at DESC);

CREATE TABLE IF NOT EXISTS resume_downloads (
    id             BIGSERIAL PRIMARY KEY,
    file_type      TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx')),
    downloaded_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS resume_downloads_downloaded_at_idx
    ON resume_downloads (downloaded_at DESC);

CREATE TABLE IF NOT EXISTS project_views (
    id            BIGSERIAL PRIMARY KEY,
    project_slug  TEXT NOT NULL,
    viewed_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS project_views_slug_viewed_at_idx
    ON project_views (project_slug, viewed_at DESC);

CREATE TABLE IF NOT EXISTS deployments (
    id           BIGSERIAL PRIMARY KEY,
    version      TEXT NOT NULL,
    commit_sha   TEXT,
    environment  TEXT NOT NULL CHECK (environment IN ('production', 'local')),
    notes        TEXT,
    deployed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS deployments_deployed_at_idx
    ON deployments (deployed_at DESC);
