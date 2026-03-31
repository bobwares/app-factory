# App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
# File: apps/web/Dockerfile
# Version: 0.1.0
# Turns: 1
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-31T19:15:00Z
# Description: Multi-stage Docker build for Next.js standalone deployment
FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy workspace files
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY turbo.json ./

# Copy packages and web app
COPY packages ./packages
COPY apps/web ./apps/web

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the web app
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo build --filter=web

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/web/server.js"]
