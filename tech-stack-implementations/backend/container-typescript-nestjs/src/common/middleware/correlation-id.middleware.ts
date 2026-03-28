/**
 * App: container-typescript-nestjs
 * Package: src/common/middleware
 * File: correlation-id.middleware.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: CorrelationIdMiddleware
 * Description: Middleware to extract or generate x-correlation-id header
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import { AsyncLocalStorage } from 'async_hooks';

export const correlationStorage = new AsyncLocalStorage<string>();
export const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void): void {
    const correlationId =
      (req.headers[CORRELATION_ID_HEADER] as string) || uuidv4();

    res.setHeader(CORRELATION_ID_HEADER, correlationId);

    correlationStorage.run(correlationId, () => {
      next();
    });
  }
}
