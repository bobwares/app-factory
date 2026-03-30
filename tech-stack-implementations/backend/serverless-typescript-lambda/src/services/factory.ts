/**
 * App: serverless-typescript-lambda
 * Package: src/services
 * File: factory.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: ServiceFactory, createServiceFactory
 * Description: Lightweight dependency injection factory for Lambda handlers
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { tracer } from '../middleware/observability.js';
import { ItemService } from './item.service.js';

export interface ServiceFactory {
  itemService: ItemService;
}

let cachedFactory: ServiceFactory | null = null;

export function createServiceFactory(): ServiceFactory {
  if (cachedFactory) {
    return cachedFactory;
  }

  const ddbClient = tracer.captureAWSv3Client(
    new DynamoDBClient({
      region: process.env.AWS_REGION,
    })
  );

  const docClient = DynamoDBDocumentClient.from(ddbClient, {
    marshallOptions: {
      removeUndefinedValues: true,
    },
  });

  const tableName = process.env.TABLE_NAME ?? '';

  cachedFactory = {
    itemService: new ItemService(docClient, tableName),
  };

  return cachedFactory;
}
