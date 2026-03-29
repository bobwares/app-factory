// App: app-factory
// File: src/app/page.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Home page with SSG (Static Site Generation)

import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-gray-900">
            Next.js Hybrid App
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A production-ready Next.js application with hybrid rendering support,
            featuring SSR, SSG, and CSR capabilities.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            title="Server-Side Rendering"
            description="Dynamic pages rendered on each request with fresh data"
            href="/dashboard"
          />
          <Card
            title="Static Generation"
            description="Pre-rendered pages for optimal performance"
            href="/about"
          />
          <Card
            title="API Routes"
            description="Backend API endpoints for data fetching"
            href="/api/health"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md text-sm font-medium bg-sky-600 text-white hover:bg-sky-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            Learn More
          </Link>
        </div>

        <footer className="text-center text-sm text-gray-500 pt-8">
          <p>
            Built with Next.js {process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'} &middot;
            Node.js Container Deployment
          </p>
        </footer>
      </div>
    </main>
  );
}
