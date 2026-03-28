/**
 * App: container-typescript-nestjs
 * Package: src
 * File: app.module.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: AppModule
 * Description: Root application module with health, config, and auth imports
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TerminusModule,
    HealthModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
