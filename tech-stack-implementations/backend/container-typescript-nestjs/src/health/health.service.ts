/**
 * App: container-typescript-nestjs
 * Package: src/health
 * File: health.service.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: HealthService
 * Description: Health check service with custom health indicators
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';

@Injectable()
export class HealthService extends HealthIndicator {
  async isAlive(): Promise<HealthIndicatorResult> {
    const isHealthy = true;
    const result = this.getStatus('app', isHealthy, {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().heapUsed,
    });

    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Application health check failed', result);
  }
}
