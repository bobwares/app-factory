/**
 * App: container-typescript-nestjs
 * Package: src/health
 * File: health.controller.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: HealthController
 * Description: REST endpoints for health, liveness, and readiness checks
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckResult,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from './health.service';
import { ApiResponse, createSuccessResponse } from '../common/dto/api-response.dto';

interface HealthStatus {
  status: string;
  version: string;
  uptime: number;
}

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly healthService: HealthService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  getHealth(): ApiResponse<HealthStatus> {
    return createSuccessResponse({
      status: 'healthy',
      version: process.env.npm_package_version || '0.1.0',
      uptime: process.uptime(),
    });
  }

  @Get('live')
  @HealthCheck()
  checkLiveness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.healthService.isAlive(),
    ]);
  }

  @Get('ready')
  @HealthCheck()
  checkReadiness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.healthService.isAlive(),
      () => this.memory.checkHeap('memory_heap', 256 * 1024 * 1024),
      () =>
        this.disk.checkStorage('disk', {
          path: '/',
          thresholdPercent: 0.9,
        }),
    ]);
  }
}
