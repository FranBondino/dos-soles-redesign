const { test, expect } = require('@playwright/test');

test.describe('Version 6: Bento Grid Sephora Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the v6-bento-sephora index.html page
    await page.goto('/v6-bento-sephora/index.html');
  });

  test('should use Plus Jakarta Sans typography', async ({ page }) => {
    const body = page.locator('body');
    const fontFamily = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    expect(fontFamily).toContain('Plus Jakarta Sans');
  });

  test('should load the official logo successfully', async ({ page }) => {
    const logo = page.locator('.brand-logo');
    await expect(logo).toBeVisible();
    
    const logoSrc = await logo.getAttribute('src');
    expect(logoSrc).toBe('https://dossolesdistribuidora.com.ar/wp-content/uploads/2024/12/LOGO-DOS-SOLES-180PX.png');
    
    // Check natural width to confirm rendering payload was decoded
    const isLoaded = await logo.evaluate((img) => {
      return img.complete && img.naturalWidth > 0;
    });
    expect(isLoaded).toBe(true);
  });

  test('should have a CSS Bento grid container and exactly four bento tiles with border-radius', async ({ page }) => {
    const bentoGrid = page.locator('.bento-grid');
    await expect(bentoGrid).toBeVisible();
    const displayMode = await bentoGrid.evaluate(el => window.getComputedStyle(el).display);
    expect(displayMode).toBe('grid');

    const bentoTiles = page.locator('.bento-tile');
    const count = await bentoTiles.count();
    expect(count).toBe(4);

    const firstTile = bentoTiles.first();
    const borderRadius = await firstTile.evaluate(el => window.getComputedStyle(el).borderRadius);
    expect(parseInt(borderRadius)).toBeGreaterThan(0);
  });

  test('should use circular styling for search input and pill styling for newsletter input', async ({ page }) => {
    const searchInput = page.locator('#header-search-input');
    await expect(searchInput).toBeVisible();
    const searchRadius = await searchInput.evaluate(el => window.getComputedStyle(el).borderRadius);
    expect(parseInt(searchRadius)).toBeGreaterThanOrEqual(20);

    const newsletterGroup = page.locator('#newsletter-form .input-group');
    await expect(newsletterGroup).toBeVisible();
    const newsletterRadius = await newsletterGroup.evaluate(el => window.getComputedStyle(el).borderRadius);
    expect(parseInt(newsletterRadius)).toBeGreaterThanOrEqual(20);
  });

  test('should trigger zoom scaling effect on bento grid card hover', async ({ page }) => {
    const firstBentoTile = page.locator('.bento-tile').first();
    const bentoImage = firstBentoTile.locator('.bento-image');
    
    const initialTransform = await bentoImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    await firstBentoTile.hover();
    await page.waitForTimeout(600);
    
    const hoverTransform = await bentoImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).toContain('matrix');
  });

  test('should trigger zoom scaling effect on product image hover', async ({ page }) => {
    const firstProductCard = page.locator('.product-card').first();
    const productImage = firstProductCard.locator('.product-image');
    
    const initialTransform = await productImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    await firstProductCard.hover();
    await page.waitForTimeout(600);
    
    const hoverTransform = await productImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).toContain('matrix');
  });

  test('should validate newsletter and alert on malformed email', async ({ page }) => {
    const newsletterEmailInput = page.locator('#newsletter-email');
    const newsletterForm = page.locator('#newsletter-form');
    
    await newsletterEmailInput.fill('invalidemailpattern');
    
    let dialogMessage = '';
    page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    
    await newsletterForm.locator('button[type="submit"]').click();
    expect(dialogMessage).toContain('Por favor, ingresa una dirección de correo electrónico válida');
  });

  test('should show success message on valid email submission', async ({ page }) => {
    const newsletterEmailInput = page.locator('#newsletter-email');
    const newsletterForm = page.locator('#newsletter-form');
    const newsletterMessage = page.locator('#newsletter-message');
    
    await newsletterEmailInput.fill('estilista@dossoles.com');
    await newsletterForm.locator('button[type="submit"]').click();
    
    await expect(newsletterMessage).toHaveText('¡Gracias por suscribirte!');
    await expect(newsletterMessage).toHaveClass(/success/);
  });

  test('should reveal live search results dropdown when typing query', async ({ page }) => {
    const searchInput = page.locator('#header-search-input');
    const searchResultsDropdown = page.locator('#header-search-results');
    
    await searchInput.fill('Truss');
    await expect(searchResultsDropdown).toBeVisible();
    
    const matchesCount = await searchResultsDropdown.locator('.search-results-list li').count();
    expect(matchesCount).toBeGreaterThan(0);
    
    const textTruss = await searchResultsDropdown.locator('.search-results-list li').first().textContent();
    expect(textTruss).toContain('Truss');
  });
});
