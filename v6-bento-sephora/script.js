/**
 * Version 6: Bento Grid Sephora Edition Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Search Setup from shared library
  if (window.DosSolesCommon && typeof window.DosSolesCommon.setupLiveSearch === 'function') {
    window.DosSolesCommon.setupLiveSearch('#header-search-input', '#header-search-results');
  }

  // 2. Dropdown Menus Setup from shared library
  if (window.DosSolesCommon && typeof window.DosSolesCommon.setupDropdowns === 'function') {
    window.DosSolesCommon.setupDropdowns();
  }

  // 3. Newsletter Signup Form Validation
  setupNewsletterValidation();

  // 4. Add to Cart Micro-interactivity
  setupCartMicrointeractions();

  // 5. Bento Tile click handler logic
  setupBentoInteractions();
});

/**
 * Footer newsletter email validator alerts the user on incorrect formatting
 */
function setupNewsletterValidation() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const messageEl = document.getElementById('newsletter-message');
  if (!form || !emailInput) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Simple alerts trigger on malformed email to satisfy E2E testing
    if (!emailRegex.test(emailValue)) {
      alert('Por favor, ingresa una dirección de correo electrónico válida.');
      if (messageEl) {
        messageEl.textContent = 'Email inválido.';
        messageEl.className = 'newsletter-message error';
      }
      return;
    }

    // Success response
    if (messageEl) {
      messageEl.textContent = '¡Gracias por suscribirte!';
      messageEl.className = 'newsletter-message success';
      emailInput.value = '';
    }
  });
}

/**
 * Simple cart badge updates on clicking product card additions
 */
function setupCartMicrointeractions() {
  const cartCount = document.querySelector('.cart-count');
  const addButtons = document.querySelectorAll('.btn-add-to-cart');
  if (!cartCount || !addButtons.length) return;

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      let currentVal = parseInt(cartCount.textContent, 10) || 0;
      currentVal += 1;
      cartCount.textContent = currentVal;

      // Temporary button state change
      const originalText = btn.textContent;
      btn.textContent = '¡AGREGADO!';
      btn.style.backgroundColor = '#D4000C';
      btn.style.color = '#ffffff';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 1500);
    });
  });
}

/**
 * Highlights a selected bento category or performs mock filter
 */
function setupBentoInteractions() {
  const tiles = document.querySelectorAll('.bento-tile');
  tiles.forEach(tile => {
    tile.addEventListener('click', (e) => {
      const category = tile.getAttribute('data-category');
      console.log(`Bento category selected: ${category}`);
      // In a real app this would trigger filter, for now just allow navigation/link default
    });
  });
}
