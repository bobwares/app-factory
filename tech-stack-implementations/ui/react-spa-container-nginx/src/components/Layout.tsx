/**
 * App: react-spa-container-nginx
 * Package: src/components
 * File: Layout.tsx
 * Version: 0.1.0
 * Turns: 6
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T20:15:00Z
 * Exports: Layout
 * Description: Main layout wrapper component
 * Log:
 * 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
 */

import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            React SPA
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>Built with React + Vite + TypeScript</p>
      </footer>
    </div>
  );
}
