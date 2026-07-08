"""
database.py

SQLAlchemy database setup for the MediGuide AI backend.

This module defines:
    - `engine`: the SQLAlchemy engine bound to the configured DATABASE_URL (SQLite).
    - `SessionLocal`: a session factory for creating DB sessions per request.
    - `Base`: the declarative base class that all ORM models should inherit from.
    - `get_db`: a FastAPI dependency that yields a DB session and ensures cleanup.

No business logic lives here — this file is purely infrastructure.
"""

from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import settings

# `check_same_thread` is only needed for SQLite when used with multiple threads
# (as FastAPI does). It's a no-op for other database backends.
connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    echo=settings.DEBUG,
    future=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    future=True,
)


class Base(DeclarativeBase):
    """Base class for all ORM models in the application."""
    pass


def get_db() -> Generator:
    """
    FastAPI dependency that provides a database session for the duration
    of a single request, and guarantees it is closed afterwards.

    Usage:
        @router.get("/example")
        def example(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """
    Creates all database tables based on models registered against `Base`.

    Called once at application startup (see app/main.py). In a production
    setup this would typically be replaced by a migration tool (e.g. Alembic),
    but is sufficient for local/hackathon development with SQLite.
    """
    # Import models here so they are registered on Base.metadata
    # before create_all() is called. Kept local to avoid circular imports.
    from app.models import report  # noqa: F401

    Base.metadata.create_all(bind=engine)
