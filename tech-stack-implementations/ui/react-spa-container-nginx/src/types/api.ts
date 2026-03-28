/**
 * App: react-spa-container-nginx
 * Package: src/types
 * File: api.ts
 * Version: 0.1.0
 * Turns: 6
 * Author: AI Coding Agent (Claude Opus 4.5)
 * Date: 2026-03-28T20:15:00Z
 * Exports: HealthResponse, ApiResponse
 * Description: API response type definitions
 * Log:
 * 6, 0.1.0, 2026/03/28, 08:15 PM, Claude Opus 4.5
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  correlation_id: string;
}

export interface HealthData {
  status: string;
  service: string;
  version: string;
  environment: string;
  timestamp: string;
}

export type HealthResponse = ApiResponse<HealthData>;
