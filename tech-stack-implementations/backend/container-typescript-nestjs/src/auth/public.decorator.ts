/**
 * App: container-typescript-nestjs
 * Package: src/auth
 * File: public.decorator.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: Public
 * Description: Decorator to mark routes as publicly accessible
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from './jwt-auth.guard';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
