/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/api/src/common/dto/api-response.dto.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: API response DTO with static factory methods for success and error
 */

import type { ApiResponse, ApiMeta, ApiError } from '@repo/types';

export class ApiResponseDto<T = unknown> implements ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;

  static success<T>(data: T, meta?: Partial<ApiMeta>): ApiResponseDto<T> {
    const response = new ApiResponseDto<T>();
    response.success = true;
    response.data = data;
    response.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    };
    return response;
  }

  static error(code: string, message: string, details?: Record<string, unknown>): ApiResponseDto {
    const response = new ApiResponseDto();
    response.success = false;
    response.error = { code, message, details };
    response.meta = { timestamp: new Date().toISOString() };
    return response;
  }
}
