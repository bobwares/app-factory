// App: app-factory
// File: src/app/about/page.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: About page with SSG (Static Site Generation)

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about the Next.js Hybrid App architecture and features',
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">About This App</h1>
          <p className="text-gray-600">
            This is a statically generated page (SSG) - rendered at build time
            for optimal performance.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Rendering Modes</h2>
          <ul className="space-y-3 list-disc list-inside text-gray-600">
            <li>
              <strong className="text-gray-900">SSG (Static Site Generation)</strong>
              {' '}- Pages pre-rendered at build time
            </li>
            <li>
              <strong className="text-gray-900">SSR (Server-Side Rendering)</strong>
              {' '}- Pages rendered on each request
            </li>
            <li>
              <strong className="text-gray-900">CSR (Client-Side Rendering)</strong>
              {' '}- Interactive components hydrated on client
            </li>
            <li>
              <strong className="text-gray-900">ISR (Incremental Static Regeneration)</strong>
              {' '}- Static pages that revalidate periodically
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Tech Stack</h2>
          <ul className="space-y-2 list-disc list-inside text-gray-600">
            <li>Next.js 14 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>Tailwind CSS for styling</li>
            <li>Vitest for unit testing</li>
            <li>Playwright for E2E testing</li>
            <li>Docker for containerization</li>
          </ul>
        </section>

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
