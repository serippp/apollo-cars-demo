const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const navLinks = navigation.querySelectorAll('a');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

menuButton.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) setMenu(false);
});

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px' });

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('.list-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.pack-card');
    const expanded = card.classList.toggle('expanded');
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Mostrar menos' : 'Ver todos os serviços';
  });
});

const modal = document.querySelector('#gallery-modal');
const modalImage = modal.querySelector('img');
const modalCaption = modal.querySelector('p');
const closeModal = modal.querySelector('.lightbox-close');

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    modalImage.src = item.dataset.image;
    modalImage.alt = item.querySelector('img').alt;
    modalCaption.textContent = item.dataset.caption;
    modal.showModal();
  });
});

closeModal.addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
