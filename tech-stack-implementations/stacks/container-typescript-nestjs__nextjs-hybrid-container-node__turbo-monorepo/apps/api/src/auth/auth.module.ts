/**
 * App: container-typescript-nestjs__nextjs-hybrid-container-node__turbo-monorepo
 * File: apps/api/src/auth/auth.module.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-31T19:15:00Z
 * Description: Authentication module with JWT strategy and guard exports
 */

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
