"""
config.py

Centralized application configuration.
Loads values from environment variables (and a local .env file, if present)
using pydantic-settings. This is the single source of truth for configurable
values across the app — no hard-coded settings should exist elsewhere.
"""

from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application settings.

    All values can be overridden via environment variables or a `.env` file
    placed at the project root (see `.env.example` for the expected keys).
    """

    # --- General app info ---
    APP_NAME: str = "MediGuide AI - Medical Report Navigator"
    APP_VERSION: str = "0.1.0"
    ENVIRONMENT: str = "development"  # development | staging | production
    DEBUG: bool = True

    # --- Server ---
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # --- CORS ---
    # Comma-separated list of allowed origins in the .env file,
    # e.g. CORS_ORIGINS=http://localhost:3000,http://localhost:5173
    CORS_ORIGINS: str = "*"

    # --- Database ---
    DATABASE_URL: str = "sqlite:///./mediguide.db"

    # --- File uploads ---
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE_MB: int = 20

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    @property
    def cors_origins_list(self) -> List[str]:
        """Convert the comma-separated CORS_ORIGINS string into a list."""
        if self.CORS_ORIGINS.strip() == "*":
            return ["*"]
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


@lru_cache()
def get_settings() -> Settings:
    """
    Returns a cached Settings instance so the environment/.env file
    is parsed only once per process.
    """
    return Settings()


settings = get_settings()
