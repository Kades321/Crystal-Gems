import { renderFooter } from '../components/footer.js';

export function servicesPage() {
  const categories = [
    {
      id: 'printing',
      label: 'Printing Services',
      items: [
        { title: 'T-Shirt Printing', desc: 'Custom full-color prints on any shirt style. Perfect for teams, events, and giveaways. Minimum order of 5 pieces.', tag: 'Popular' },
        { title: 'Photo Printing', desc: 'Standard 4R, 5R, and custom sizes. Professional color calibration on premium glossy or matte paper.', tag: null },
        { title: 'Large Format', desc: 'Tarpaulins, posters, and banners up to 10ft wide. Weatherproof materials available.', tag: 'New' },
      ]
    },
    {
      id: 'id-docs',
      label: 'ID & Event Documentation',
      items: [
        { title: 'Passport & Visa Photos', desc: 'Government-compliant passport photos. Printed and ready in 15 minutes.', tag: 'Fast' },
        { title: 'School & Company IDs', desc: 'PVC card printing with custom layouts. Laminated, durable, and professional.', tag: null },
        { title: 'Event Photo Booths', desc: 'On-site instant print photo booths for events. Includes backdrop, props, and operator.', tag: null },
      ]
    },
    {
      id: 'finishing',
      label: 'Finishing',
      items: [
        { title: 'Lamination', desc: 'Cold and hot lamination in glossy or matte finish for photos, certificates, and documents.', tag: null },
        { title: 'Framing', desc: 'Custom wood and metal frames in various sizes. Gallery-quality mounting available.', tag: null },
      ]
    },
    {
      id: 'preservation',
      label: 'Preservation',
      items: [
        { title: 'Photo Restoration', desc: 'Restore damaged, faded, or torn old photos using digital restoration techniques.', tag: null },
        { title: 'Archival Scanning', desc: 'High-resolution scanning and digital archiving of physical photos and documents.', tag: null },
      ]
    },
  ];

  return `
  <!-- PAGE HEADER -->
  <div class="page-header">
    <div class="page-header-inner">
      <p class="section-label reveal" data-delay="100">— What We Offer</p>
      <h1 class="page-title reveal" data-delay="250">Our Services</h1>
      <p class="page-subtitle reveal" data-delay="400">From everyday prints to special event documentation — we've got you covered.</p>
    </div>
  </div>

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
              <p class="category-card-body">${item.desc}</p>
              <a href="/contacts" data-link class="inquire-link">Inquire <span>→</span></a>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('')}
  </section>

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
