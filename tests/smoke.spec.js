const { test, expect } = require('@playwright/test');

test('smoke test - server is running', async ({ page }) => {
  const response = await page.goto('/');
  // Since index.html might not exist yet, we expect any response status less than 500 (e.g., 404, 200, etc.)
  expect(response.status()).toBeLessThan(500);
});
