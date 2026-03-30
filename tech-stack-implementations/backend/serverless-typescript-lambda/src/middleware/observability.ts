/**
 * App: serverless-typescript-lambda
 * Package: src/middleware
 * File: observability.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: logger, tracer, metrics
 * Description: AWS Lambda Powertools observability setup for structured logging, X-Ray tracing, and CloudWatch metrics
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import { Logger } from '@aws-lambda-powertools/logger';
import { Tracer } from '@aws-lambda-powertools/tracer';
import { Metrics, MetricUnit } from '@aws-lambda-powertools/metrics';

const serviceName = process.env.POWERTOOLS_SERVICE_NAME ?? 'serverless-typescript-lambda';

export const logger = new Logger({
  serviceName,
  logLevel: (process.env.LOG_LEVEL as 'DEBUG' | 'INFO' | 'WARN' | 'ERROR') ?? 'INFO',
  persistentLogAttributes: {
    environment: process.env.ENVIRONMENT ?? 'dev',
  },
});

export const tracer = new Tracer({
  serviceName,
  captureHTTPsRequests: true,
});

export const metrics = new Metrics({
  serviceName,
  namespace: process.env.POWERTOOLS_METRICS_NAMESPACE ?? 'ServerlessApp',
  defaultDimensions: {
    environment: process.env.ENVIRONMENT ?? 'dev',
  },
});

export { MetricUnit };
