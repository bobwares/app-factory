/**
 * App: serverless-typescript-lambda
 * Package: src/utils
 * File: errors.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: AppError, ValidationError, NotFoundError, ForbiddenError, handleError
 * Description: Application error classes and error handling utilities
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import type { ZodError } from 'zod';
import { logger, metrics, MetricUnit } from '../middleware/observability.js';
import * as response from './response.js';

export class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number = 500,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 400, details);
    this.name = 'ValidationError';
  }

  static fromZodError(error: ZodError): ValidationError {
    const details = error.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return new ValidationError('Validation failed', details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id '${id}' not found` : `${resource} not found`;
    super('NOT_FOUND', message, 404);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied') {
    super('FORBIDDEN', message, 403);
    this.name = 'ForbiddenError';
  }
}

export function handleError(
  error: unknown,
  correlationId: string
): APIGatewayProxyStructuredResultV2 {
  const options = { correlationId };

  if (error instanceof ValidationError) {
    logger.warn('Validation error', { error: error.message, details: error.details });
    return response.badRequest(error.message, options, error.details);
  }

  if (error instanceof NotFoundError) {
    logger.info('Resource not found', { error: error.message });
    return response.notFound(error.message, options);
  }

  if (error instanceof ForbiddenError) {
    logger.warn('Access forbidden', { error: error.message });
    return response.forbidden(error.message, options);
  }

  if (error instanceof AppError) {
    logger.error('Application error', { code: error.code, message: error.message });
    metrics.addMetric('ApplicationErrors', MetricUnit.Count, 1);
    return response.internalError(error.message, options);
  }

  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  logger.error('Unhandled error', { error });
  metrics.addMetric('UnhandledErrors', MetricUnit.Count, 1);

  return response.internalError(message, options);
}
