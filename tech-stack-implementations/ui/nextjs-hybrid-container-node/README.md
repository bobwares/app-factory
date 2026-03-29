# Next.js Hybrid Container Node

A production-ready Next.js application with hybrid rendering support (SSR, SSG, CSR) and Node.js container deployment.

## Architecture

```
+------------------+     +------------------+     +------------------+
|   Static Pages   |     |   Server Pages   |     |  API Routes      |
|   (SSG/ISR)      |     |   (SSR)          |     |  (/api/*)        |
+--------+---------+     +--------+---------+     +--------+---------+
         |                        |                        |
         +------------------------+------------------------+
                                  |
                          +-------+-------+
                          |   Next.js     |
                          |   Server      |
                          +-------+-------+
                                  |
                          +-------+-------+
                          |   Node.js     |
                          |   Container   |
                          +---------------+
```

## Features

- **Hybrid Rendering**: SSG, SSR, CSR, and ISR support
- **App Router**: Next.js 14+ file-based routing
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Container Ready**: Multi-stage Docker build with standalone output
- **Testing**: Vitest for unit tests, Playwright for E2E

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start

# Run tests
npm test
npm run test:e2e
```

## Project Structure

```
nextjs-hybrid-container-node/
+-- src/
|   +-- app/                    # App Router pages
|   |   +-- (dashboard)/        # Dashboard route group
|   |   +-- about/              # Static about page
|   |   +-- api/health/         # Health check endpoint
|   |   +-- layout.tsx          # Root layout
|   |   +-- page.tsx            # Home page
|   +-- components/
|   |   +-- layout/             # Layout components
|   |   +-- ui/                 # UI components
|   +-- hooks/                  # Custom React hooks
|   +-- lib/                    # Utility functions
|   +-- styles/                 # Global styles
+-- tests/
|   +-- unit/                   # Vitest unit tests
|   +-- e2e/                    # Playwright E2E tests
+-- public/                     # Static assets
+-- Dockerfile                  # Production container
+-- docker-compose.yml          # Local development
```

## Rendering Modes

| Page | Mode | Description |
|------|------|-------------|
| `/` | SSG | Static home page |
| `/about` | SSG | Static about page |
| `/dashboard` | SSR | Server-rendered on each request |
| `/api/health` | API | Dynamic API endpoint |

## Docker Deployment

### Build Production Image

```bash
docker build -t nextjs-hybrid-app .
docker run -p 3000:3000 nextjs-hybrid-app
```

### Docker Compose

```bash
# Production mode
docker-compose up

# Development mode with hot reload
docker-compose --profile dev up dev
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_VERSION` | App version | `1.0.0` |
| `BUILD_ID` | Build identifier | `build-{timestamp}` |

### Build Output

The app uses Next.js standalone output for optimized container deployment:

```js
// next.config.js
module.exports = {
  output: 'standalone',
};
```

## Testing

### Unit Tests (Vitest)

```bash
npm test                 # Run once
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage
```

### E2E Tests (Playwright)

```bash
npm run test:e2e         # Run tests
npm run test:e2e:ui      # Interactive mode
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **Testing**: Vitest + Testing Library + Playwright
- **Runtime**: Node.js 22
- **Container**: Docker multi-stage build

## Health Check

The `/api/health` endpoint returns:

```json
{
  "status": "healthy",
  "timestamp": "2026-03-29T00:26:14.000Z",
  "version": "1.0.0",
  "uptime": 123,
  "checks": [
    { "name": "server", "status": "pass", "duration": 1 }
  ]
}
```
