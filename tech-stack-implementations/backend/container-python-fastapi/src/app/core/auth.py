"""
App: container-python-fastapi
Package: src.app.core
File: auth.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: JWTBearer, get_current_user, create_access_token
Description: JWT authentication utilities
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

from datetime import datetime, timedelta
from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel

from src.app.core.config import Settings, get_settings


class TokenPayload(BaseModel):
    sub: str
    exp: datetime
    iat: datetime


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True) -> None:
        super().__init__(auto_error=auto_error)


jwt_bearer = JWTBearer()


def create_access_token(
    subject: str,
    settings: Settings | None = None,
    expires_delta: timedelta | None = None,
) -> str:
    if settings is None:
        settings = get_settings()

    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.jwt_expiration_minutes)

    now = datetime.utcnow()
    expire = now + expires_delta

    to_encode: dict[str, Any] = {
        "sub": subject,
        "exp": expire,
        "iat": now,
    }

    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_token(token: str, settings: Settings) -> TokenPayload:
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm],
        )
        return TokenPayload(**payload)
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(jwt_bearer),
    settings: Settings = Depends(get_settings),
) -> str:
    if settings.bypass_auth:
        return "dev-user"

    token_data = decode_token(credentials.credentials, settings)
    return token_data.sub
