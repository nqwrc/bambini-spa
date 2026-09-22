// Count-up for numeric facts. Markup:
//   <span data-count="17">0</span>            integer
//   <span data-count="34.2" data-decimals="1">0</span>
//   <span data-count="60" data-suffix="+">0</span>
// The final value lives in the attribute, so the number is correct even if JS never runs
// (only the starting text is 0) and reduced-motion users see it immediately.

const DURATION = 700; // ms, the site-wide ceiling
const ease = (t) => 1 - Math.pow(1 - t, 3); // ease-out cubic, close to cubic-bezier(.2,.8,.2,1)

const reducedMotion = () =>
  window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function format(value, decimals) {
  // Italian formatting: comma as decimal separator, dot as thousands separator.
  return value.toLocaleString('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function countUp(el, { instant = false } = {}) {
  const target = Number(el.dataset.count);
  if (Number.isNaN(target)) return;
  const decimals = Number(el.dataset.decimals ?? 0);
  const suffix = el.dataset.suffix ?? '';
  const render = (v) => {
    el.textContent = format(v, decimals) + suffix;
  };

  if (instant || reducedMotion()) {
    render(target);
    return;
  }

  const start = performance.now();
  const step = (now) => {
    const t = Math.min(1, (now - start) / DURATION);
    render(target * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else render(target);
  };
  requestAnimationFrame(step);
}
