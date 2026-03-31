/**
 * App: serverless-typescript-lambda
 * Package: src/schemas
 * File: item.schema.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: CreateItemSchema, UpdateItemSchema, ItemSchema, Item, CreateItemInput, UpdateItemInput
 * Description: Zod validation schemas for Item entity with derived types
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import { z } from 'zod';

export const CreateItemSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const UpdateItemSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const ItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdBy: z.string(),
});

export type Item = z.infer<typeof ItemSchema>;
export type CreateItemInput = z.infer<typeof CreateItemSchema>;
export type UpdateItemInput = z.infer<typeof UpdateItemSchema>;
