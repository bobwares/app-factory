# ADR — Turn 13

## Status

Accepted

## Context

The user requested implementation of the Next.js hybrid container profile, which requires a production-ready Next.js application supporting multiple rendering modes (SSG, SSR, CSR) deployable as a Docker container.

## Decision

Implement the Next.js application with the following architecture choices:

1. **Next.js 14 App Router**: Use the App Router instead of Pages Router for better React Server Components support and improved routing capabilities.

2. **Hybrid Rendering Strategy**:
   - SSG for static pages (`/`, `/about`) - pre-rendered at build time
   - SSR with `force-dynamic` for dashboard - fresh data on each request
   - CSR for interactive components (Counter) - client-side hydration

3. **Standalone Output**: Configure `output: 'standalone'` for optimized Docker deployments, reducing image size by including only necessary dependencies.

4. **Simplified Styling**: Use plain Tailwind CSS classes instead of CSS-in-JS or complex theming libraries to avoid SSR hydration issues and reduce bundle size.

5. **Testing Strategy**: Vitest for unit/component tests (fast, Vite-native), Playwright for E2E tests (cross-browser support).

## Consequences

**Benefits:**
- App Router provides better performance with React Server Components
- Standalone output creates minimal container images (~100MB vs ~500MB)
- Hybrid rendering optimizes for each page's requirements
- Simple Tailwind approach avoids CSS-in-JS hydration complexity

**Tradeoffs:**
- App Router requires understanding of server/client component boundaries
- `force-dynamic` disables all caching for SSR pages
- No design system library (e.g., shadcn/ui) - components are custom
- Plain Tailwind classes may be less maintainable at scale
