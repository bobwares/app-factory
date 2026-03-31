/**
 * App: serverless-typescript-lambda
 * Package: src/middleware
 * File: correlation.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: extractCorrelationId, createHandlerContext
 * Description: Correlation ID extraction and handler context creation
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import type { HandlerContext } from '../types/api.js';
import type { AuthorizedEvent } from '../types/events.js';
import { logger } from './observability.js';

const CORRELATION_ID_HEADER = 'x-correlation-id';

export function extractCorrelationId(event: APIGatewayProxyEventV2): string {
  const headers = event.headers ?? {};
  const headerValue =
    headers[CORRELATION_ID_HEADER] ?? headers[CORRELATION_ID_HEADER.toUpperCase()];

  if (headerValue) {
    return headerValue;
  }

  return event.requestContext.requestId;
}

export function createHandlerContext(event: APIGatewayProxyEventV2): HandlerContext {
  const correlationId = extractCorrelationId(event);
  const requestId = event.requestContext.requestId;

  logger.appendKeys({
    correlationId,
    requestId,
    path: event.rawPath,
    method: event.requestContext.http.method,
  });

  const context: HandlerContext = {
    correlationId,
    requestId,
    path: event.rawPath,
    method: event.requestContext.http.method,
  };

  const authorizedEvent = event as AuthorizedEvent;
  if (authorizedEvent.requestContext.authorizer?.jwt?.claims?.sub) {
    context.userId = authorizedEvent.requestContext.authorizer.jwt.claims.sub;
    logger.appendKeys({ userId: context.userId });
  }

  return context;
}
