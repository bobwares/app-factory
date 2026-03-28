/**
 * App: react-spa-container-nginx
 * Package: src/hooks
 * File: useHealthCheck.ts
 * Version: 0.1.0
 * Turns: 6
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T20:15:00Z
 * Exports: useHealthCheck
 * Description: Hook for fetching backend health status
 * Log:
 * 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
 */

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';
import type { HealthResponse } from '../types/api';

interface UseHealthCheckOptions {
  skip?: boolean;
}

interface UseHealthCheckResult {
  data: HealthResponse | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useHealthCheck(
  options: UseHealthCheckOptions = {}
): UseHealthCheckResult {
  const { skip = false } = options;
  const [data, setData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<HealthResponse>('/health/live');
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!skip) {
      fetchHealth();
    }
  }, [skip, fetchHealth]);

  return { data, loading, error, refetch: fetchHealth };
}
