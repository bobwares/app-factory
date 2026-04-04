/**
 * App: app-factory
 * File: eslint.config.mjs
 * Version: 1.0.0
 * Turns: 13
 * Author: AI Coding Agent (Codex)
 * Date: 2026-04-04T16:40:00Z
 * Description: Flat ESLint configuration for the standalone Next.js 16 implementation.
 */

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [...nextVitals, ...nextTypescript];

export default eslintConfig;
