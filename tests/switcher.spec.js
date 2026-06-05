const { test, expect } = require('@playwright/test');

test.describe('Dos Soles Home Switcher Portal', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set viewport size to ensure desktop width fits the 1280px container
    await page.setViewportSize({ width: 1400, height: 900 });
    // Navigate to the root index.html page
    await page.goto('/index.html');
  });

  test('should load the switcher page and iframe successfully', async ({ page }) => {
    // Verify title contains "Dos Soles"
    await expect(page).toHaveTitle(/Dos Soles/);
    
    // Check if the preview iframe exists and is visible
    const iframe = page.locator('#preview-iframe');
    await expect(iframe).toBeVisible();
  });

  test('should contain version selection controls', async ({ page }) => {
    // Verify six version buttons exist
    const btnV1 = page.locator('#btn-v1');
    const btnV2 = page.locator('#btn-v2');
    const btnV3 = page.locator('#btn-v3');
    const btnV4 = page.locator('#btn-v4');
    const btnV5 = page.locator('#btn-v5');
    const btnV6 = page.locator('#btn-v6');

    await expect(btnV1).toBeVisible();
    await expect(btnV1).toHaveText(/V1 Editorial/i);
    await expect(btnV2).toBeVisible();
    await expect(btnV2).toHaveText(/V2 Dark & Gold/i);
    await expect(btnV3).toBeVisible();
    await expect(btnV3).toHaveText(/V3 Bento/i);
    await expect(btnV4).toBeVisible();
    await expect(btnV4).toHaveText(/V4 Sephora/i);
    await expect(btnV5).toBeVisible();
    await expect(btnV5).toHaveText(/V5 Douglas/i);
    await expect(btnV6).toBeVisible();
    await expect(btnV6).toHaveText(/V6 Bento Sephora/i);
  });

  test('should switch iframe src attribute when versions are clicked', async ({ page }) => {
    const iframe = page.locator('#preview-iframe');

    // Default version should be v1-editorial
    await expect(iframe).toHaveAttribute('src', 'v1-editorial/index.html');

    // Click V2 Dark & Gold
    await page.locator('#btn-v2').click();
    await expect(iframe).toHaveAttribute('src', 'v2-darkgold/index.html');

    // Click V3 Bento Grid
    await page.locator('#btn-v3').click();
    await expect(iframe).toHaveAttribute('src', 'v3-bento/index.html');

    // Click V4 Sephora
    await page.locator('#btn-v4').click();
    await expect(iframe).toHaveAttribute('src', 'v4-sephora/index.html');

    // Click V5 Douglas
    await page.locator('#btn-v5').click();
    await expect(iframe).toHaveAttribute('src', 'v5-douglas/index.html');

    // Click V6 Bento Sephora
    await page.locator('#btn-v6').click();
    await expect(iframe).toHaveAttribute('src', 'v6-bento-sephora/index.html');

    // Click V1 Editorial again
    await page.locator('#btn-v1').click();
    await expect(iframe).toHaveAttribute('src', 'v1-editorial/index.html');
  });

  test('should contain responsive size control buttons', async ({ page }) => {
    const btnDesktop = page.locator('#btn-desktop');
    const btnTablet = page.locator('#btn-tablet');
    const btnMobile = page.locator('#btn-mobile');

    await expect(btnDesktop).toBeVisible();
    await expect(btnTablet).toBeVisible();
    await expect(btnMobile).toBeVisible();
  });

  test('should alter iframe container width on size button clicks', async ({ page }) => {
    const container = page.locator('#iframe-container');

    // Default state: Desktop view should scale container to 1280px
    await expect(container).toHaveCSS('width', '1280px');

    // Switch to Tablet: Should scale container to 768px
    await page.locator('#btn-tablet').click();
    await expect(container).toHaveCSS('width', '768px');

    // Switch to Mobile: Should scale container to 390px
    await page.locator('#btn-mobile').click();
    await expect(container).toHaveCSS('width', '390px');

    // Switch back to Desktop: Should restore container to 1280px
    await page.locator('#btn-desktop').click();
    await expect(container).toHaveCSS('width', '1280px');
  });
});
