/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/web/eslint.config.mjs
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Codex)
 * Date: 2026-04-04T16:40:00Z
 * Description: Flat ESLint configuration for the Next.js 16 web app.
 */

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const eslintConfig = [...nextVitals, ...nextTypescript];

export default eslintConfig;
