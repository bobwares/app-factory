"""
App: container-python-fastapi
Package: src.app
File: main.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: app
Description: FastAPI application entry point
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from src.app.api.health import router as health_router
from src.app.core.config import get_settings
from src.app.core.exceptions import (
    AppException,
    app_exception_handler,
    global_exception_handler,
)
from src.app.core.logging import configure_logging, get_logger
from src.app.core.tracing import init_tracing
from src.app.middleware.correlation_id import CorrelationIdMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    configure_logging()
    logger = get_logger(__name__)
    settings = get_settings()

    logger.info(
        "Starting application",
        service=settings.app_name,
        environment=settings.app_env,
    )

    if settings.app_env != "local":
        init_tracing()

    yield

    logger.info("Shutting down application")


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        description="FastAPI containerized backend service",
        lifespan=lifespan,
    )

    app.add_middleware(CorrelationIdMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.add_exception_handler(AppException, app_exception_handler)
    app.add_exception_handler(Exception, global_exception_handler)

    app.include_router(health_router)

    FastAPIInstrumentor.instrument_app(app)

    return app


app = create_app()
