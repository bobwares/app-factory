# ADR — Turn 6

## Decision: Implement container-python-fastapi__react-spa-container-nginx as reference full-stack architecture

### Status
Accepted

### Context
The project requires a reference implementation for combining a Python FastAPI backend with a React SPA frontend, both containerized and deployed with observability infrastructure.

### Decision
Implement the stack with the following architectural choices:

1. **Backend (FastAPI)**
   - Use Pydantic v2 for validation and settings management
   - Use structlog for structured logging (JSON in prod, colored console in dev)
   - Use OpenTelemetry for distributed tracing with OTLP export
   - Implement correlation ID middleware for request tracing across services
   - Use JWT authentication with bypass mode for development

2. **Frontend (React)**
   - Use Vite as the build tool for fast HMR and optimal production builds
   - Use TypeScript with strict mode enabled
   - Use CSS Modules for component-scoped styling
   - Serve production build via nginx with SPA fallback routing
   - Proxy API requests through nginx to backend

3. **Observability**
   - Use OpenTelemetry Collector as the telemetry aggregator
   - Export traces to Jaeger for visualization
   - Export metrics to Prometheus
   - Pass correlation IDs between frontend and backend

### Consequences
- **Positive**: Clean separation of concerns, industry-standard tooling, excellent developer experience
- **Positive**: Observability built-in from the start, not bolted on later
- **Negative**: More complex local setup (multiple containers)
- **Neutral**: nginx adds a layer but provides production-ready serving

### Alternatives Considered
- Next.js hybrid: Rejected for this stack as it's a different profile (nextjs-hybrid-container-node)
- Django instead of FastAPI: FastAPI chosen for async-first design and automatic OpenAPI docs
