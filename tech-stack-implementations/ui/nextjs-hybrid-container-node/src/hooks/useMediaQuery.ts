// App: app-factory
// File: src/hooks/useMediaQuery.ts
// Version: 1.0.1
// Turns: 13, 003
// Author: AI Coding Agent (Codex)
// Date: 2026-04-04T17:18:30Z
// Description: Custom hook for responsive media queries

'use client';

import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', onStoreChange);
      return () => media.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

export function useIsDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}
