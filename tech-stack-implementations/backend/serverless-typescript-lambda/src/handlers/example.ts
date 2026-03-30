/**
 * App: serverless-typescript-lambda
 * Package: src/handlers
 * File: example.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: handler
 * Description: Example CRUD Lambda handler for items with JWT auth and DynamoDB persistence
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import type { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import type { AuthorizedEvent } from '../types/events.js';
import { logger, metrics, tracer, MetricUnit } from '../middleware/observability.js';
import { createHandlerContext } from '../middleware/correlation.js';
import { createServiceFactory } from '../services/factory.js';
import { CreateItemSchema } from '../schemas/item.schema.js';
import * as response from '../utils/response.js';
import { handleError, ValidationError, ForbiddenError } from '../utils/errors.js';

export const handler = async (
  event: AuthorizedEvent
): Promise<APIGatewayProxyStructuredResultV2> => {
  const segment = tracer.getSegment();
  const subsegment = segment?.addNewSubsegment('example-handler');

  const ctx = createHandlerContext(event);

  try {
    const method = ctx.method;
    const path = ctx.path;

    logger.info('Processing request', { method, path });

    if (!ctx.userId) {
      throw new ForbiddenError('Authentication required');
    }

    const { itemService } = createServiceFactory();

    if (method === 'GET' && path === '/items') {
      const limit = event.queryStringParameters?.limit
        ? parseInt(event.queryStringParameters.limit, 10)
        : 20;
      const cursor = event.queryStringParameters?.cursor;

      const result = await itemService.listItems(limit, cursor);

      metrics.addMetric('ItemsListed', MetricUnit.Count, result.items.length);
      metrics.publishStoredMetrics();

      return response.ok(result, { correlationId: ctx.correlationId });
    }

    if (method === 'GET' && path.startsWith('/items/')) {
      const id = event.pathParameters?.id;
      if (!id) {
        throw new ValidationError('Item ID is required');
      }

      const item = await itemService.getItem(id);

      metrics.addMetric('ItemRetrieved', MetricUnit.Count, 1);
      metrics.publishStoredMetrics();

      return response.ok(item, { correlationId: ctx.correlationId });
    }

    if (method === 'POST' && path === '/items') {
      const body = event.body ? JSON.parse(event.body) : {};

      const parseResult = CreateItemSchema.safeParse(body);
      if (!parseResult.success) {
        throw ValidationError.fromZodError(parseResult.error);
      }

      const item = await itemService.createItem(parseResult.data, ctx.userId);

      metrics.addMetric('ItemCreated', MetricUnit.Count, 1);
      metrics.publishStoredMetrics();

      return response.created(item, { correlationId: ctx.correlationId });
    }

    return response.notFound('Route not found', { correlationId: ctx.correlationId });
  } catch (error) {
    return handleError(error, ctx.correlationId);
  } finally {
    subsegment?.close();
  }
};
