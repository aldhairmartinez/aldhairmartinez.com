"""Contact-form persistence.

Two separate transactions, deliberately not one: insert the submission
first (a durable record that someone tried to reach out), then update it
with the email outcome after attempting delivery. The insert and the
Resend HTTP call can never be one atomic transaction anyway — Postgres
can't roll back an external API call — so this ordering is what makes the
record recoverable even if email delivery fails partway through.
"""

from db import get_connection


def insert_submission(name: str, email: str, message: str) -> int:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO contact_submissions (name, email, message)
                VALUES (%s, %s, %s)
                RETURNING id
                """,
                (name, email, message),
            )
            (submission_id,) = cur.fetchone()
        conn.commit()
    return submission_id


def mark_email_result(submission_id: int, sent: bool, error: str | None = None) -> None:
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE contact_submissions
                SET email_sent = %s, email_error = %s
                WHERE id = %s
                """,
                (sent, error, submission_id),
            )
        conn.commit()
