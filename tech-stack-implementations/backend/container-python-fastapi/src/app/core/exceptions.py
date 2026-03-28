"""
App: container-python-fastapi
Package: src.app.core
File: exceptions.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: AppException, global_exception_handler, app_exception_handler
Description: Global exception handling
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

from fastapi import Request, status
from fastapi.responses import JSONResponse

from src.app.core.logging import get_logger
from src.app.models.response import ErrorDetail, ErrorResponse

logger = get_logger(__name__)


class AppException(Exception):
    def __init__(
        self,
        code: str,
        message: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        field: str | None = None,
    ) -> None:
        self.code = code
        self.message = message
        self.status_code = status_code
        self.field = field
        super().__init__(message)


async def app_exception_handler(request: Request, exc: AppException) -> JSONResponse:
    logger.warning(
        "Application exception",
        code=exc.code,
        message=exc.message,
        path=str(request.url.path),
    )
    return JSONResponse(
        status_code=exc.status_code,
        content=ErrorResponse(
            error=ErrorDetail(
                code=exc.code,
                message=exc.message,
                field=exc.field,
            )
        ).model_dump(mode="json"),
    )


async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception(
        "Unhandled exception",
        path=str(request.url.path),
        error=str(exc),
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content=ErrorResponse(
            error=ErrorDetail(
                code="INTERNAL_ERROR",
                message="An unexpected error occurred",
            )
        ).model_dump(mode="json"),
    )
