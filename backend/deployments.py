"""Deployment history.

Seeded manually today from real git history (see the backend/.env-gated
seed step run once during V3 setup, not a script kept around permanently).
Meant to be populated by CI/CD later: a GitHub Actions step would POST here
with the real commit SHA after a successful deploy, authenticated the same
way a manual seed would be.
"""

from db import get_connection


def insert_deployment(
    version: str, commit_sha: str | None, environment: str, notes: str | None
) -> int:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO deployments (version, commit_sha, environment, notes)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                (version, commit_sha, environment, notes),
            )
            (deployment_id,) = cur.fetchone()
        conn.commit()
    return deployment_id


def list_deployments(limit: int = 20) -> list[dict]:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, version, commit_sha, environment, notes, deployed_at
                FROM deployments
                ORDER BY deployed_at DESC
                LIMIT %s
                """,
                (limit,),
            )
            rows = cur.fetchall()

    return [
        {
            "id": r[0],
            "version": r[1],
            "commit_sha": r[2],
            "environment": r[3],
            "notes": r[4],
            "deployed_at": r[5].isoformat(),
        }
        for r in rows
    ]
