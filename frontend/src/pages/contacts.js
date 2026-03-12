import { renderFooter } from '../components/footer.js';

export function contactsPage() {
  window.submitContactForm = async (btn) => {
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const formData = {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value || null,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/contacts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to send message');

      btn.textContent = 'Message Sent ✓';
      btn.style.background = 'var(--accent)';

      // Reset form
      document.querySelectorAll('.form-input, .form-select').forEach(el => el.value = '');

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      btn.textContent = 'Error! Try Again';
      btn.style.background = '#e74c3c';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }
  };

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
        <form class="contact-form" onsubmit="event.preventDefault(); window.submitContactForm(this.querySelector('.btn-primary'))">
          <div class="form-row-2">
            <div class="form-row">
              <label class="form-label">First Name</label>
              <input type="text" id="first_name" class="form-input" placeholder="Juan" required />
            </div>
            <div class="form-row">
              <label class="form-label">Last Name</label>
              <input type="text" id="last_name" class="form-input" placeholder="dela Cruz" required />
            </div>
          </div>
          <div class="form-row">
            <label class="form-label">Email Address</label>
            <input type="email" id="email" class="form-input" placeholder="juan@email.com" required />
          </div>
          <div class="form-row">
            <label class="form-label">Phone Number (optional)</label>
            <input type="tel" id="phone" class="form-input" placeholder="+63 9XX XXX XXXX" />
          </div>
          <div class="form-row">
            <label class="form-label">Service Needed</label>
            <select id="service" class="form-select" required>
              <option value="">Select a service...</option>
              <option value="Photo Printing">Photo Printing</option>
              <option value="T-Shirt Printing">T-Shirt Printing</option>
              <option value="ID Documentation">ID Documentation</option>
              <option value="Event Photography">Event Photography</option>
              <option value="Finishing & Lamination">Finishing & Lamination</option>
              <option value="Preservation">Preservation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="form-row">
            <label class="form-label">Message</label>
            <textarea id="message" class="form-input form-textarea" rows="5" placeholder="Describe your project or inquiry..." required></textarea>
          </div>
          <button type="submit" class="btn-primary" style="margin-top:.5rem;">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  ${renderFooter()}
  `;
}
