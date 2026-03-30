/**
 * App: serverless-typescript-lambda
 * Package: tests
 * File: item.schema.test.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: N/A
 * Description: Unit tests for Item Zod validation schemas
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import { describe, it, expect } from 'vitest';
import { CreateItemSchema, ItemSchema } from '../src/schemas/item.schema.js';

describe('CreateItemSchema', () => {
  it('should validate a valid create item input', () => {
    const input = {
      name: 'Test Item',
      description: 'A test item description',
    };

    const result = CreateItemSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Test Item');
      expect(result.data.description).toBe('A test item description');
    }
  });

  it('should accept input with only required fields', () => {
    const input = {
      name: 'Minimal Item',
    };

    const result = CreateItemSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Minimal Item');
      expect(result.data.description).toBeUndefined();
    }
  });

  it('should reject input with empty name', () => {
    const input = {
      name: '',
    };

    const result = CreateItemSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it('should reject input with name exceeding max length', () => {
    const input = {
      name: 'a'.repeat(256),
    };

    const result = CreateItemSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it('should accept metadata as record of unknown values', () => {
    const input = {
      name: 'Item with metadata',
      metadata: {
        key1: 'value1',
        key2: 123,
        key3: true,
      },
    };

    const result = CreateItemSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metadata).toEqual({
        key1: 'value1',
        key2: 123,
        key3: true,
      });
    }
  });
});

describe('ItemSchema', () => {
  it('should validate a complete item', () => {
    const item = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Complete Item',
      description: 'A complete item',
      createdAt: '2026-03-30T00:00:00Z',
      updatedAt: '2026-03-30T00:00:00Z',
      createdBy: 'user-123',
    };

    const result = ItemSchema.safeParse(item);

    expect(result.success).toBe(true);
  });

  it('should reject item with invalid UUID', () => {
    const item = {
      id: 'not-a-uuid',
      name: 'Invalid Item',
      createdAt: '2026-03-30T00:00:00Z',
      updatedAt: '2026-03-30T00:00:00Z',
      createdBy: 'user-123',
    };

    const result = ItemSchema.safeParse(item);

    expect(result.success).toBe(false);
  });
});
