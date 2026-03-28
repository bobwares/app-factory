# react-spa-container-nginx

React single-page application served by nginx in a container.

## Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Runtime**: Node 22 (build), nginx (serve)
- **Testing**: Vitest, Testing Library

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run tests
npm test
```

### Docker

```bash
# Build and run
docker compose up --build

# Access the app
open http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 5173 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint code |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (default: /api) |

## Project Structure

```
src/
  components/     # React components
  hooks/          # Custom React hooks
  lib/            # Utilities and API client
  types/          # TypeScript types
  test/           # Test setup and tests
```

## Docker

The Dockerfile uses a multi-stage build:
1. **Builder stage**: Node 22 Alpine, installs deps, builds app
2. **Production stage**: nginx Alpine, serves static files

nginx configuration includes:
- Gzip compression
- Security headers
- Static asset caching
- SPA fallback routing
- API proxy support
