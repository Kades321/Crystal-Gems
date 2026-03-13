export function renderNav() {
  return `
  <nav id="main-nav">
    <a href="/" class="nav-logo" data-link>
  <img src="/logo.png" alt="Rhett's" style="height: 65px; width: auto;" />
      </a>
    <ul class="nav-links">
      <li><a href="/" data-link class="nav-link">Home</a></li>
      <li><a href="/services" data-link class="nav-link">Services</a></li>
      <li><a href="/about" data-link class="nav-link">About</a></li>
      <li><a href="/contacts" data-link class="nav-link">Contact</a></li>
    </ul>
    <a href="/contacts" data-link class="btn-primary nav-cta">Inquire Now</a>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="nav-mobile-menu" id="nav-mobile">
    <ul>
      <li><a href="/" data-link>Home</a></li>
      <li><a href="/services" data-link>Services</a></li>
      <li><a href="/about" data-link>About</a></li>
      <li><a href="/contacts" data-link>Contact</a></li>
    </ul>
  </div>`;
}

// Hamburger toggle (called after DOM mount) y
document.addEventListener('click', e => {
  if (e.target.closest('#nav-hamburger')) {
    document.getElementById('nav-mobile')?.classList.toggle('open');
    document.getElementById('nav-hamburger')?.classList.toggle('open');
  }
  if (e.target.closest('[data-link]')) {
    document.getElementById('nav-mobile')?.classList.remove('open');
    document.getElementById('nav-hamburger')?.classList.remove('open');
  }
});
