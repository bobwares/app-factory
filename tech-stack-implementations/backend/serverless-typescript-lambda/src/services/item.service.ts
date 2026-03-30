/**
 * App: serverless-typescript-lambda
 * Package: src/services
 * File: item.service.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: ItemService
 * Description: Item business logic with DynamoDB single-table operations
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
import type { Item, CreateItemInput } from '../schemas/item.schema.js';
import { NotFoundError } from '../utils/errors.js';
import { logger } from '../middleware/observability.js';

export class ItemService {
  constructor(
    private readonly docClient: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

  async createItem(input: CreateItemInput, userId: string): Promise<Item> {
    const now = new Date().toISOString();
    const id = randomUUID();

    const item: Item = {
      id,
      name: input.name,
      description: input.description,
      metadata: input.metadata,
      createdAt: now,
      updatedAt: now,
      createdBy: userId,
    };

    await this.docClient.send(
      new PutCommand({
        TableName: this.tableName,
        Item: {
          pk: `ITEM#${id}`,
          sk: `ITEM#${id}`,
          ...item,
          gsi1pk: `USER#${userId}`,
          gsi1sk: `ITEM#${now}`,
        },
        ConditionExpression: 'attribute_not_exists(pk)',
      })
    );

    logger.info('Item created', { itemId: id, userId });

    return item;
  }

  async getItem(id: string): Promise<Item> {
    const result = await this.docClient.send(
      new GetCommand({
        TableName: this.tableName,
        Key: {
          pk: `ITEM#${id}`,
          sk: `ITEM#${id}`,
        },
      })
    );

    if (!result.Item) {
      throw new NotFoundError('Item', id);
    }

    return this.mapToItem(result.Item);
  }

  async listItems(limit = 20, lastEvaluatedKey?: string): Promise<{ items: Item[]; nextKey?: string }> {
    const result = await this.docClient.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: 'begins_with(pk, :prefix)',
        ExpressionAttributeValues: {
          ':prefix': 'ITEM#',
        },
        Limit: limit,
        ExclusiveStartKey: lastEvaluatedKey
          ? JSON.parse(Buffer.from(lastEvaluatedKey, 'base64').toString())
          : undefined,
      })
    );

    const items = (result.Items ?? []).map(this.mapToItem);
    const nextKey = result.LastEvaluatedKey
      ? Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64')
      : undefined;

    return { items, nextKey };
  }

  private mapToItem(record: Record<string, unknown>): Item {
    return {
      id: record['id'] as string,
      name: record['name'] as string,
      description: record['description'] as string | undefined,
      metadata: record['metadata'] as Record<string, unknown> | undefined,
      createdAt: record['createdAt'] as string,
      updatedAt: record['updatedAt'] as string,
      createdBy: record['createdBy'] as string,
    };
  }
}
