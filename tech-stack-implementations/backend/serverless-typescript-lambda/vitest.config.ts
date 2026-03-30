/**
 * App: serverless-typescript-lambda
 * Package: root
 * File: vitest.config.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: default
 * Description: Vitest configuration for Lambda handler unit tests
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts'],
    },
    env: {
      POWERTOOLS_SERVICE_NAME: 'serverless-typescript-lambda-test',
      LOG_LEVEL: 'ERROR',
    },
  },
});
