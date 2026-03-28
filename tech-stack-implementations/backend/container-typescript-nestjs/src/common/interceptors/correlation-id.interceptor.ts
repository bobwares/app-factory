/**
 * App: container-typescript-nestjs
 * Package: src/common/interceptors
 * File: correlation-id.interceptor.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: CorrelationIdInterceptor
 * Description: Interceptor to inject correlation ID into response headers
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import {
  correlationStorage,
  CORRELATION_ID_HEADER,
} from '../middleware/correlation-id.middleware';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const correlationId = correlationStorage.getStore();

    return next.handle().pipe(
      tap(() => {
        if (correlationId) {
          const response = context.switchToHttp().getResponse();
          response.header(CORRELATION_ID_HEADER, correlationId);
        }
      }),
    );
  }
}
