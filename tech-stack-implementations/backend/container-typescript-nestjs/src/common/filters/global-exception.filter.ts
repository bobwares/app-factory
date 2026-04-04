/**
 * App: container-typescript-nestjs
 * Package: src/common/filters
 * File: global-exception.filter.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: GlobalExceptionFilter
 * Description: Global exception filter with structured error logging
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { correlationStorage } from '../middleware/correlation-id.middleware';
import { ApiResponse } from '../dto/api-response.dto';

interface HttpReply {
  status(statusCode: number): HttpReply;
  send(body: ApiResponse<null>): void;
}

interface HttpRequestLike {
  method?: string;
  url?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<HttpReply>();
    const request = ctx.getRequest<HttpRequestLike>();

    const correlationId = correlationStorage.getStore() || 'unknown';

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: {
        code: status.toString(),
        message,
      },
      meta: {
        correlationId,
        timestamp: new Date().toISOString(),
      },
    };

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : undefined,
      'GlobalExceptionFilter',
    );

    response.status(status).send(errorResponse);
  }
}
