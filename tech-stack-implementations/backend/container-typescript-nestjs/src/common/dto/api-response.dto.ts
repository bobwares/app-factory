/**
 * App: container-typescript-nestjs
 * Package: src/common/dto
 * File: api-response.dto.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: ApiResponse, createSuccessResponse
 * Description: Standard API response envelope DTO
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { correlationStorage } from '../middleware/correlation-id.middleware';

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiMeta {
  correlationId: string;
  timestamp: string;
  pagination?: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: ApiError;
  meta: ApiMeta;
}

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      correlationId: correlationStorage.getStore() || 'unknown',
      timestamp: new Date().toISOString(),
    },
  };
}
