// SIMBIOZ ACADEMY — shared scripts

// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('is-visible'));
}

// Course filter (courses.html)
const tabs = document.querySelectorAll('.tabs .tab');
const courseCards = document.querySelectorAll('[data-level]');
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    const level = tab.dataset.filter;
    courseCards.forEach((card) => {
      card.style.display = (level === 'all' || card.dataset.level === level) ? '' : 'none';
    });
  });
});

// Application form: preselect course from ?course= and fake submit.
// NOTE: підключіть реальний бекенд (Odoo /website_form або email-сервіс)
// замість цього обробника перед публікацією.
const form = document.querySelector('.js-form');
if (form) {
  const courseSelect = form.querySelector('select[name="course"]');
  const preset = new URLSearchParams(window.location.search).get('course');
  if (courseSelect && preset) {
    [...courseSelect.options].forEach((o) => {
      if (o.value === preset) courseSelect.value = preset;
    });
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = form.querySelector('.form-success');
    if (success) success.classList.add('is-visible');
    form.querySelectorAll('input, select, textarea, button').forEach((el) => {
      if (el.type !== 'submit') el.disabled = true;
    });
  });
}
