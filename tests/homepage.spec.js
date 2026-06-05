const { test, expect } = require('@playwright/test');

test.describe('Dos Soles Homepage (Bento Grid)', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the root homepage
    await page.goto('/');
  });

  test('should use Plus Jakarta Sans typography', async ({ page }) => {
    // Assert typography utilizes 'Plus Jakarta Sans'
    const body = page.locator('body');
    const fontFamily = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    expect(fontFamily).toContain('Plus Jakarta Sans');
  });

  test('should load the official logo and display name successfully', async ({ page }) => {
    // Assert logo image loads successfully with the correct production URL
    const logo = page.locator('.brand-logo');
    await expect(logo).toBeVisible();
    
    const logoSrc = await logo.getAttribute('src');
    expect(logoSrc).toBe('https://dossolesdistribuidora.com.ar/wp-content/uploads/2024/12/LOGO-DOS-SOLES-180PX.png');
    
    // Check natural width to confirm rendering payload was decoded
    const isLoaded = await logo.evaluate((img) => {
      return img.complete && img.naturalWidth > 0;
    });
    expect(isLoaded).toBe(true);

    // Verify brand text "DOS SOLES"
    const logoText = page.locator('.logo-text');
    await expect(logoText).toBeVisible();
    await expect(logoText).toHaveText('DOS SOLES');
    
    const font = await logoText.evaluate(el => window.getComputedStyle(el).fontFamily);
    expect(font).toContain('Cinzel');
  });

  test('should have a CSS Bento grid container and four bento tiles', async ({ page }) => {
    // Assert that the grid element is using grid display
    const bentoGrid = page.locator('.bento-grid');
    await expect(bentoGrid).toBeVisible();
    const displayMode = await bentoGrid.evaluate(el => window.getComputedStyle(el).display);
    expect(displayMode).toBe('grid');

    // Assert that we have exactly 4 bento tiles for our categories
    const bentoTiles = page.locator('.bento-tile');
    const count = await bentoTiles.count();
    expect(count).toBe(4);

    // Assert that the tiles have a border radius
    const firstTile = bentoTiles.first();
    const borderRadius = await firstTile.evaluate(el => window.getComputedStyle(el).borderRadius);
    expect(parseInt(borderRadius)).toBeGreaterThan(0);
  });

  test('should trigger zoom scaling effect on bento grid card hover', async ({ page }) => {
    const firstBentoTile = page.locator('.bento-tile').first();
    const bentoImage = firstBentoTile.locator('.bento-image');
    
    // Get starting transform matrix
    const initialTransform = await bentoImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    // Emulate hover interaction
    await firstBentoTile.hover();
    
    // Wait slightly to let CSS transition finish
    await page.waitForTimeout(600);
    
    const hoverTransform = await bentoImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    // Compare transitions
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).toContain('matrix');
  });

  test('should trigger zoom scaling effect on product image hover', async ({ page }) => {
    // Assert product image hover zoom triggers scale transforms
    const firstProductCard = page.locator('.product-card').first();
    const productImage = firstProductCard.locator('.product-image');
    
    // Get starting transform matrix
    const initialTransform = await productImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    // Emulate hover interaction
    await firstProductCard.hover();
    
    // Wait slightly to let CSS transition finish
    await page.waitForTimeout(600);
    
    const hoverTransform = await productImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    // Compare transitions
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).toContain('matrix');
  });

  test('should validate newsletter and alert on malformed email', async ({ page }) => {
    // Assert newsletter validation alerts user on invalid email formatting
    const newsletterEmailInput = page.locator('#newsletter-email');
    const newsletterForm = page.locator('#newsletter-form');
    
    // Fill in non-compliant value
    await newsletterEmailInput.fill('invalidemailpattern');
    
    // Setup dialog hook event listener
    let dialogMessage = '';
    page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });
    
    // Trigger submission
    await newsletterForm.locator('button[type="submit"]').click();
    
    // Assert dialog text
    expect(dialogMessage).toContain('Por favor, ingresa una dirección de correo electrónico válida');
  });

  test('should show success message on valid email submission', async ({ page }) => {
    const newsletterEmailInput = page.locator('#newsletter-email');
    const newsletterForm = page.locator('#newsletter-form');
    const newsletterMessage = page.locator('#newsletter-message');
    
    // Fill compliant address
    await newsletterEmailInput.fill('estilista@dossoles.com');
    
    // Submit
    await newsletterForm.locator('button[type="submit"]').click();
    
    // Verify results
    await expect(newsletterMessage).toHaveText('¡Gracias por suscribirte!');
    await expect(newsletterMessage).toHaveClass(/success/);
  });

  test('should reveal live search results dropdown when typing query', async ({ page }) => {
    // Assert typing query reveals live matching list
    const searchInput = page.locator('#header-search-input');
    const searchResultsDropdown = page.locator('#header-search-results');
    
    // Type target brand query
    await searchInput.fill('Truss');
    
    // Dropdown list should change display from none to block
    await expect(searchResultsDropdown).toBeVisible();
    
    // Ensure product list has render items
    const matchesCount = await searchResultsDropdown.locator('.search-results-list li').count();
    expect(matchesCount).toBeGreaterThan(0);
    
    const textTruss = await searchResultsDropdown.locator('.search-results-list li').first().textContent();
    expect(textTruss).toContain('Truss');
  });

  test('should allow manual slide changes on slider dot click', async ({ page }) => {
    // Assert hero slider reacts to clicks
    const slides = page.locator('.hero-slide');
    const dots = page.locator('.slider-dot');
    
    // Slide 1 starts active
    await expect(slides.nth(0)).toHaveClass(/active/);
    await expect(slides.nth(1)).not.toHaveClass(/active/);
    
    // Click indicator dot 2
    await dots.nth(1).click();
    
    // Slide 2 is active now
    await expect(slides.nth(1)).toHaveClass(/active/);
    await expect(slides.nth(0)).not.toHaveClass(/active/);
  });

  test('should verify Portal Profesional naming is respected', async ({ page }) => {
    const headerBtn = page.locator('.btn-portal-mayorista');
    await expect(headerBtn).toBeVisible();
    await expect(headerBtn).toHaveText('PORTAL PROFESIONAL');

    const footerLink = page.locator('.footer-links li a', { hasText: 'Portal Profesional' });
    await expect(footerLink).toBeVisible();
  });

  test('should verify footer has red background color', async ({ page }) => {
    const footer = page.locator('.main-footer');
    const bgColor = await footer.evaluate(el => window.getComputedStyle(el).backgroundColor);
    // #D4000C in RGB is rgb(212, 0, 12)
    expect(bgColor).toBe('rgb(212, 0, 12)');
  });

  test('should render without horizontal scroll overflow on mobile (390px viewport)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);
  });
});
