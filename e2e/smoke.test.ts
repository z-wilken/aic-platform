import { test, expect } from '@playwright/test';

test('marketing home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/AIC - AI Certification Institute/);
  // Verify main header
  await expect(page.locator('h1')).toContainText('Certifying the Human Behind the Algorithm');
  // Verify key section
  await expect(page.locator('text=Declaration of Algorithmic Rights').first()).toBeVisible();
});

test('login redirect works', async ({ page }) => {
  await page.goto('/login');
  // Should redirect to localhost:3001/login (Platform app)
  await page.waitForURL(/.*:3001\/login/, { timeout: 15000 });
});

test('navigation to portals', async ({ page }) => {
  await page.goto('/');
  
  // Test Governance Hub link
  await page.click('text=Governance Hub');
  await expect(page).toHaveURL(/\/governance-hub/);
  await expect(page.locator('h1')).toContainText('Algorithmic Rights');
  
  // Test Corporate Portal link
  await page.goto('/');
  await page.click('text=Corporate Portal');
  await expect(page).toHaveURL(/\/corporate-portal/);
  await expect(page.locator('h1')).toContainText('ISO/IEC 42001');
});
