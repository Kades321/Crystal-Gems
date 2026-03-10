import { renderFooter } from '../components/footer.js';

export function servicesPage() {
  // We'll use a container that will be filled after fetching
  const containerId = 'services-page-container';
  
  // Trigger the fetch after the initial render
  setTimeout(fetchServices, 0);

  async function fetchServices() {
    try {
      const response = await fetch('http://localhost:8000/services/');
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
      // Fallback or error message could be rendered here
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = `<p class="error-message">Unable to load services at this time. Please try again later.</p>`;
      }
    }
  }

  function formatCategoryLabel(catId) {
    const labels = {
      'printing': 'Printing Services',
      'id-docs': 'ID & Event Documentation',
      'finishing': 'Finishing',
      'preservation': 'Preservation'
    };
    return labels[catId] || catId.charAt(0).toUpperCase() + catId.slice(1);
  }

  function renderServices(categories) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <!-- SERVICES CATEGORIES -->
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
                  <p class="category-card-price">${item.price ? `Starts at ₱${item.price}` : ''}</p>
                  <a href="/contacts" data-link class="inquire-link">Inquire <span>→</span></a>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </section>
    `;
    
    // Trigger any global scroll reveal logic if necessary
    // (Assuming there's a global observer or similar)
  }

  return `
  <!-- PAGE HEADER -->
  <div class="page-header">
    <div class="page-header-inner">
      <p class="section-label reveal" data-delay="100">— What We Offer</p>
      <h1 class="page-title reveal" data-delay="250">Our Services</h1>
      <p class="page-subtitle reveal" data-delay="400">From everyday prints to special event documentation — we've got you covered.</p>
    </div>
  </div>

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
  `;
}
