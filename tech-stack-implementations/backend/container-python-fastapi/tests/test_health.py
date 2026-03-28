"""
App: container-python-fastapi
Package: tests
File: test_health.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: TestHealthEndpoints
Description: Health endpoint tests
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

import pytest
from fastapi.testclient import TestClient

from src.app.main import app


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


class TestHealthEndpoints:
    def test_liveness_returns_healthy(self, client: TestClient) -> None:
        response = client.get("/health/live")

        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["status"] == "healthy"
        assert data["data"]["service"] == "container-python-fastapi"

    def test_readiness_returns_ready(self, client: TestClient) -> None:
        response = client.get("/health/ready")

        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert data["data"]["status"] == "ready"
        assert data["data"]["checks"]["self"] == "ok"

    def test_correlation_id_header_propagated(self, client: TestClient) -> None:
        correlation_id = "test-correlation-123"
        response = client.get(
            "/health/live",
            headers={"X-Correlation-ID": correlation_id},
        )

        assert response.status_code == 200
        assert response.headers.get("X-Correlation-ID") == correlation_id

    def test_correlation_id_generated_when_missing(self, client: TestClient) -> None:
        response = client.get("/health/live")

        assert response.status_code == 200
        assert "X-Correlation-ID" in response.headers
        assert len(response.headers["X-Correlation-ID"]) > 0
