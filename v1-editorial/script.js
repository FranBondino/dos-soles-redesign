/**
 * Version 1: Minimalista Editorial Homepage Interactivity
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

  // 3. Hero Slide Banner Transitions
  setupHeroSlider();

  // 4. Newsletter Signup Form Validation
  setupNewsletterValidation();

  // 5. Add to Cart Micro-interactivity
  setupCartMicrointeractions();
});

/**
 * Manages hero slider transitions and control dots manual selection
 */
function setupHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      stopAutoPlay();
      const targetIndex = parseInt(e.target.getAttribute('data-slide'), 10);
      showSlide(targetIndex);
      startAutoPlay();
    });
  });

  startAutoPlay();
}

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
    btn.addEventListener('click', () => {
      let currentVal = parseInt(cartCount.textContent, 10) || 0;
      currentVal += 1;
      cartCount.textContent = currentVal;

      // Temporary button state change
      const originalText = btn.textContent;
      btn.textContent = '¡AGREGADO!';
      btn.style.backgroundColor = 'var(--color-red-primary)';
      btn.style.color = '#ffffff';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 1500);
    });
  });
}
