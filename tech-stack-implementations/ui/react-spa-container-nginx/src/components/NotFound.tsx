/**
 * App: react-spa-container-nginx
 * Package: src/components
 * File: NotFound.tsx
 * Version: 0.1.0
 * Turns: 6
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T20:15:00Z
 * Exports: NotFound
 * Description: 404 Not Found page component
 * Log:
 * 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
 */

import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go back home</Link>
    </div>
  );
}
