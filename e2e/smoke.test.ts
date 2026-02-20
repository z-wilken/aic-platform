import { test, expect } from '@playwright/test';

test('marketing home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/AIC | Home/);
  // Use first() to avoid strict mode violation if text appears multiple times (e.g. in nav and body)
  await expect(page.locator('text=The Declaration of Algorithmic Rights').first()).toBeVisible();
});

test('login redirect works', async ({ page }) => {
  await page.goto('/login');
  // Should redirect to localhost:3001/login (Platform app)
  // Increased timeout to 10s for slow dev server startups
  await page.waitForURL(/.*:3001\/login/, { timeout: 15000 });
});

test('assessment quiz flow', async ({ page }) => {
  await page.goto('/assessment');
  await expect(page.locator('#question-counter')).toContainText('Question 1');
  
  // Click first option
  await page.locator('button.group').first().click();
  await expect(page.locator('#question-counter')).toContainText('Question 2');
});
