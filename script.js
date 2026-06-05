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

  // 6. Catalog Filtering & Sorting System
  setupCatalogSystem();
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
 * Handles catalog filtering, sorting, accordions, and mobile drawer.
 */
function setupCatalogSystem() {
  const gridContainer = document.getElementById('catalog-products-grid');
  const countDisplay = document.getElementById('products-count');
  const noProductsMsg = document.getElementById('no-products-message');
  const sortSelect = document.getElementById('sort-select');
  const clearBtn = document.getElementById('btn-clear-filters');
  const resetBtn = document.getElementById('btn-reset-filters');
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const accordionItems = document.querySelectorAll('.filter-accordion-item');

  // Mobile elements
  const mobileFilterBtn = document.getElementById('btn-mobile-filter');
  const closeSidebarBtn = document.getElementById('btn-close-sidebar');
  const sidebar = document.getElementById('filters-sidebar');
  const overlay = document.getElementById('filters-overlay');

  if (!gridContainer) return;

  // 1. Accordion logic (Juleriaque style)
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2. Mobile drawer toggling
  if (mobileFilterBtn && sidebar && overlay) {
    mobileFilterBtn.addEventListener('click', () => {
      sidebar.classList.add('mobile-open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileFilters() {
    if (sidebar && overlay) {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener('click', closeMobileFilters);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMobileFilters);
  }

  // 3. Filtering and Sorting Logic
  function updateCatalog() {
    // Collect selected filters
    const selectedBrands = [];
    const selectedCategories = [];
    const selectedPrices = [];

    checkboxes.forEach(cb => {
      if (cb.checked) {
        const type = cb.getAttribute('data-type');
        const val = cb.value;
        if (type === 'brand') selectedBrands.push(val);
        else if (type === 'category') selectedCategories.push(val);
        else if (type === 'price') selectedPrices.push(val);
      }
    });

    // Filter products
    let filtered = PRODUCTS_DB.filter(product => {
      // Brand match (OR within Brand group)
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }
      // Category match (OR within Category group)
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      // Price range match (OR within Price group)
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some(range => {
          if (range === 'under-10k') return product.price < 10000;
          if (range === '10k-15k') return product.price >= 10000 && product.price <= 15000;
          if (range === 'over-15k') return product.price > 15000;
          return false;
        });
        if (!matchesPrice) return false;
      }
      return true;
    });

    // Sort products
    const sortBy = sortSelect ? sortSelect.value : 'relevance';
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Relevance retains original database order (sorted by id)
      filtered.sort((a, b) => a.id - b.id);
    }

    renderGrid(filtered);
  }

  function renderGrid(products) {
    // Add brief fade animation to catalog update
    gridContainer.style.opacity = '0';
    gridContainer.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      gridContainer.innerHTML = '';

      if (products.length === 0) {
        if (noProductsMsg) noProductsMsg.style.display = 'block';
        gridContainer.style.display = 'none';
        if (countDisplay) countDisplay.textContent = '0 productos';
      } else {
        if (noProductsMsg) noProductsMsg.style.display = 'none';
        gridContainer.style.display = 'grid';
        if (countDisplay) countDisplay.textContent = `${products.length} producto${products.length > 1 ? 's' : ''}`;

        products.forEach(p => {
          const card = document.createElement('div');
          card.className = 'product-card';
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
          gridContainer.appendChild(card);
        });
      }
      
      gridContainer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      gridContainer.style.opacity = '1';
      gridContainer.style.transform = 'translateY(0)';
    }, 150);
  }

  // 4. Register event listeners
  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateCatalog);
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', updateCatalog);
  }

  function clearAllFilters() {
    checkboxes.forEach(cb => {
      cb.checked = false;
    });
    if (sortSelect) {
      sortSelect.value = 'relevance';
    }
    updateCatalog();
    closeMobileFilters();
  }

  if (clearBtn) clearBtn.addEventListener('click', clearAllFilters);
  if (resetBtn) resetBtn.addEventListener('click', clearAllFilters);

  // Initial render
  updateCatalog();
}
