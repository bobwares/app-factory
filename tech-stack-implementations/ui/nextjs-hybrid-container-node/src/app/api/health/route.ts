// App: app-factory
// File: src/app/api/health/route.ts
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Health check API endpoint

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime: number;
  checks: {
    name: string;
    status: 'pass' | 'fail';
    duration?: number;
  }[];
}

export async function GET(): Promise<NextResponse<HealthResponse>> {
  const startTime = Date.now();

  const checks = [
    {
      name: 'server',
      status: 'pass' as const,
      duration: Date.now() - startTime,
    },
  ];

  const allPassing = checks.every((check) => check.status === 'pass');

  const response: HealthResponse = {
    status: allPassing ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    uptime: Math.floor(process.uptime()),
    checks,
  };

  return NextResponse.json(response, {
    status: allPassing ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
