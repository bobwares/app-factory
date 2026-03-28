# App: container-typescript-nestjs
# File: Dockerfile
# Version: 0.1.0
# Turns: 4
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T19:15:00Z
# Description: Multi-stage Docker build for NestJS production container
# Log:
# 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig*.json nest-cli.json ./
COPY src ./src

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/dist ./dist

USER nestjs

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health/live || exit 1

CMD ["node", "dist/main.js"]
