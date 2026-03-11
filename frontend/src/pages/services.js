import { renderFooter } from '../components/footer.js';
import { initScrollReveal } from '../router.js';

export function servicesPage() {
  const containerId = 'services-page-container';
  let currentFilters = {
    category: '',
    min_price: '',
    max_price: '',
    type: ''
  };

  // Trigger initial fetch
  setTimeout(() => fetchServices(), 0);

  async function fetchServices() {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<div class="loading-spinner">Updating results...</div>`;
    }

    try {
      const params = new URLSearchParams();
      if (currentFilters.category) params.append('category', currentFilters.category);
      if (currentFilters.min_price) params.append('min_price', currentFilters.min_price);
      if (currentFilters.max_price) params.append('max_price', currentFilters.max_price);
      if (currentFilters.type) params.append('service_type', currentFilters.type);

      const response = await fetch(`http://localhost:8000/services/?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const services = await response.json();

      // Group services by category
      const categoriesMap = services.reduce((acc, item) => {
        if (!acc[item.category_id]) {
          acc[item.category_id] = {
            id: item.category_id,
            label: formatCategoryLabel(item.category_id),
            items: []
          };
        }
        acc[item.category_id].items.push(item);
        return acc;
      }, {});

      const categories = Object.values(categoriesMap);
      renderServices(categories);
    } catch (error) {
      console.error('Error fetching services:', error);
      if (container) {
        container.innerHTML = `<p class="error-message">Unable to load services at this time. Please try again later.</p>`;
      }
    }
  }

  function formatCategoryLabel(catId) {
    const labels = {
      'photography': 'Photography Packages',
      'printing': 'Printing Products',
      'event-docs': 'Event Documentation',
    };
    return labels[catId] || catId.charAt(0).toUpperCase() + catId.slice(1);
  }

  function renderServices(categories) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (categories.length === 0) {
      container.innerHTML = `
        <div class="no-results scroll-reveal">
          <p>No services found matching your criteria.</p>
          <button class="btn-ghost" onclick="window.resetFilters()">Clear All Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <section class="section services-full-section">
        ${categories.map((cat, ci) => `
          <div class="service-category scroll-reveal" data-delay="${ci * 100}" id="${cat.id}">
            <div class="category-header">
              <h2 class="category-title">${cat.label}</h2>
              <div class="category-line"></div>
            </div>
            <div class="category-grid">
              ${cat.items.map((item, ii) => `
                <div class="category-card scroll-reveal" data-delay="${ii * 80}">
                  ${item.tag ? `<span class="card-tag">${item.tag}</span>` : ''}
                  <h3 class="category-card-title">${item.title}</h3>
                  <p class="category-card-body">${item.description}</p>
                  <p class="category-card-price">${item.price ? `Starts at ₱${item.price.toLocaleString()}` : ''}</p>
                  <a href="/contacts" data-link class="inquire-link">Inquire <span>→</span></a>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </section>
    `;

    // Important: Re-initialize scroll reveal for dynamic content
    initScrollReveal();
  }

  // Global handler for filter changes
  window.handleFilterChange = (filterName, value) => {
    currentFilters[filterName] = value;
    fetchServices();
  };

  window.resetFilters = () => {
    currentFilters = {
      category: '',
      min_price: '',
      max_price: '',
      type: ''
    };
    // Reset select values manually
    document.querySelectorAll('.filter-select, .filter-input').forEach(el => el.value = '');
    fetchServices();
  };

  return `
  <!-- PAGE HEADER -->
  <div class="page-header">
    <div class="page-header-inner">
      <p class="section-label reveal" data-delay="100">— What We Offer</p>
      <h1 class="page-title reveal" data-delay="250">Our Services</h1>
      <p class="page-subtitle reveal" data-delay="400">From professional photography to event documentation — we've got you covered.</p>
    </div>
  </div>

  <!-- FILTER CONTROLS -->
  <section class="filter-section scroll-reveal">
    <div class="filter-container">
      <div class="filter-group">
        <label class="form-label">Category</label>
        <select class="form-select filter-select" onchange="window.handleFilterChange('category', this.value)">
          <option value="">All Categories</option>
          <option value="photography">Photography</option>
          <option value="printing">Printing</option>
          <option value="event-docs">Event Documentation</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label class="form-label">Price Range</label>
        <div class="price-inputs">
          <input type="number" class="form-input filter-input" placeholder="Min" onchange="window.handleFilterChange('min_price', this.value)" />
          <span>—</span>
          <input type="number" class="form-input filter-input" placeholder="Max" onchange="window.handleFilterChange('max_price', this.value)" />
        </div>
      </div>

      <div class="filter-group">
        <label class="form-label">Type</label>
        <select class="form-select filter-select" onchange="window.handleFilterChange('type', this.value)">
          <option value="">Any Type</option>
          <option value="service">Services</option>
          <option value="product">Products</option>
        </select>
      </div>

      <div class="filter-actions">
        <button class="btn-ghost" onclick="window.resetFilters()">Reset</button>
      </div>
    </div>
  </section>

  <div id="${containerId}">
    <div class="loading-spinner">Loading services...</div>
  </div>

  <!-- QUESTIONS CTA -->
  <section class="questions-section scroll-reveal">
    <div class="questions-inner">
      <div class="questions-img"></div>
      <div class="questions-content">
        <p class="section-label">— Have Questions?</p>
        <h2 class="section-title">Not Sure What<br>You Need?</h2>
        <p class="about-body">Just reach out and we'll help you find the right service for your project. No commitment required.</p>
        <a href="/contacts" data-link class="btn-primary" style="margin-top:2rem;display:inline-block;">Contact Us</a>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="cta-banner scroll-reveal">
    <div class="cta-banner-text"><em>Ready to get started?</em> Send us an inquiry today.</div>
    <div class="cta-banner-form">
      <input type="email" class="cta-input" placeholder="Enter your email" />
      <button class="cta-submit">Get Started</button>
    </div>
  </section>

  ${renderFooter()}

  <style>
    .filter-section {
      background: var(--off-black);
      padding: 2rem 3rem;
      border-bottom: 1px solid var(--border);
    }
    .filter-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      align-items: flex-end;
    }
    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .price-inputs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .price-inputs .form-input {
      margin-bottom: 0;
      padding: 0.4rem 0;
      text-align: center;
    }
    .price-inputs span {
      color: var(--muted);
      font-size: 0.8rem;
    }
    .filter-select {
      margin-bottom: 0;
      padding: 0.4rem 0;
    }
    .filter-actions {
      display: flex;
      justify-content: flex-end;
    }
    .no-results {
      padding: 5rem 3rem;
      text-align: center;
      color: var(--subtle);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
    .loading-spinner {
      padding: 5rem 3rem;
      text-align: center;
      color: var(--muted);
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }
  </style>
  `;
}
