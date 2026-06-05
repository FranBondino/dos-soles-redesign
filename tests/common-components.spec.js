const { test, expect } = require('@playwright/test');

const pages = [
  { name: 'Version 1: Minimalista Editorial', path: '/v1-editorial/index.html' },
  { name: 'Version 2: Premium Dark & Gold', path: '/v2-darkgold/index.html' },
  { name: 'Version 3: Bento Grid Moderno', path: '/v3-bento/index.html' },
  { name: 'Version 4: Sephora Vibrant', path: '/v4-sephora/index.html' },
  { name: 'Version 5: Douglas Premium Bold', path: '/v5-douglas/index.html' },
  { name: 'Version 6: Bento Grid Sephora', path: '/v6-bento-sephora/index.html' }
];

test.describe('Common Components & Responsiveness Verification', () => {
  for (const pageInfo of pages) {
    test.describe(`${pageInfo.name}`, () => {
      test('Assert typing in Header Search reveals search results list', async ({ page }) => {
        await page.goto(pageInfo.path);
        const searchInput = page.locator('#header-search-input');
        const searchResultsDropdown = page.locator('#header-search-results');
        
        await expect(searchInput).toBeVisible();
        await searchInput.fill('Truss');
        await expect(searchResultsDropdown).toBeVisible();
        
        const matchesCount = await searchResultsDropdown.locator('.search-results-list li').count();
        expect(matchesCount).toBeGreaterThan(0);
      });

      test('Verify footer newsletter inputs alert user on malformed email structure', async ({ page }) => {
        await page.goto(pageInfo.path);
        const newsletterEmailInput = page.locator('#newsletter-email');
        const newsletterForm = page.locator('#newsletter-form');
        
        await expect(newsletterEmailInput).toBeVisible();
        await newsletterEmailInput.fill('invalid-email-format');
        
        let dialogMessage = '';
        page.once('dialog', async dialog => {
          dialogMessage = dialog.message();
          await dialog.accept();
        });
        
        await newsletterForm.locator('button[type="submit"]').click();
        expect(dialogMessage).toContain('Por favor, ingresa una dirección de correo electrónico válida');
      });

      test('Assert product carousel contains a minimum of 4 product cards', async ({ page }) => {
        await page.goto(pageInfo.path);
        const productCards = page.locator('.product-card');
        const count = await productCards.count();
        expect(count).toBeGreaterThanOrEqual(4);
      });

      test('Assert mobile view (390px viewport width) renders without horizontal scroll overflow', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 800 });
        await page.goto(pageInfo.path);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(500); // Allow any layout calculations to settle
        
        const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(scrollWidth).toBeLessThanOrEqual(390);
      });

      test('Assert console log lists zero errors on page loads', async ({ page }) => {
        const consoleErrors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });
        page.on('pageerror', err => {
          consoleErrors.push(err.message);
        });
        
        await page.goto(pageInfo.path);
        await page.waitForLoadState('load');
        expect(consoleErrors).toEqual([]);
      });
    });
  }
});
