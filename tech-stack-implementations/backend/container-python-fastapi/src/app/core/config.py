"""
App: container-python-fastapi
Package: src.app.core
File: config.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: Settings, get_settings
Description: Application configuration using pydantic-settings
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    app_name: str = "container-python-fastapi"
    app_env: str = "local"
    debug: bool = False
    port: int = 8000
    log_level: str = "info"

    jwt_secret: str = "dev-secret-change-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 30
    bypass_auth: bool = False
    cors_origins: str = "http://localhost:3000,http://localhost:5173"

    otel_service_name: str = "container-python-fastapi"
    otel_exporter_otlp_endpoint: str = "http://localhost:4318"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    return Settings()
