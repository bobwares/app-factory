// App: app-factory
// File: src/components/ui/Counter.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Client-side counter component demonstrating CSR

'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  const buttonBase = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  return (
    <div className="flex items-center gap-4">
      <button
        className={`${buttonBase} h-10 w-10 border border-gray-300 bg-white hover:bg-gray-50`}
        onClick={() => setCount((c) => c - 1)}
        aria-label="Decrease count"
      >
        -
      </button>
      <span className="text-2xl font-mono w-16 text-center">{count}</span>
      <button
        className={`${buttonBase} h-10 w-10 border border-gray-300 bg-white hover:bg-gray-50`}
        onClick={() => setCount((c) => c + 1)}
        aria-label="Increase count"
      >
        +
      </button>
      <button
        className={`${buttonBase} h-10 px-4 py-2 hover:bg-gray-100`}
        onClick={() => setCount(0)}
      >
        Reset
      </button>
    </div>
  );
}
