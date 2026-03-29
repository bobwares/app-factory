// App: app-factory
// File: tests/e2e/home.spec.ts
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: E2E tests for home page

import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /next\.js hybrid app/i })).toBeVisible();
  });

  test('displays feature cards', async ({ page }) => {
    await expect(page.getByText(/server-side rendering/i)).toBeVisible();
    await expect(page.getByText(/static generation/i)).toBeVisible();
    await expect(page.getByText(/api routes/i)).toBeVisible();
  });

  test('navigates to dashboard', async ({ page }) => {
    await page.getByRole('link', { name: /get started/i }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('navigates to about page', async ({ page }) => {
    await page.getByRole('link', { name: /learn more/i }).click();
    await expect(page).toHaveURL('/about');
  });
});

test.describe('About Page', () => {
  test('displays content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /about this app/i })).toBeVisible();
    await expect(page.getByText(/tech stack/i)).toBeVisible();
  });

  test('has back to home link', async ({ page }) => {
    await page.goto('/about');
    await page.getByRole('link', { name: /back to home/i }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Dashboard Page', () => {
  test('displays server-rendered content', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByText(/server timestamp/i)).toBeVisible();
  });

  test('has interactive counter', async ({ page }) => {
    await page.goto('/dashboard');

    // Find counter display
    const counter = page.locator('text=0').first();
    await expect(counter).toBeVisible();

    // Click increment
    await page.getByRole('button', { name: /increase count/i }).click();
    await expect(page.locator('text=1').first()).toBeVisible();

    // Click decrement
    await page.getByRole('button', { name: /decrease count/i }).click();
    await expect(page.locator('text=0').first()).toBeVisible();
  });
});

test.describe('API Health Check', () => {
  test('returns healthy status', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.status).toBe('healthy');
    expect(data.checks).toBeDefined();
    expect(Array.isArray(data.checks)).toBe(true);
  });
});
