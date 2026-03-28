"""
App: container-python-fastapi
Package: src.app.api
File: health.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: router
Description: Health check endpoints for liveness and readiness probes
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from src.app.core.config import get_settings
from src.app.models.response import ApiResponse

router = APIRouter(prefix="/health", tags=["Health"])


class HealthStatus(BaseModel):
    status: str
    service: str
    version: str
    environment: str
    timestamp: datetime


class ReadinessStatus(BaseModel):
    status: str
    checks: dict[str, str]


@router.get("/live", response_model=ApiResponse[HealthStatus])
async def liveness() -> ApiResponse[HealthStatus]:
    settings = get_settings()
    return ApiResponse(
        data=HealthStatus(
            status="healthy",
            service=settings.app_name,
            version="0.1.0",
            environment=settings.app_env,
            timestamp=datetime.utcnow(),
        )
    )


@router.get("/ready", response_model=ApiResponse[ReadinessStatus])
async def readiness() -> ApiResponse[ReadinessStatus]:
    return ApiResponse(
        data=ReadinessStatus(
            status="ready",
            checks={
                "self": "ok",
            },
        )
    )
