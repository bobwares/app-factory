/**
 * App: serverless-typescript-lambda
 * Package: src/utils
 * File: response.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: ok, created, badRequest, notFound, forbidden, internalError
 * Description: API Gateway response builders with typed contracts
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import type { ApiResponse, ApiErrorResponse } from '../types/api.js';

interface ResponseOptions {
  correlationId: string;
  headers?: Record<string, string>;
}

function buildResponse(
  statusCode: number,
  body: ApiResponse<unknown> | ApiErrorResponse,
  options: ResponseOptions
): APIGatewayProxyStructuredResultV2 {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'X-Correlation-Id': options.correlationId,
      ...options.headers,
    },
    body: JSON.stringify(body),
  };
}

export function ok<T>(data: T, options: ResponseOptions): APIGatewayProxyStructuredResultV2 {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      correlationId: options.correlationId,
      timestamp: new Date().toISOString(),
    },
  };
  return buildResponse(200, response, options);
}

export function created<T>(data: T, options: ResponseOptions): APIGatewayProxyStructuredResultV2 {
  const response: ApiResponse<T> = {
    success: true,
    data,
    meta: {
      correlationId: options.correlationId,
      timestamp: new Date().toISOString(),
    },
  };
  return buildResponse(201, response, options);
}

export function badRequest(
  message: string,
  options: ResponseOptions,
  details?: unknown
): APIGatewayProxyStructuredResultV2 {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'BAD_REQUEST',
      message,
      details,
    },
    meta: {
      correlationId: options.correlationId,
      timestamp: new Date().toISOString(),
    },
  };
  return buildResponse(400, response, options);
}

export function notFound(
  message: string,
  options: ResponseOptions
): APIGatewayProxyStructuredResultV2 {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message,
    },
    meta: {
      correlationId: options.correlationId,
      timestamp: new Date().toISOString(),
    },
  };
  return buildResponse(404, response, options);
}

export function forbidden(
  message: string,
  options: ResponseOptions
): APIGatewayProxyStructuredResultV2 {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'FORBIDDEN',
      message,
    },
    meta: {
      correlationId: options.correlationId,
      timestamp: new Date().toISOString(),
    },
  };
  return buildResponse(403, response, options);
}

export function internalError(
  message: string,
  options: ResponseOptions
): APIGatewayProxyStructuredResultV2 {
  const response: ApiErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message,
    },
    meta: {
      correlationId: options.correlationId,
      timestamp: new Date().toISOString(),
    },
  };
  return buildResponse(500, response, options);
}
