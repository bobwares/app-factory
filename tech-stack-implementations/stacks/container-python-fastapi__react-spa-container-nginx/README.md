# container-python-fastapi__react-spa-container-nginx

Combined stack with FastAPI backend and React SPA frontend.

## Components

| Service            | Port      | Description             |
|--------------------|-----------|-------------------------|
| **api**            | 8000      | FastAPI backend         |
| **ui**             | 3000      | React SPA (nginx)       |
| **otel-collector** | 4317/4318 | OpenTelemetry Collector |
| **jaeger**         | 16686     | Distributed tracing UI  |
| **prometheus**     | 9090      | Metrics dashboard       |

## Quick Start

```bash
# Start the full stack
docker compose up --build

# Access services
open http://localhost:3000      # React UI
open http://localhost:8000/docs # FastAPI Swagger
open http://localhost:16686     # Jaeger traces
open http://localhost:9090      # Prometheus metrics
```

## Architecture

```
┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│  React UI   │
└─────────────┘     │  (nginx:80) │
                    └──────┬──────┘
                           │ /api/*
                           ▼
                    ┌─────────────┐
                    │   FastAPI   │
                    │  (uvicorn)  │
                    └──────┬──────┘
                           │ OTLP
                           ▼
                    ┌─────────────┐
                    │    OTEL     │
                    │  Collector  │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
       ┌─────────────┐           ┌─────────────┐
       │   Jaeger    │           │ Prometheus  │
       │  (traces)   │           │  (metrics)  │
       └─────────────┘           └─────────────┘
```

## Development

For local development without Docker, run each service separately:

```bash
# Terminal 1: Backend
cd ../../backend/container-python-fastapi
pip install -e ".[dev]"
uvicorn src.app.main:app --reload --port 8000

# Terminal 2: Frontend
cd ../../ui/react-spa-container-nginx
npm install
npm run dev
```
