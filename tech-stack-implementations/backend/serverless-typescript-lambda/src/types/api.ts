/**
 * App: serverless-typescript-lambda
 * Package: src/types
 * File: api.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: ApiResponse, ApiErrorResponse, HealthStatus, HandlerContext
 * Description: Common API types and response contracts
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    correlationId: string;
    timestamp: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    correlationId: string;
    timestamp: string;
  };
}

export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
  timestamp: string;
  checks?: Record<
    string,
    {
      status: 'pass' | 'fail' | 'warn';
      message?: string;
    }
  >;
}

export interface HandlerContext {
  correlationId: string;
  requestId: string;
  path: string;
  method: string;
  userId?: string;
}
