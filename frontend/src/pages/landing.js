import { renderFooter } from '../components/footer.js';

export function landingPage() {
  return `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-left">
      <p class="hero-eyebrow reveal" data-delay="100">Photography & Print Studio</p>
      <h1 class="hero-title reveal" data-delay="250">
        Print Your<br><em>Memories,</em><br>Keep Them<br>Forever
      </h1>
      <p class="hero-subtitle reveal" data-delay="400">
        Professional printing, framing, and photography services for your most treasured moments.
      </p>
      <div class="hero-cta-row reveal" data-delay="550">
        <a href="/services" data-link class="btn-primary">Explore Services</a>
        <a href="/about" data-link class="btn-ghost">About Us</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-photo-grid">
        <div class="photo-cell cell-1"></div>
        <div class="photo-cell cell-2"></div>
        <div class="photo-cell cell-3"></div>
        <div class="photo-cell cell-4"></div>
      </div>
    </div>
    <div class="hero-scroll-hint reveal" data-delay="900">
      <div class="scroll-line"></div>
      Scroll to explore
    </div>
  </section>

  <!-- MARQUEE -->
  <div class="marquee-wrap">
    <div class="marquee-track">
      ${[...Array(3)].map(() => `
        <span class="marquee-item">T-Shirt Printing <span class="marquee-dot"></span></span>
        <span class="marquee-item">Photo Printing <span class="marquee-dot"></span></span>
        <span class="marquee-item">ID Documentation <span class="marquee-dot"></span></span>
        <span class="marquee-item">Event Photography <span class="marquee-dot"></span></span>
        <span class="marquee-item">Finishing & Lamination <span class="marquee-dot"></span></span>
        <span class="marquee-item">Preservation Services <span class="marquee-dot"></span></span>
      `).join('')}
    </div>
  </div>

  <!-- ABOUT SECTION -->
  <section class="section about-section">
    <div class="about-grid">
      <div class="about-image scroll-reveal" data-delay="0">
        <div class="about-image-inner"></div>
        <span class="about-image-label">Rhett's Studio</span>
      </div>
      <div class="about-content">
        <p class="section-label scroll-reveal">— About Us</p>
        <span class="about-num scroll-reveal" data-delay="80">01</span>
        <h2 class="about-title scroll-reveal" data-delay="150">About the<br>Company</h2>
        <p class="about-body scroll-reveal" data-delay="220">
          We are a local print and photography studio dedicated to turning your most precious moments into lasting keepsakes. From professional ID photos to custom event documentation, we bring quality and care to every print.
        </p>
        <a href="/about" data-link class="about-link scroll-reveal" data-delay="300">Learn more about us</a>
      </div>
    </div>
  </section>

  <!-- WANT TO INQUIRE -->
  <section class="inquire-section">
    <div class="inquire-left">
      <span class="big-num">02</span>
      <p class="section-label">— Get In Touch</p>
      <h2 class="inquire-title scroll-reveal">Want to<br>Inquire?</h2>
      <p class="inquire-body scroll-reveal" data-delay="100">
        Have a project in mind? Whether it's a bulk order, event coverage, or something custom — we'd love to hear from you.
      </p>
      <a href="/contacts" data-link class="btn-primary scroll-reveal" data-delay="200">Send a Message</a>
    </div>
    <div class="inquire-right">
      <div class="quick-form scroll-reveal">
        <div class="form-row">
          <label class="form-label">Your Name</label>
          <input type="text" class="form-input" placeholder="Juan dela Cruz" />
        </div>
        <div class="form-row">
          <label class="form-label">Email Address</label>
          <input type="email" class="form-input" placeholder="juan@email.com" />
        </div>
        <div class="form-row">
          <label class="form-label">Service Needed</label>
          <select class="form-select">
            <option value="">Select a service...</option>
            <option>Photo Printing</option>
            <option>T-Shirt Printing</option>
            <option>ID Documentation</option>
            <option>Event Photography</option>
            <option>Finishing & Lamination</option>
            <option>Preservation</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label">Message</label>
          <textarea class="form-input form-textarea" placeholder="Tell us about your project..."></textarea>
        </div>
        <button class="btn-primary">Submit Inquiry</button>
      </div>
    </div>
  </section>

  <!-- WHAT WE OFFER -->
  <section class="section services-preview-section">
    <div class="services-header scroll-reveal">
      <div>
        <p class="section-label">— What We Offer</p>
        <h2 class="section-title">Our Services</h2>
      </div>
      <a href="/services" data-link class="btn-ghost">View All</a>
    </div>
    <div class="services-grid">
      ${[
        { num: '01', title: 'Photo Printing', desc: 'High-fidelity prints in a range of sizes. Standard, panoramic, and custom formats with premium paper options.', icon: 'camera' },
        { num: '02', title: 'T-Shirt Printing', desc: 'Custom shirt printing for teams, events, and personal use. Durable, vibrant, and fast turnaround.', icon: 'shirt' },
        { num: '03', title: 'ID Documentation', desc: 'Passport photos, school IDs, company IDs, and government-standard documentation with same-day processing.', icon: 'id' },
        { num: '04', title: 'Event Coverage', desc: 'On-site photography and instant print services for graduations, corporate events, and personal occasions.', icon: 'event' },
        { num: '05', title: 'Finishing & Lamination', desc: 'Protect and preserve your prints with professional finishing, lamination, and framing services.', icon: 'finish' },
        { num: '06', title: 'Preservation', desc: 'Restore and preserve old or damaged photos with our archival-quality preservation services.', icon: 'preserve' },
      ].map((s, i) => `
        <div class="service-card scroll-reveal" data-delay="${i * 80}">
          <p class="service-card-num">${s.num}</p>
          ${getServiceIcon(s.icon)}
          <h3 class="service-card-title">${s.title}</h3>
          <p class="service-card-body">${s.desc}</p>
          <a href="/services" data-link class="service-card-arrow">↗</a>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="cta-banner scroll-reveal">
    <div class="cta-banner-text">
      <em>Ready to preserve</em> your most treasured memories?
    </div>
    <div class="cta-banner-form">
      <input type="email" class="cta-input" placeholder="Enter your email" />
      <button class="cta-submit">Get Started</button>
    </div>
  </section>

  ${renderFooter()}
  `;
}

function getServiceIcon(type) {
  const icons = {
    camera: `<svg class="service-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="10" width="32" height="24" rx="2"/><circle cx="20" cy="22" r="6"/><circle cx="20" cy="22" r="2.5"/><path d="M14 10l2-4h8l2 4"/><circle cx="31" cy="16" r="1.5" fill="currentColor"/></svg>`,
    shirt: `<svg class="service-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 4l-10 8 4 2v22h24V14l4-2L26 4c0 0-2 4-6 4s-6-4-6-4z"/></svg>`,
    id: `<svg class="service-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="10" width="32" height="22" rx="2"/><circle cx="14" cy="21" r="4"/><path d="M22 17h10M22 22h8M22 27h6"/></svg>`,
    event: `<svg class="service-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 34L18 14l6 10 4-6 6 16H6z"/><circle cx="30" cy="12" r="5"/><circle cx="30" cy="12" r="2" fill="currentColor"/></svg>`,
    finish: `<svg class="service-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="6" width="28" height="28" rx="1"/><path d="M6 14h28M6 22h28"/><path d="M14 6v28"/></svg>`,
    preserve: `<svg class="service-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 4l14 6v10c0 8-6 14-14 16C12 34 6 28 6 20V10L20 4z"/><path d="M14 20l4 4 8-8"/></svg>`,
  };
  return icons[type] || '';
}
