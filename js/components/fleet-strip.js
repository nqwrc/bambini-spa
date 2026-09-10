import { FLEET, photoUrl } from '../data/fleet.js';

// #fleet-strip (index.html:152). Renders the fleet cards, then wires the prev/next
// buttons and the bar pagination. Cards carry data-reveal, and the track they sit in
// already carries data-reveal-group in the markup, so the shared reveal engine
// (scroll-animations.js) picks the whole thing up as long as this runs first -- see
// the call order in main.js.
export function initFleetStrip() {
  const track = document.querySelector('[data-fleet-track]');
  if (!track) return;

  track.innerHTML = FLEET.map((v) => `
    <li class="fleet-card" data-reveal>
      <a class="fleet-card__link" href="vessel-detail.html?v=${v.slug}">
        <div class="fleet-card__media">
          <img src="${photoUrl(v, 1, 'sm')}" alt="${v.name}" loading="lazy">
        </div>
        <div class="fleet-card__body">
          <p class="fleet-card__class">${v.cls}</p>
          <h3 class="fleet-card__name">${v.name}</h3>
          <dl class="fleet-card__specs">
            <div><dt>Lunghezza</dt><dd>${v.loa.toLocaleString('it-IT')} m</dd></div>
            <div><dt>Velocità</dt><dd>${v.speed} nodi</dd></div>
            <div><dt>Passeggeri</dt><dd>${v.pax}</dd></div>
          </dl>
        </div>
      </a>
    </li>
  `).join('');

  const prevBtn = document.querySelector('[data-fleet-prev]');
  const nextBtn = document.querySelector('[data-fleet-next]');
  const pagination = document.querySelector('[data-fleet-pagination]');
  if (!prevBtn || !nextBtn || !pagination) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reduced ? 'auto' : 'smooth';
  // The track's own left padding (var(--edge)) so a "next" scroll lands the next
  // card flush against it instead of overshooting by that margin. Every consumer
  // below (prev/next, the bar count, the bar targets, the current-bar readout)
  // shares this one step so they can never disagree on where a "page" ends.
  const edge = () => parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
  const step = () => Math.max(1, track.clientWidth - edge());
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
  // Bar dots are capped so they never wrap onto extra rows: a long strip on a
  // narrow screen gets a handful of dots spread across the full scroll range
  // instead of one dot per step.
  const maxDots = () => (window.matchMedia('(min-width: 768px)').matches ? 8 : 5);

  const updateNav = () => {
    prevBtn.disabled = track.scrollLeft <= 1;
    nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  };

  // pageCount is the true number of physical steps end to end; dotCount is how
  // many of those are actually drawn. When they differ, a dot stands in for a
  // small run of steps, spread evenly so the first and last dot always line up
  // with the first and last step.
  let pageCount = 1;
  let dotCount = 1;

  const pageForDot = (i) => (dotCount <= 1 ? 0 : Math.round((i / (dotCount - 1)) * (pageCount - 1)));
  const dotTarget = (i) => Math.min(pageForDot(i) * step(), maxScroll());

  const updateCurrentPage = () => {
    const max = maxScroll();
    const page = max <= 0 ? 0
      : track.scrollLeft >= max - 1 ? pageCount - 1
      : Math.min(pageCount - 1, Math.round(track.scrollLeft / step()));
    const current = dotCount <= 1 ? 0 : Math.round((page / (pageCount - 1)) * (dotCount - 1));
    pagination.querySelectorAll('[data-fleet-page]').forEach((btn, i) => {
      if (i === current) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
  };

  const buildPagination = () => {
    pageCount = Math.max(1, Math.ceil(maxScroll() / step()) + 1);
    dotCount = Math.min(pageCount, maxDots());
    pagination.innerHTML = Array.from({ length: dotCount }, (_, i) => `
      <button type="button" class="fleet-strip__bar" data-fleet-page="${i}" aria-label="Pagina ${i + 1} di ${dotCount}"></button>
    `).join('');
    pagination.querySelectorAll('[data-fleet-page]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.fleetPage);
        track.scrollTo({ left: dotTarget(i), behavior: scrollBehavior });
      });
    });
    updateCurrentPage();
  };

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateNav();
      updateCurrentPage();
      ticking = false;
    });
  }, { passive: true });

  window.addEventListener('resize', () => {
    buildPagination();
    updateNav();
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -step(), behavior: scrollBehavior });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: step(), behavior: scrollBehavior });
  });

  buildPagination();
  updateNav();
}
