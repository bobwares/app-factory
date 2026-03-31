# App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
# File: apps/api/Dockerfile
# Version: 0.1.0
# Turns: 1
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-31T19:15:00Z
# Description: Multi-stage Docker build for NestJS API with pnpm and turbo
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

# Copy packages and api app
COPY packages ./packages
COPY apps/api ./apps/api

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the api
RUN pnpm turbo build --filter=api

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy built artifacts
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package.json ./
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules

USER nestjs

EXPOSE 8000

CMD ["node", "dist/main.js"]
