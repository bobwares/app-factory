/**
 * App: serverless-typescript-lambda
 * Package: tests
 * File: health.test.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: N/A
 * Description: Unit tests for health check Lambda handler
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

vi.mock('../src/middleware/observability.js', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    appendKeys: vi.fn(),
  },
  tracer: {
    getSegment: vi.fn(() => ({
      addNewSubsegment: vi.fn(() => ({ close: vi.fn() })),
    })),
  },
  metrics: {
    addMetric: vi.fn(),
    addDimension: vi.fn(),
    publishStoredMetrics: vi.fn(),
  },
  MetricUnit: {
    Count: 'Count',
  },
}));

const createMockEvent = (path: string): APIGatewayProxyEventV2 => ({
  version: '2.0',
  routeKey: `GET ${path}`,
  rawPath: path,
  rawQueryString: '',
  headers: {
    'x-correlation-id': 'test-correlation-id',
  },
  requestContext: {
    accountId: '123456789012',
    apiId: 'api-id',
    domainName: 'api.example.com',
    domainPrefix: 'api',
    http: {
      method: 'GET',
      path,
      protocol: 'HTTP/1.1',
      sourceIp: '127.0.0.1',
      userAgent: 'test',
    },
    requestId: 'request-id',
    routeKey: `GET ${path}`,
    stage: 'dev',
    time: '2026-03-30T00:00:00Z',
    timeEpoch: 1774915200000,
  },
  isBase64Encoded: false,
});

describe('Health Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return healthy status for /health', async () => {
    const { handler } = await import('../src/handlers/health.js');
    const event = createMockEvent('/health');

    const result = await handler(event);

    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body ?? '');
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('healthy');
    expect(body.data.version).toBeDefined();
    expect(body.data.timestamp).toBeDefined();
  });

  it('should return healthy status with checks for /health/ready', async () => {
    const { handler } = await import('../src/handlers/health.js');
    const event = createMockEvent('/health/ready');

    const result = await handler(event);

    expect(result.statusCode).toBe(200);

    const body = JSON.parse(result.body ?? '');
    expect(body.success).toBe(true);
    expect(body.data.status).toBe('healthy');
    expect(body.data.checks).toBeDefined();
    expect(body.data.checks.database.status).toBe('pass');
  });

  it('should include correlation ID header in response', async () => {
    const { handler } = await import('../src/handlers/health.js');
    const event = createMockEvent('/health');

    const result = await handler(event);

    expect(result.headers?.['X-Correlation-Id']).toBe('test-correlation-id');
  });
});
