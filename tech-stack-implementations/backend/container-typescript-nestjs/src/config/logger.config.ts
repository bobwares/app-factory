/**
 * App: container-typescript-nestjs
 * Package: src/config
 * File: logger.config.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: createLogger
 * Description: Pino-based structured JSON logger configuration
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { LoggerService } from '@nestjs/common';
import pino, { Logger } from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const pinoLogger: Logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => ({ level: label }),
  },
  base: {
    service: process.env.OTEL_SERVICE_NAME || 'container-typescript-nestjs',
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV || 'development',
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
});

export function createLogger(): LoggerService {
  return {
    log(message: string, context?: string): void {
      pinoLogger.info({ context }, message);
    },
    error(message: string, trace?: string, context?: string): void {
      pinoLogger.error({ context, trace }, message);
    },
    warn(message: string, context?: string): void {
      pinoLogger.warn({ context }, message);
    },
    debug(message: string, context?: string): void {
      pinoLogger.debug({ context }, message);
    },
    verbose(message: string, context?: string): void {
      pinoLogger.trace({ context }, message);
    },
  };
}

export { pinoLogger };
