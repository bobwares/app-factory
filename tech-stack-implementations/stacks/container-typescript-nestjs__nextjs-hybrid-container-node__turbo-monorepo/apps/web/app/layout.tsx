/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/web/app/layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Next.js root layout with metadata and global styles
 */

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Turbo Monorepo App',
  description: 'NestJS + Next.js monorepo application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
