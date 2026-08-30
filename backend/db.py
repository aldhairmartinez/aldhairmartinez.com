"""PostgreSQL connection pool.

One pool, created once at app startup and reused for the app's lifetime —
not a fresh connection per request. That's the actual point of pooling:
avoid paying a TCP handshake + auth round-trip on every single query.
"""

import os
from contextlib import contextmanager
from pathlib import Path

from psycopg_pool import ConnectionPool

_pool: ConnectionPool | None = None


def _conninfo() -> str:
    return (
        f"host={os.getenv('POSTGRES_HOST', 'postgres')} "
        f"port={os.getenv('POSTGRES_PORT', '5432')} "
        f"user={os.environ['POSTGRES_USER']} "
        f"password={os.environ['POSTGRES_PASSWORD']} "
        f"dbname={os.environ['POSTGRES_DB']}"
    )


def init_pool() -> None:
    global _pool
    _pool = ConnectionPool(_conninfo(), min_size=1, max_size=5, open=False)
    _pool.open()
    _apply_schema()


def close_pool() -> None:
    global _pool
    if _pool is not None:
        _pool.close()
        _pool = None


def _apply_schema() -> None:
    schema_path = Path(__file__).parent / "schema.sql"
    statements = [s.strip() for s in schema_path.read_text().split(";") if s.strip()]
    with get_connection() as conn:
        with conn.cursor() as cur:
            for statement in statements:
                cur.execute(statement)
        conn.commit()


@contextmanager
def get_connection():
    if _pool is None:
        raise RuntimeError("Database pool not initialized — call init_pool() first")
    with _pool.connection() as conn:
        yield conn
