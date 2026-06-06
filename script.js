/**
 * Version 3: Bento Grid Moderno Homepage Interactivity
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

  // 6. Sliders System
  setupSliders();
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
 * Simple cart badge updates using event delegation on the catalog container
 */
function setupCartMicrointeractions() {
  const cartCount = document.querySelector('.cart-count');
  const container = document.getElementById('products-grid-container');
  if (!cartCount || !container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-to-cart');
    if (!btn) return;

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
}

// Local database of 8 real products
const PRODUCTS_DB = [
  {
    id: 1,
    brand: "TRUSS PROFESSIONAL",
    category: "Tratamientos",
    title: "Deluxe Prime Hair Treatment 260ml",
    price: 12200,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/11/Deluxe-Prime-Truss.png",
    badge: "PROFESIONAL",
    badgeClass: "badge-exclusive"
  },
  {
    id: 2,
    brand: "MATRIX",
    category: "Shampoo",
    title: "Instacure Anti-Breakage Shampoo 1L",
    price: 9900,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2024/12/Instacure-Shampoo-1L-Matrix.png",
    badge: "10% OFF",
    badgeClass: "badge-sale"
  },
  {
    id: 3,
    brand: "TRUSS PROFESSIONAL",
    category: "Shampoo",
    title: "Miracle Shampoo Restaurador 300ml",
    price: 15500,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/11/Miracle-shampoo-Truss.png",
    badge: "PROFESIONAL",
    badgeClass: "badge-exclusive"
  },
  {
    id: 4,
    brand: "MATRIX",
    category: "Acondicionador",
    title: "Total Results Glow Mania Acondicionador 300ml",
    price: 8400,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2025/10/Glow-Mania-Acondicionador-300ml.png",
    badge: "NUEVO",
    badgeClass: "badge-new"
  },
  {
    id: 5,
    brand: "TRUSS PROFESSIONAL",
    category: "Shampoo",
    title: "Vegan Detox Shampoo Limpieza Profunda 300ml",
    price: 14200,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/11/Vegan-Detox-shampoo-Truss.png",
    badge: "NUEVO",
    badgeClass: "badge-new"
  },
  {
    id: 6,
    brand: "TRUSS PROFESSIONAL",
    category: "Acondicionador",
    title: "Acondicionador Infusion Brillo y Fuerza 1L",
    price: 22500,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2024/01/Acondicionador-Infusion-1L-Truss.png",
    badge: "PROFESIONAL",
    badgeClass: "badge-exclusive"
  },
  {
    id: 7,
    brand: "MATRIX",
    category: "Shampoo",
    title: "Total Results Unbreak My Blonde Shampoo 1L",
    price: 11800,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/08/Shampoo-Unbreak-My-Blonde-1l-Matrix.png",
    badge: "PROFESIONAL",
    badgeClass: "badge-exclusive"
  },
  {
    id: 8,
    brand: "MATRIX",
    category: "Tratamientos",
    title: "Total Results Glow Mania Máscara Brillo Extremo 500ml",
    price: 13500,
    image: "https://dossolesdistribuidora.com.ar/wp-content/uploads/2025/10/Glow-Mania-Mascara.png",
    badge: "10% OFF",
    badgeClass: "badge-sale"
  }
];

/**
 * Render all 8 real products into the horizontal products slider
 */
function renderProductsSlider() {
  const track = document.getElementById('products-slider-track');
  if (!track) return;

  track.innerHTML = '';
  PRODUCTS_DB.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card slider-item';
    card.innerHTML = `
      <div class="product-image-container">
        <span class="product-badge ${p.badgeClass}">${p.badge}</span>
        <img src="${p.image}" alt="${p.title}" class="product-image">
        <div class="product-hover-action">
          <button class="btn-add-to-cart">AGREGAR AL CARRITO</button>
        </div>
      </div>
      <div class="product-details">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-title">${p.title}</h3>
        <span class="product-price">$${p.price.toLocaleString('es-AR')}</span>
      </div>
    `;
    track.appendChild(card);
  });
}

/**
 * Initializes a horizontal scroll slider using native scrolling and smooth transitions
 */
function initSlider({ trackId, prevId, nextId, progressId }) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const progressBar = document.getElementById(progressId);

  if (!track) return;

  // Calculates scroll progress fraction and updates progress bar width
  function updateProgress() {
    if (!progressBar) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const percentage = maxScroll > 0 ? (track.scrollLeft / maxScroll) * 100 : 0;
    progressBar.style.width = `${percentage}%`;
  }

  // Update progress bar dynamically during native touch swipe and clicks
  track.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);
  
  // Set initial state
  setTimeout(updateProgress, 100);

  // Button Arrow Left (Previous)
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const item = track.querySelector('.slider-item');
      const itemWidth = item ? item.getBoundingClientRect().width : 200;
      // Scroll by full container width on desktop, or single slide on mobile
      const scrollAmount = track.clientWidth > 768 ? track.clientWidth : itemWidth + 20;
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  // Button Arrow Right (Next)
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const item = track.querySelector('.slider-item');
      const itemWidth = item ? item.getBoundingClientRect().width : 200;
      const scrollAmount = track.clientWidth > 768 ? track.clientWidth : itemWidth + 20;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

/**
 * Initializes homepage sliders
 */
function setupSliders() {
  renderProductsSlider();
  
  initSlider({
    trackId: 'brands-slider-track',
    prevId: 'brands-prev',
    nextId: 'brands-next',
    progressId: 'brands-progress-bar'
  });
  
  initSlider({
    trackId: 'products-slider-track',
    prevId: 'products-prev',
    nextId: 'products-next',
    progressId: 'products-progress-bar'
  });
}
