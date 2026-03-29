// App: app-factory
// File: src/app/(dashboard)/dashboard/page.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Dashboard page with SSR (Server-Side Rendering)

import type { Metadata } from 'next';
import Link from 'next/link';
import { Counter } from '@/components/ui/Counter';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Server-rendered dashboard with real-time data',
};

export const dynamic = 'force-dynamic';

async function getServerData() {
  const timestamp = new Date().toISOString();
  const randomValue = Math.floor(Math.random() * 1000);

  return {
    timestamp,
    randomValue,
    serverInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: Math.floor(process.uptime()),
    },
  };
}

export default async function DashboardPage() {
  const data = await getServerData();

  return (
    <main className="flex min-h-screen flex-col p-8">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            This page is server-side rendered (SSR) on each request.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Server Timestamp</h2>
            <p className="text-2xl font-mono text-sky-600">{data.timestamp}</p>
            <p className="text-sm text-gray-500">
              Refresh the page to see a new timestamp
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-2">
            <h2 className="text-lg font-semibold text-gray-900">Random Value</h2>
            <p className="text-4xl font-bold text-sky-600">{data.randomValue}</p>
            <p className="text-sm text-gray-500">
              Generated on the server for each request
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Server Information</h2>
          <dl className="grid gap-2 sm:grid-cols-3">
            <div>
              <dt className="text-sm text-gray-500">Node.js Version</dt>
              <dd className="font-mono text-gray-900">{data.serverInfo.nodeVersion}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Platform</dt>
              <dd className="font-mono text-gray-900">{data.serverInfo.platform}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">Uptime</dt>
              <dd className="font-mono text-gray-900">{data.serverInfo.uptime}s</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Client-Side Interactivity</h2>
          <p className="text-sm text-gray-500">
            This counter is a client component with CSR behavior
          </p>
          <Counter />
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
