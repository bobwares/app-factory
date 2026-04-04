/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/web/app/page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Next.js home page with API health status and service overview
 */

import { Card, StatusBadge } from '@repo/ui';
import type { HealthStatus } from '@repo/types';
import { RefreshButton } from './refresh-button';

async function getApiHealth(): Promise<HealthStatus | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiUrl}/health`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const health = await getApiHealth();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Turbo Monorepo
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          NestJS API + Next.js Web Application
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="API Status">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Backend Health</span>
              <StatusBadge
                status={health?.status || 'unknown'}
                label={health?.status || 'Unavailable'}
              />
            </div>
            {health && (
              <div className="mt-4 text-sm text-gray-500">
                <p>Version: {health.version}</p>
                <p>Uptime: {health.uptime}s</p>
              </div>
            )}
          </Card>

          <Card title="Quick Start">
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Run the full stack with Docker Compose:
              </p>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                docker compose up -d
              </code>
              <p className="text-gray-600 text-sm">Or develop locally:</p>
              <code className="block bg-gray-100 p-3 rounded text-sm">
                pnpm dev
              </code>
            </div>
          </Card>

          <Card title="Services" className="md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center p-4 bg-gray-50 rounded">
                <h4 className="font-semibold">API</h4>
                <p className="text-sm text-gray-500">:8000</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <h4 className="font-semibold">Web</h4>
                <p className="text-sm text-gray-500">:3000</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded">
                <h4 className="font-semibold">Jaeger</h4>
                <p className="text-sm text-gray-500">:16686</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
          >
            Refresh Status
          </Button>
        </div>
      </div>
    </main>
  );
}
