"""
main.py

Application entrypoint for the MediGuide AI backend.

Responsibilities:
    - Create and configure the FastAPI app instance.
    - Register middleware (CORS).
    - Register routers (upload, analyze, history).
    - Expose a health check endpoint.
    - Initialize the database on startup.

This file intentionally contains no business logic — routers delegate to
services, and services will later contain the actual implementation.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database import init_db
from app.routers import analyze, history, upload, dashboard

from app.routers import auth


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.

    Runs startup logic (creating DB tables) before the app starts serving
    requests, and can run shutdown/cleanup logic after the app stops.
    """
    # --- Startup ---
    init_db()
    yield
    # --- Shutdown ---
    # (No cleanup required yet; placeholder for future resource teardown.)


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Backend foundation for MediGuide AI — a multi-agent medical report "
        "navigator. This build exposes only the core API scaffolding "
        "(upload, analyze, history) without business logic, AI agents, or "
        "authentication."
    ),
    lifespan=lifespan,
)

# --- CORS ---
# Allows the (future) frontend to communicate with this backend during
# development. Origins are configurable via the CORS_ORIGINS env variable.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(history.router)
app.include_router(auth.router)
app.include_router(dashboard.router)


@app.get("/", tags=["Health"])
def root() -> dict:
    """Basic root endpoint confirming the API is reachable."""
    return {
        "message": f"{settings.APP_NAME} backend is running.",
        "version": settings.APP_VERSION,
    }


@app.get("/health", tags=["Health"])
def health_check() -> dict:
    """
    Health check endpoint.

    Used by load balancers, uptime monitors, or the frontend to verify
    that the API is up and responsive.
    """
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
    }
