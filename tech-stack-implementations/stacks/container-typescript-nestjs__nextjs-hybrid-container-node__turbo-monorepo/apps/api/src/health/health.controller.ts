/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/api/src/health/health.controller.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Health check endpoints for liveness and readiness probes
 */

import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { HealthStatus } from '@repo/types';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthStatus {
    return this.healthService.getHealth();
  }

  @Get('live')
  getLiveness(): { status: string } {
    return { status: 'ok' };
  }

  @Get('ready')
  getReadiness(): HealthStatus {
    return this.healthService.getHealth();
  }
}
