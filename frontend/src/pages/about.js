import { renderFooter } from '../components/footer.js';

export function aboutPage() {
  const team = [
    { name: 'Rhett Santos', role: 'Founder & Lead Photographer' },
    { name: 'Maria Cruz', role: 'Print Production Specialist' },
    { name: 'Paolo Reyes', role: 'Graphic Designer' },
  ];

  return `
  <!-- PAGE HEADER -->
  <div class="page-header">
    <div class="page-header-inner">
      <p class="section-label reveal" data-delay="100">— Who We Are</p>
      <h1 class="page-title reveal" data-delay="250">About Us</h1>
    </div>
  </div>

  <!-- ABOUT HERO BLOCK -->
  <section class="section about-hero-block">
    <div class="about-hero-grid">
      <div class="about-hero-img scroll-reveal">
        <div class="about-hero-img-inner"></div>
      </div>
      <div class="about-hero-content">
        <p class="section-label scroll-reveal">— Our Story</p>
        <h2 class="section-title scroll-reveal" data-delay="80">
          About Rhett's<br>
        </h2>
        <p class="about-body scroll-reveal" data-delay="160">
          Rhett’s offers printing and photography services such as photo printing, custom T-shirt printing, ID documentation, event photography, and lamination. The business focuses on providing high-quality and reliable services to help customers print, preserve, and customize their memories and important documents.
        </p>
        <p class="about-body scroll-reveal" data-delay="220" style="margin-top:1rem;">
          Rhett’s is a small business created with the goal of providing quality products and good service to customers. The business started from a simple idea of making everyday needs more accessible and reliable for people in the community. Through dedication, hard work, and a focus on customer satisfaction, Rhett’s aims to grow and build trust with its customers. The business continues to improve its services while maintaining its core values of quality, honesty, and commitment.
        </p>
      </div>
    </div>
  </section>

  <!-- OPEN HOURS -->
  <section class="open-hours-section scroll-reveal">
    <div class="open-hours-inner">
      <div class="open-hours-header">
        <h2 class="section-title" style="color:var(--white)">Open Hours</h2>
      </div>
      <div class="hours-grid">
        ${[
          { day: 'Monday – Friday', time: '8:00 AM – 7:00 PM' },
          { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
          { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
          { day: 'Holidays', time: 'By appointment only' },
        ].map(h => `
          <div class="hours-row">
            <span class="hours-day">${h.day}</span>
            <span class="hours-divider"></span>
            <span class="hours-time">${h.time}</span>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- MEET THE TEAM -->
  <section class="section team-section">
    <div class="team-header scroll-reveal">
      <p class="section-label">— The People Behind the Prints</p>
      <h2 class="section-title">Meet the Team</h2>
    </div>
    <div class="team-grid">
      ${team.map((m, i) => `
        <div class="team-card scroll-reveal" data-delay="${i * 100}">
          <div class="team-avatar"></div>
          <h3 class="team-name">${m.name}</h3>
          <p class="team-role">${m.role}</p>
          <p class="team-bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum donec in efficitur leo.</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="cta-banner scroll-reveal">
    <div class="cta-banner-text"><em>Want to work with us?</em> We'd love to hear from you.</div>
    <a href="/contacts" data-link class="cta-submit" style="text-decoration:none;display:inline-block;padding:.85rem 2rem;white-space:nowrap;">Get In Touch</a>
  </section>

  ${renderFooter()}
  `;
}
