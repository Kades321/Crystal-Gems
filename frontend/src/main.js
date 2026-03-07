import { router } from './router.js';
import { renderNav } from './components/nav.js';

// Mount nav
document.getElementById('nav-root').innerHTML = renderNav();

// Init router
router.init();

// Nav scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Active nav link
document.addEventListener('click', e => {
  const link = e.target.closest('[data-link]');
  if (link) {
    e.preventDefault();
    const path = link.getAttribute('href') || link.dataset.href;
    router.navigate(path);
  }
});
