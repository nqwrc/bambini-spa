// Motion engine: reveals, staggered groups and the header shrink.
// Hidden starting states in CSS (css/main.css:1279-1340) apply only when <html> has
// .has-motion, which is added below -- and only when the visitor has not asked for
// reduced motion. Without that class, or without JS, every element sits in its final
// state already, since that's what the markup contains.
import { tweenCount } from './counters.js';

const REVEAL_OPTIONS = { threshold: 0.2, rootMargin: '0px 0px -10% 0px' };
const COUNT_OPTIONS = { threshold: 0.4 };

export function initScrollAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced) {
    document.documentElement.classList.add('has-motion');
    initStandaloneReveals();
    initRevealGroups();
    initStandaloneCounters();
  }

  // The shrink itself has no motion to skip: CSS just drops its transition under reduce.
  initHeaderShrink();
}

// [data-reveal] elements that are not inside a [data-reveal-group] (section titles,
// .band__line): each observed on its own, fires once.
function initStandaloneReveals() {
  const targets = Array.from(document.querySelectorAll('[data-reveal]'))
    .filter((el) => !el.closest('[data-reveal-group]'));
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, REVEAL_OPTIONS);

  targets.forEach((el) => observer.observe(el));
}

// [data-reveal-group]: the GROUP is observed, not its children. Before it intersects,
// --reveal-i is stamped on each [data-reveal] descendant and, separately, on each
// [data-count-to] descendant (CSS staggers 60ms/80ms per index off that var). On
// intersect the group gets .is-in once, and its counters start ticking.
function initRevealGroups() {
  const groups = document.querySelectorAll('[data-reveal-group]');
  if (!groups.length) return;

  const countsByGroup = new Map();
  groups.forEach((group) => {
    group.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--reveal-i', i));
    const counts = Array.from(group.querySelectorAll('[data-count-to]'));
    counts.forEach((el, i) => el.style.setProperty('--reveal-i', i));
    countsByGroup.set(group, counts);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const group = entry.target;
      group.classList.add('is-in');
      observer.unobserve(group);
      countsByGroup.get(group).forEach((el, i) => tweenCount(el, i * 80));
    });
  }, REVEAL_OPTIONS);

  groups.forEach((group) => observer.observe(group));
}

// A [data-count-to] that isn't inside a [data-reveal-group] is observed on its own
// and gets .is-in directly (none exist on the home page today, but the contract
// covers the case).
function initStandaloneCounters() {
  const targets = Array.from(document.querySelectorAll('[data-count-to]'))
    .filter((el) => !el.closest('[data-reveal-group]'));
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
      tweenCount(entry.target, 0);
    });
  }, COUNT_OPTIONS);

  targets.forEach((el) => observer.observe(el));
}

// [data-header-shrink] is header.site-header (js/components/header.js), so this must
// run after renderHeader(). Toggles .is-shrunk past 24px of scroll, rAF-throttled.
function initHeaderShrink() {
  const header = document.querySelector('[data-header-shrink]');
  if (!header) return;

  let ticking = false;
  const apply = () => {
    header.classList.toggle('is-shrunk', window.scrollY > 24);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  }, { passive: true });

  apply();
}
