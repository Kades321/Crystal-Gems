import { renderFooter } from '../components/footer.js';

export function contactsPage() {
  return `
  <!-- PAGE HEADER -->
  <div class="page-header">
    <div class="page-header-inner">
      <p class="section-label reveal" data-delay="100">— Reach Out</p>
      <h1 class="page-title reveal" data-delay="250">Get in Touch<br><em>Online</em></h1>
      <p class="page-subtitle reveal" data-delay="400">We'll get back to you as soon as possible.</p>
    </div>
  </div>

  <!-- CONTACT CONTENT -->
  <section class="section contact-section">
    <div class="contact-grid">

      <!-- LEFT: Info -->
      <div class="contact-info">
        <div class="contact-info-block scroll-reveal">
          <p class="section-label">— Find Us</p>
          <div class="contact-map-placeholder">
            <div class="map-inner">
              <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5" width="32" opacity="0.3"><path d="M20 4C14.48 4 10 8.48 10 14c0 8 10 22 10 22s10-14 10-22c0-5.52-4.48-10-10-10z"/><circle cx="20" cy="14" r="3"/></svg>
              <p>Map Placeholder</p>
            </div>
          </div>
        </div>

        <div class="contact-details scroll-reveal" data-delay="100">
          <div class="contact-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" class="contact-icon"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z"/></svg>
            <span>+1 (555) 123-4567</span>
          </div>
          <div class="contact-detail-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18" class="contact-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <span>rhetts@gmail.com</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Email Form -->
      <div class="contact-form-block scroll-reveal" data-delay="150">
        <p class="section-label">— Send a Message</p>
        <h2 class="section-title" style="margin-bottom:2.5rem;">Contact us<br>by Email</h2>
        <div class="contact-form">
          <div class="form-row-2">
            <div class="form-row">
              <label class="form-label">First Name</label>
              <input type="text" class="form-input" placeholder="Juan" />
            </div>
            <div class="form-row">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-input" placeholder="dela Cruz" />
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" placeholder="juan@email.com" />
          </div>
          <div class="form-row">
            <label class="form-label">Phone Number (optional)</label>
            <input type="tel" class="form-input" placeholder="+63 9XX XXX XXXX" />
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
              <option>Other</option>
            </select>
          </div>
          <div class="form-row">
            <label class="form-label">Message</label>
            <textarea class="form-input form-textarea" rows="5" placeholder="Describe your project or inquiry..."></textarea>
          </div>
          <button class="btn-primary" style="margin-top:.5rem;" onclick="this.textContent='Message Sent ✓';this.style.background='#444';setTimeout(()=>{this.textContent='Send Message';this.style.background='';},3000)">Send Message</button>
        </div>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;
}
