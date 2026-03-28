/**
 * App: container-typescript-nestjs
 * Package: src/health
 * File: health.module.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: HealthModule
 * Description: Health check module with liveness and readiness endpoints
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
