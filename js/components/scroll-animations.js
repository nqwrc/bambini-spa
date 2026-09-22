// One IntersectionObserver for every scroll-driven effect.
// Elements opt in with data-reveal (fade/translate) or data-count (number count-up);
// nothing animates by default, so each animated block is a deliberate choice.
import { countUp } from './counter.js';

export function initScrollAnimations() {
  const targets = document.querySelectorAll('[data-reveal], [data-count]');

  // Without IntersectionObserver (very old browsers) show everything at once.
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => {
      el.classList.add('is-in');
      if (el.dataset.count !== undefined) countUp(el, { instant: true });
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-in');
        if (el.dataset.count !== undefined) countUp(el);
        observer.unobserve(el); // each effect runs once
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  targets.forEach((el) => observer.observe(el));

  // Pages render cards from JSON after this runs (fleet grid, department cards):
  // watch the DOM so elements added later are observed too, instead of staying at opacity 0.
  new MutationObserver((mutations) => {
    mutations.forEach((m) =>
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const els = node.matches('[data-reveal], [data-count]') ? [node] : [];
        els.push(...node.querySelectorAll('[data-reveal], [data-count]'));
        els.forEach((el) => observer.observe(el));
      })
    );
  }).observe(document.body, { childList: true, subtree: true });
}
