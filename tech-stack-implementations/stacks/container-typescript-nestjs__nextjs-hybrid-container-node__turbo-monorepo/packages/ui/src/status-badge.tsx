/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: packages/ui/src/status-badge.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Status badge component for displaying health and system states
 */

import React from 'react';

export interface StatusBadgeProps {
  status: 'healthy' | 'unhealthy' | 'degraded' | 'unknown';
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const statusConfig = {
    healthy: { color: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
    unhealthy: { color: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
    degraded: { color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-500' },
    unknown: { color: 'bg-gray-100 text-gray-800', dot: 'bg-gray-500' },
  };

  const config = statusConfig[status] || statusConfig.unknown;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      <span className={`w-2 h-2 mr-1.5 rounded-full ${config.dot}`} />
      {label || status}
    </span>
  );
}
