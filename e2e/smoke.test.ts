import { test, expect } from '@playwright/test';

test('marketing home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/AIC | Home/);
  await expect(page.locator('text=The Declaration of Algorithmic Rights')).toBeVisible();
});

test('login redirect works', async ({ page }) => {
  await page.goto('/login');
  // Should redirect to localhost:3001/login
  await page.waitForURL(/.*:3001\/login/);
  await expect(page.locator('text=AIC PULSE')).toBeVisible();
});

test('assessment quiz flow', async ({ page }) => {
  await page.goto('/assessment');
  await expect(page.locator('text=Question 1')).toBeVisible();
  
  // Click first option
  await page.locator('button.group').first().click();
  await expect(page.locator('text=Question 2')).toBeVisible();
});
