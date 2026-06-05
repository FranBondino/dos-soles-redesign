const { test, expect } = require('@playwright/test');

test.describe('Version 5: Douglas Premium Bold Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the v5-douglas index.html page
    await page.goto('/v5-douglas/index.html');
  });

  test('should load with a dark navy background', async ({ page }) => {
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    // RGB representation of #050a1d is rgb(5, 10, 29)
    expect(backgroundColor).toBe('rgb(5, 10, 29)');
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

  test('should contain routines section with at least 3 routine cards and golden buttons', async ({ page }) => {
    const routinesSection = page.locator('.routines-section');
    await expect(routinesSection).toBeVisible();

    const routineCards = routinesSection.locator('.routine-card');
    const count = await routineCards.count();
    expect(count).toBeGreaterThanOrEqual(3);

    for (let i = 0; i < count; i++) {
      const button = routineCards.nth(i).locator('.btn-course-gold');
      await expect(button).toBeVisible();
      
      const borderColor = await button.evaluate((el) => {
        return window.getComputedStyle(el).borderColor;
      });
      // rgb(221, 153, 51) is #dd9933 (gold)
      expect(borderColor).toBe('rgb(221, 153, 51)');
    }
  });

  test('should display product cards with gold borders', async ({ page }) => {
    const productCard = page.locator('.product-card').first();
    await expect(productCard).toBeVisible();
    
    const borderColor = await productCard.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    expect(borderColor).toBe('rgb(221, 153, 51)'); // #dd9933
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
    
    await newsletterEmailInput.fill('profesional@dossoles.com');
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
  });

  test('should allow manual slide changes on slider dot click', async ({ page }) => {
    const slides = page.locator('.hero-slide');
    const dots = page.locator('.slider-dot');
    
    await expect(slides.nth(0)).toHaveClass(/active/);
    await expect(slides.nth(1)).not.toHaveClass(/active/);
    
    await dots.nth(1).click();
    
    await expect(slides.nth(1)).toHaveClass(/active/);
    await expect(slides.nth(0)).not.toHaveClass(/active/);
  });
});
