# Spring Boot API - container-java-springboot Profile

Generated from `target-tech-stack-profile: container-java-springboot`

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Java 21 |
| Framework | Spring Boot 3.2.x |
| Build | Maven |
| Container | Docker (Eclipse Temurin JRE 21) |
| Database | PostgreSQL 16 |

## Observability

- **Structured Logging**: JSON format via Logstash Logback encoder
- **Tracing**: OpenTelemetry with OTLP export
- **Metrics**: Micrometer with Prometheus endpoint
- **Correlation**: `x-correlation-id` header propagation

## Quick Start

### Local Development

```bash
# Start PostgreSQL and OpenTelemetry Collector
docker-compose up db otel-collector -d

# Run application
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

### Full Stack

```bash
docker-compose up --build
```

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/ping` | Health check |
| `GET /api/v1/info` | Service info |
| `GET /actuator/health` | Actuator health |
| `GET /actuator/prometheus` | Prometheus metrics |

## Security

- **Local profile**: Security disabled for development
- **Production**: OAuth2 JWT validation required

## AWS Deployment

Designed for ECS Fargate with:
- ECR for container registry
- CloudWatch for logs
- X-Ray for distributed tracing (enable via configuration)
