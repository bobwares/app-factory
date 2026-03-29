// App: app-factory
// File: tests/unit/lib/utils.test.ts
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Unit tests for utility functions

import { describe, it, expect } from 'vitest';
import { cn, formatDate, sleep } from '@/lib/utils';

describe('cn (classnames utility)', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('handles undefined values', () => {
    expect(cn('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('handles null values', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar');
  });

  it('handles empty strings', () => {
    expect(cn('foo', '', 'bar')).toBe('foo bar');
  });
});

describe('formatDate', () => {
  it('formats Date objects', () => {
    const date = new Date(2026, 2, 29); // March 29, 2026 (month is 0-indexed)
    const formatted = formatDate(date);
    expect(formatted).toContain('March');
    expect(formatted).toContain('29');
    expect(formatted).toContain('2026');
  });

  it('formats date strings', () => {
    const formatted = formatDate('2026-01-15T12:00:00');
    expect(formatted).toContain('January');
    expect(formatted).toContain('15');
    expect(formatted).toContain('2026');
  });
});

describe('sleep', () => {
  it('resolves after specified time', async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(45);
  });
});
