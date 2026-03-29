// App: app-factory
// File: src/app/layout.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Root layout with global styles

import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Next.js Hybrid App',
    template: '%s | Next.js Hybrid App',
  },
  description: 'Next.js hybrid rendering application with SSR, SSG, and CSR support',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-gray-50">{children}</body>
    </html>
  );
}
