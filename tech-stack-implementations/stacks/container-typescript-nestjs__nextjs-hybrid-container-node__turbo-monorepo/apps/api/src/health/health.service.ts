/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/api/src/health/health.service.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Health service providing system status and uptime information
 */

import { Injectable } from '@nestjs/common';
import type { HealthStatus } from '@repo/types';

@Injectable()
export class HealthService {
  private readonly startTime = Date.now();

  getHealth(): HealthStatus {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      uptime,
      checks: {
        memory: {
          status: 'pass',
          responseTime: 0,
        },
      },
    };
  }
}
