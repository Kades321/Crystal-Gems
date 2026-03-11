import { landingPage } from './pages/landing.js';
import { servicesPage } from './pages/services.js';
import { aboutPage } from './pages/about.js';
import { contactsPage } from './pages/contacts.js';

const routes = {
  '/': landingPage,
  '/services': servicesPage,
  '/about': aboutPage,
  '/contacts': contactsPage,
};

function getActiveNav(path) {
  document.querySelectorAll('.nav-link').forEach(el => {
    el.classList.toggle('active', el.getAttribute('href') === path);
  });
}

function render(path) {
  const page = routes[path] || routes['/'];
  const app = document.getElementById('app');
  app.innerHTML = page();
  getActiveNav(path);
  window.scrollTo(0, 0);
  // Trigger reveal animations
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el, i) => {
        const delay = el.dataset.delay || i * 60;
        setTimeout(() => el.classList.add('visible'), Number(delay));
      });
    }, 50);
  });
  // Scroll reveal for deeper elements
  initScrollReveal();
}

export function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        setTimeout(() => e.target.classList.add('visible'), Number(delay));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

export const router = {
  init() {
    render(window.location.pathname);
    window.addEventListener('popstate', () => render(window.location.pathname));
  },
  navigate(path) {
    history.pushState(null, '', path);
    render(path);
  }
};
