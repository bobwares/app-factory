/**
 * App: serverless-typescript-lambda
 * Package: src/types
 * File: events.ts
 * Version: 0.1.0
 * Task: 001
 * Turns: 001
 * Author: AI Coding Agent (claude-opus-4-5-20251101)
 * Date: 2026-03-30T00:00:00Z
 * Exports: JwtClaims, AuthorizedEvent
 * Description: Lambda event type extensions for API Gateway HTTP API
 * Log:
 * 001, 001, 0.1.0, 2026/03/30, 12:00 AM, AI Coding Agent (claude-opus-4-5-20251101)
 */

import type { APIGatewayProxyEventV2 } from 'aws-lambda';

export interface JwtClaims {
  sub: string;
  iss: string;
  aud: string | string[];
  exp: number;
  iat: number;
  scope?: string;
  [key: string]: unknown;
}

export interface AuthorizedEvent extends APIGatewayProxyEventV2 {
  requestContext: APIGatewayProxyEventV2['requestContext'] & {
    authorizer?: {
      jwt: {
        claims: JwtClaims;
        scopes: string[];
      };
    };
  };
}
