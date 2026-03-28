# App: react-spa-container-nginx
# File: Dockerfile
# Version: 0.1.0
# Turns: 6
# Author: AI Coding Agent (Claude Opus 4.5)
# Date: 2026-03-28T20:15:00Z
# Description: Multi-stage Docker build for React SPA with nginx
# Log:
# 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5

FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
