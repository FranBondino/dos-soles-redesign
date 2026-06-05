const { test, expect } = require('@playwright/test');

test.describe('Version 1: Minimalista Editorial Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the v1-editorial index.html page
    await page.goto('/v1-editorial/index.html');
  });

  test('should load with a clean white background', async ({ page }) => {
    // Assert body background matches white (#ffffff)
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    // RGB representation of #ffffff is rgb(255, 255, 255)
    expect(backgroundColor).toBe('rgb(255, 255, 255)');
  });

  test('should use Plus Jakarta Sans typography', async ({ page }) => {
    // Assert typography utilizes 'Plus Jakarta Sans'
    const body = page.locator('body');
    const fontFamily = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    expect(fontFamily).toContain('Plus Jakarta Sans');
  });

  test('should contain fine 1px gray borders', async ({ page }) => {
    // Assert thin gray borders (1px) are present on key layout elements
    const borderElements = [
      '.notification-bar',
      '.main-header',
      '.product-image-container'
    ];

    for (const selector of borderElements) {
      const element = page.locator(selector).first();
      await expect(element).toBeVisible();
      
      const borderWidth = await element.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.borderBottomWidth || style.borderWidth;
      });
      expect(borderWidth).toBe('1px');
    }
  });

  test('should load the official logo successfully', async ({ page }) => {
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
    await newsletterEmailInput.fill('profesional@dossoles.com');
    
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
});
