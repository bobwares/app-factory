"""
App: container-python-fastapi
Package: src.app.core
File: tracing.py
Version: 0.1.0
Turns: 6
Author: AI Coding Agent (Claude Opus 4.5)
Date: 2026-03-28T20:15:00Z
Exports: init_tracing
Description: OpenTelemetry tracing configuration
Log:
6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
"""

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

from src.app.core.config import get_settings


def init_tracing() -> None:
    settings = get_settings()

    resource = Resource.create(
        {
            "service.name": settings.otel_service_name,
            "service.version": "0.1.0",
            "deployment.environment": settings.app_env,
        }
    )

    provider = TracerProvider(resource=resource)

    exporter = OTLPSpanExporter(
        endpoint=f"{settings.otel_exporter_otlp_endpoint}/v1/traces"
    )

    provider.add_span_processor(BatchSpanProcessor(exporter))
    trace.set_tracer_provider(provider)
