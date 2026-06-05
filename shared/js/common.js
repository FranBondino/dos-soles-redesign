// Shared JS Utilities for Dos Soles Redesign

// Brand list array
const BRANDS = [
  { id: 'truss', name: 'Truss Professional', logo: 'https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/09/isologo-dossoles-rojo-2023-768x768.png.webp' },
  { id: 'matrix', name: 'Matrix', logo: 'https://dossolesdistribuidora.com.ar/wp-content/uploads/2023/09/isologo-dossoles-rojo-2023-768x768.png.webp' },
  { id: 'loreal', name: "L'Oréal Professionnel", logo: '' },
  { id: 'wella', name: 'Wella Professionals', logo: '' }
];

// Mock product search data
const MOCK_PRODUCTS = [
  { name: 'Truss Net Mask', brand: 'Truss', price: '$15.500' },
  { name: 'Truss Deluxe Prime', brand: 'Truss', price: '$12.200' },
  { name: 'Matrix SoColor Coloration', brand: 'Matrix', price: '$8.400' },
  { name: 'Matrix Total Results Shampoo', brand: 'Matrix', price: '$9.900' },
  { name: 'Dos Soles Nutritive Ampoule', brand: 'Dos Soles', price: '$5.000' }
];

// Live search utility
function setupLiveSearch(inputSelector, resultsSelector) {
  const inputEl = document.querySelector(inputSelector);
  const resultsEl = document.querySelector(resultsSelector);
  
  if (!inputEl || !resultsEl) return;
  
  inputEl.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    resultsEl.innerHTML = '';
    
    if (query.length < 2) {
      resultsEl.style.display = 'none';
      return;
    }
    
    const matches = MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.brand.toLowerCase().includes(query)
    );
    
    if (matches.length > 0) {
      resultsEl.style.display = 'block';
      const ul = document.createElement('ul');
      ul.className = 'search-results-list';
      matches.forEach(match => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${match.name}</strong> - ${match.brand} <span class="price">${match.price}</span>`;
        ul.appendChild(li);
      });
      resultsEl.appendChild(ul);
    } else {
      resultsEl.style.display = 'block';
      resultsEl.innerHTML = '<div class="no-results">No se encontraron productos</div>';
    }
  });
  
  // Close results on click outside
  document.addEventListener('click', (e) => {
    if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
      resultsEl.style.display = 'none';
    }
  });
}

// Navigation / Menu Utilities
function setupDropdowns() {
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menu = trigger.nextElementSibling;
      if (menu && menu.classList.contains('dropdown-menu')) {
        menu.classList.toggle('active');
      }
    });
  });
}

// Export for module systems or attach to window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BRANDS, MOCK_PRODUCTS, setupLiveSearch };
} else {
  window.DosSolesCommon = { BRANDS, MOCK_PRODUCTS, setupLiveSearch, setupDropdowns };
}
