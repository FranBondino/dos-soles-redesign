const { test, expect } = require('@playwright/test');

test.describe('Version 2: Premium Dark & Gold Homepage', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate directly to the v2-darkgold index.html page
    await page.goto('/v2-darkgold/index.html');
  });

  test('should load with a dark navy background (#0B1A48)', async ({ page }) => {
    // Assert body background matches navy (#0B1A48)
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    // RGB representation of #0B1A48 is rgb(11, 26, 72)
    expect(backgroundColor).toBe('rgb(11, 26, 72)');
  });

  test('should use Plus Jakarta Sans typography', async ({ page }) => {
    // Assert typography utilizes 'Plus Jakarta Sans'
    const body = page.locator('body');
    const fontFamily = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontFamily;
    });
    expect(fontFamily).toContain('Plus Jakarta Sans');
  });

  test('should render B2B/Salon courses block', async ({ page }) => {
    // Assert the B2B courses section is present
    const coursesSection = page.locator('.courses-section');
    await expect(coursesSection).toBeVisible();
    
    // Assert course cards are rendered
    const courseCards = page.locator('.course-card');
    const count = await courseCards.count();
    expect(count).toBe(3);
    
    // Check titles contain targeted professional brands
    const firstCourseTitle = await courseCards.nth(0).locator('.course-title').textContent();
    const secondCourseTitle = await courseCards.nth(1).locator('.course-title').textContent();
    expect(firstCourseTitle).toContain('Matrix');
    expect(secondCourseTitle).toContain('Truss');
  });

  test('should use gold (#dd9933) on key borders or buttons', async ({ page }) => {
    // Check portal mayorista button border uses gold
    const portalBtn = page.locator('.btn-portal-mayorista');
    await expect(portalBtn).toBeVisible();
    
    const borderColor = await portalBtn.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    // rgb(221, 153, 51) is equivalent to #dd9933
    expect(borderColor).toBe('rgb(221, 153, 51)');
    
    // Check courses CTA buttons border uses gold
    const courseBtn = page.locator('.btn-course-gold').first();
    await expect(courseBtn).toBeVisible();
    const courseBtnBorder = await courseBtn.evaluate((el) => {
      return window.getComputedStyle(el).borderColor;
    });
    expect(courseBtnBorder).toBe('rgb(221, 153, 51)');
  });

  test('should show Truss/Matrix products in search dropdown', async ({ page }) => {
    const searchInput = page.locator('#header-search-input');
    const resultsDropdown = page.locator('#header-search-results');
    
    // 1. Search for Truss
    await searchInput.fill('Truss');
    await expect(resultsDropdown).toBeVisible();
    
    const trussResults = resultsDropdown.locator('.search-results-list li');
    const countTruss = await trussResults.count();
    expect(countTruss).toBeGreaterThan(0);
    
    const textTruss = await trussResults.first().textContent();
    expect(textTruss).toContain('Truss');
    
    // Clear input and search for Matrix
    await searchInput.fill('');
    await searchInput.fill('Matrix');
    await expect(resultsDropdown).toBeVisible();
    
    const matrixResults = resultsDropdown.locator('.search-results-list li');
    const countMatrix = await matrixResults.count();
    expect(countMatrix).toBeGreaterThan(0);
    
    const textMatrix = await matrixResults.first().textContent();
    expect(textMatrix).toContain('Matrix');
  });

  test('should load the official logo successfully', async ({ page }) => {
    // Assert logo image loads successfully with the correct URL
    const logo = page.locator('.brand-logo');
    await expect(logo).toBeVisible();
    
    const logoSrc = await logo.getAttribute('src');
    expect(logoSrc).toBe('https://dossolesdistribuidora.com.ar/wp-content/uploads/2024/12/LOGO-DOS-SOLES-180PX.png');
    
    // Confirm rendering payload was decoded
    const isLoaded = await logo.evaluate((img) => {
      return img.complete && img.naturalWidth > 0;
    });
    expect(isLoaded).toBe(true);
  });

  test('should allow manual slide changes on slider dot click', async ({ page }) => {
    // Assert hero slider reacts to manual click navigation
    const slides = page.locator('.hero-slide');
    const dots = page.locator('.slider-dot');
    
    // Starts with slide 1 active
    await expect(slides.nth(0)).toHaveClass(/active/);
    await expect(slides.nth(1)).not.toHaveClass(/active/);
    
    // Click indicator dot 2
    await dots.nth(1).click();
    
    // Slide 2 becomes active
    await expect(slides.nth(1)).toHaveClass(/active/);
    await expect(slides.nth(0)).not.toHaveClass(/active/);
  });

  test('should validate newsletter and alert on malformed email', async ({ page }) => {
    const newsletterEmailInput = page.locator('#newsletter-email');
    const newsletterForm = page.locator('#newsletter-form');
    
    await newsletterEmailInput.fill('malformedemailaddress');
    
    // Event listener setup
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
    
    await newsletterEmailInput.fill('academy@dossoles.com');
    await newsletterForm.locator('button[type="submit"]').click();
    
    await expect(newsletterMessage).toHaveText('¡Gracias por suscribirte!');
    await expect(newsletterMessage).toHaveClass(/success/);
  });

  test('should trigger zoom scaling effect on product image hover', async ({ page }) => {
    const firstProductCard = page.locator('.product-card').first();
    const productImage = firstProductCard.locator('.product-image');
    
    const initialTransform = await productImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    await firstProductCard.hover();
    await page.waitForTimeout(600); // Allow transition to finish
    
    const hoverTransform = await productImage.evaluate((img) => {
      return window.getComputedStyle(img).transform;
    });
    
    expect(hoverTransform).not.toBe(initialTransform);
    expect(hoverTransform).toContain('matrix');
  });
});
