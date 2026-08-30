"""PostgreSQL connection — foundation only, no schema/queries yet.

Deliberately plain psycopg, no ORM: there's no data model to abstract over
yet, so adding one now would be an abstraction with nothing to abstract.
Revisit (SQLAlchemy Core, or an ORM) once a real feature needs tables.
"""

import os

import psycopg


def get_connection() -> psycopg.Connection:
    return psycopg.connect(
        host=os.getenv("POSTGRES_HOST", "postgres"),
        port=os.getenv("POSTGRES_PORT", "5432"),
        user=os.environ["POSTGRES_USER"],
        password=os.environ["POSTGRES_PASSWORD"],
        dbname=os.environ["POSTGRES_DB"],
    )
