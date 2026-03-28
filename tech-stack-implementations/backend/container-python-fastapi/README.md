# container-python-fastapi

FastAPI containerized backend service implementation.

## Tech Stack

- **Runtime**: Python 3.12
- **Framework**: FastAPI
- **Web Server**: Uvicorn
- **Validation**: Pydantic v2
- **Auth**: JWT (python-jose)
- **Observability**: OpenTelemetry, structlog
- **Testing**: pytest, pytest-asyncio

## Quick Start

### Local Development

```bash
# Install dependencies
pip install -e ".[dev]"

# Run with uvicorn
uvicorn src.app.main:app --reload --port 8000
```

### Docker

```bash
# Build and run
docker compose up --build

# Access endpoints
curl http://localhost:8000/health/live
curl http://localhost:8000/health/ready
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health/live` | Liveness probe |
| GET | `/health/ready` | Readiness probe |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_ENV` | `local` | Environment (local/dev/test/prod) |
| `DEBUG` | `false` | Enable debug mode |
| `PORT` | `8000` | Server port |
| `LOG_LEVEL` | `info` | Logging level |
| `JWT_SECRET` | - | JWT signing secret |
| `BYPASS_AUTH` | `false` | Skip auth (dev only) |
| `CORS_ORIGINS` | - | Comma-separated origins |
| `OTEL_SERVICE_NAME` | `container-python-fastapi` | OTel service name |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | - | OTel collector endpoint |

## Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=src/app --cov-report=html
```

## Observability

- **Jaeger UI**: http://localhost:16686
- **Prometheus**: http://localhost:9090
