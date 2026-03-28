/**
 * App: container-typescript-nestjs
 * Package: src/auth
 * File: jwt-auth.guard.ts
 * Version: 0.1.0
 * Turns: 4
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T19:15:00Z
 * Exports: JwtAuthGuard
 * Description: JWT authentication guard with local profile bypass
 * Log:
 * 4, 0.1.0, 2026/03/28, 07:15 PM, Claude Opus 4.5
 */

import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const bypassAuth = this.configService.get<string>('BYPASS_AUTH');

    if (nodeEnv === 'local' && bypassAuth === 'true') {
      return true;
    }

    return super.canActivate(context);
  }
}
