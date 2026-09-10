// Masked number rise: tweens textContent from 0 to the target while the CSS mask
// (.count-mask, css/main.css:748) reveals the element. Called by the reveal engine
// (scroll-animations.js) once the element's group -- or the element itself, if it is
// a standalone [data-count-to] -- enters the viewport.
const DURATION = 1200;
const formatter = new Intl.NumberFormat('it-IT');

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function tweenCount(el, delay = 0) {
  const target = Number(el.dataset.countTo);
  if (!Number.isFinite(target)) return;
  const suffix = el.dataset.countSuffix || '';
  const finalText = `${formatter.format(target)}${suffix}`;

  // Sits behind the mask until the rise starts, so this reset is never seen.
  el.textContent = `${formatter.format(0)}${suffix}`;

  const run = () => {
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION, 1);
      if (progress >= 1) {
        el.textContent = finalText;
        return;
      }
      el.textContent = `${formatter.format(Math.round(target * easeOutCubic(progress)))}${suffix}`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (delay > 0) {
    setTimeout(run, delay);
  } else {
    run();
  }
}
