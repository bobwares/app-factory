/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/api/src/common/middleware/correlation-id.middleware.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Middleware to propagate or generate correlation IDs for request tracing
 */


import { Injectable, NestMiddleware } from '@nestjs/common';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const correlationId =
      this.getHeaderValue(req, 'x-correlation-id') ??
      this.getHeaderValue(req, 'x-request-id') ??
      uuidv4();

    res.setHeader('x-correlation-id', correlationId);
    next();
  }

  private getHeaderValue(req: IncomingMessage, name: string): string | undefined {
    const value = req.headers[name];

    if (typeof value === 'string') {
      return value;
    }

    return Array.isArray(value) ? value[0] : undefined;
  }
}
