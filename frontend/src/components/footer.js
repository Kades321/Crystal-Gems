export function renderFooter() {
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-brand-col">
        <img src="/logo.png" alt="Rhett's" style="height: 60px; width: auto; opacity: 0.9;" />
        <p class="footer-tagline">Printing your memories<br>since day one.</p>
        <div class="footer-socials">
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-links-col">
        <div class="footer-col">
          <p class="footer-col-title">Company</p>
          <ul>
            <li><a href="/" data-link>Home</a></li>
            <li><a href="/about" data-link>About Us</a></li>
            <li><a href="/contacts" data-link>Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title">Services</p>
          <ul>
            <li><a href="/services" data-link>Printing</a></li>
            <li><a href="/services" data-link>Photography</a></li>
            <li><a href="/services" data-link>T-Shirts</a></li>
            <li><a href="/services" data-link>ID & Docs</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-newsletter-col">
        <p class="footer-col-title">Stay Updated</p>
        <p class="footer-newsletter-desc">Get the latest news and promos delivered to your inbox.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Your email address" class="newsletter-input" />
          <button class="btn-primary newsletter-btn">Subscribe</button>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© ${new Date().getFullYear()} Rhett's. All rights reserved.</p>
      <div class="footer-bottom-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </div>
  </footer>`;
}
