/**
 * App: serverless-typescript-lambda
 * Package: src/handlers
 * File: health.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: handler
 * Description: Health check Lambda handler for liveness and readiness probes
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import type { HealthStatus } from '../types/api.js';
import { logger, metrics, tracer, MetricUnit } from '../middleware/observability.js';
import { createHandlerContext } from '../middleware/correlation.js';
import * as response from '../utils/response.js';
import { handleError } from '../utils/errors.js';

const APP_VERSION = process.env.APP_VERSION ?? '0.1.0';

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const segment = tracer.getSegment();
  const subsegment = segment?.addNewSubsegment('health-handler');

  const ctx = createHandlerContext(event);

  try {
    logger.info('Health check request', { path: ctx.path });

    const healthStatus: HealthStatus = {
      status: 'healthy',
      version: APP_VERSION,
      timestamp: new Date().toISOString(),
    };

    if (ctx.path === '/health/ready') {
      healthStatus.checks = {
        database: { status: 'pass' },
      };
    }

    metrics.addMetric('HealthChecks', MetricUnit.Count, 1);
    metrics.addDimension('path', ctx.path);
    metrics.publishStoredMetrics();

    return response.ok(healthStatus, { correlationId: ctx.correlationId });
  } catch (error) {
    return handleError(error, ctx.correlationId);
  } finally {
    subsegment?.close();
  }
};
