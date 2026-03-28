/**
 * App: react-spa-container-nginx
 * Package: src
 * File: App.tsx
 * Version: 0.1.0
 * Turns: 6
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T20:15:00Z
 * Exports: App
 * Description: Root application component with routing
 * Log:
 * 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
 */

import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
