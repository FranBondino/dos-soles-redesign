const playwright = require('playwright');
const path = require('path');

async function debugOverflow() {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 800 });

  const paths = [
    'file:///' + path.resolve('v1-editorial/index.html').replace(/\\/g, '/'),
    'file:///' + path.resolve('v2-darkgold/index.html').replace(/\\/g, '/'),
    'file:///' + path.resolve('v3-bento/index.html').replace(/\\/g, '/')
  ];

  for (const url of paths) {
    console.log(`\n=== Analizando overflow en: ${url} ===`);
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    const overflowElements = await page.evaluate(() => {
      const results = [];
      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > 390) {
          results.push({
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            offsetWidth: el.offsetWidth,
            scrollWidth: el.scrollWidth,
            rectRight: rect.right,
            rectWidth: rect.width
          });
        }
      });
      return results;
    });

    console.log(`Encontrados ${overflowElements.length} elementos con desborde en el viewport de 390px.`);
    // Mostrar los más relevantes (los que tienen mayor ancho o desborde)
    overflowElements
      .filter(el => el.rectRight > 391)
      .slice(0, 10)
      .forEach(el => {
        console.log(`  - <${el.tagName} id="${el.id}" class="${el.className}">: offsetWidth=${el.offsetWidth}, rectRight=${el.rectRight}`);
      });
  }

  await browser.close();
}

debugOverflow();
