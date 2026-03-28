/**
 * App: react-spa-container-nginx
 * Package: src/components
 * File: Home.tsx
 * Version: 0.1.0
 * Turns: 6
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T20:15:00Z
 * Exports: Home
 * Description: Home page component with health check
 * Log:
 * 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
 */

import { useState } from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import styles from './Home.module.css';

export function Home() {
  const [checkTriggered, setCheckTriggered] = useState(false);
  const { data, loading, error, refetch } = useHealthCheck({
    skip: !checkTriggered,
  });

  const handleCheckHealth = () => {
    setCheckTriggered(true);
    if (checkTriggered) {
      refetch();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React SPA</h1>
      <p className={styles.description}>
        A containerized React single-page application served by nginx.
      </p>

      <div className={styles.card}>
        <h2>Backend Health Check</h2>
        <button onClick={handleCheckHealth} disabled={loading}>
          {loading ? 'Checking...' : 'Check API Health'}
        </button>

        {error && (
          <div className={styles.error}>
            Error: {error.message}
          </div>
        )}

        {data && (
          <div className={styles.result}>
            <p>
              <strong>Status:</strong> {data.data.status}
            </p>
            <p>
              <strong>Service:</strong> {data.data.service}
            </p>
            <p>
              <strong>Version:</strong> {data.data.version}
            </p>
            <p>
              <strong>Environment:</strong> {data.data.environment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
