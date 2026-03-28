# App: container-python-fastapi
# File: Dockerfile
# Version: 0.1.0
# Turns: 6
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T20:15:00Z
# Description: Multi-stage Docker build for FastAPI production container
# Log:
# 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5

FROM python:3.12-slim AS builder

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY pyproject.toml ./
RUN uv pip install --system --no-cache -r pyproject.toml

COPY src ./src

FROM python:3.12-slim AS production

WORKDIR /app

RUN groupadd -r fastapi && useradd -r -g fastapi fastapi

COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY --from=builder /app/src ./src

USER fastapi

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PORT=8000

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import httpx; httpx.get('http://localhost:8000/health/live').raise_for_status()" || exit 1

CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
