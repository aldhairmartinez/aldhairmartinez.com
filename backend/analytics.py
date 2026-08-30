"""Resume-download and project-view analytics.

Anonymous counters only — no IP addresses, no user-agent strings, no
session/device identifiers. Each row is just "this happened at this time."
"""

import re

from db import get_connection

_SLUG_PATTERN = re.compile(r"^[a-z0-9-]{1,64}$")


def is_valid_slug(slug: str) -> bool:
    return bool(_SLUG_PATTERN.match(slug))


def record_resume_download(file_type: str) -> None:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO resume_downloads (file_type) VALUES (%s)",
                (file_type,),
            )
        conn.commit()


def record_project_view(project_slug: str) -> None:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO project_views (project_slug) VALUES (%s)",
                (project_slug,),
            )
        conn.commit()


def get_summary() -> dict:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT file_type, COUNT(*) FROM resume_downloads GROUP BY file_type"
            )
            downloads_by_type = {row[0]: row[1] for row in cur.fetchall()}

            cur.execute(
                """
                SELECT project_slug, COUNT(*) AS views
                FROM project_views
                GROUP BY project_slug
                ORDER BY views DESC
                LIMIT 5
                """
            )
            top_projects = [{"slug": row[0], "views": row[1]} for row in cur.fetchall()]

            cur.execute("SELECT COUNT(*) FROM contact_submissions")
            (total_contact_submissions,) = cur.fetchone()

    return {
        "resume_downloads_by_type": downloads_by_type,
        "top_projects": top_projects,
        "total_contact_submissions": total_contact_submissions,
    }
