/**
 * App: container-typescript-nestjs
 * Package: test
 * File: health.controller.spec.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: none
 * Description: Unit tests for HealthController
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../src/health/health.controller';
import { HealthService } from '../src/health/health.service';
import {
  HealthCheckService,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: HealthCheckService,
          useValue: {
            check: vi.fn().mockResolvedValue({
              status: 'ok',
              details: {},
            }),
          },
        },
        {
          provide: MemoryHealthIndicator,
          useValue: {
            checkHeap: vi.fn().mockResolvedValue({ memory_heap: { status: 'up' } }),
          },
        },
        {
          provide: DiskHealthIndicator,
          useValue: {
            checkStorage: vi.fn().mockResolvedValue({ disk: { status: 'up' } }),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  describe('getHealth', () => {
    it('should return healthy status', () => {
      const result = controller.getHealth();

      expect(result.success).toBe(true);
      expect(result.data.status).toBe('healthy');
      expect(result.data.uptime).toBeGreaterThan(0);
      expect(result.meta.timestamp).toBeDefined();
    });
  });

  describe('checkLiveness', () => {
    it('should return liveness check result', async () => {
      const result = await controller.checkLiveness();

      expect(result.status).toBe('ok');
    });
  });

  describe('checkReadiness', () => {
    it('should return readiness check result', async () => {
      const result = await controller.checkReadiness();

      expect(result.status).toBe('ok');
    });
  });
});
