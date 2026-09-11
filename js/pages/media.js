import { FLEET, photoUrl } from '../data/fleet.js';

// Operation photos that are not part of the fleet catalogue (public/img/servizi/).
// Captions match the ones already used for these same photos on servizi.html.
const OPERATIONS = [
  { src: './img/servizi/blue-brother-wide.jpg', caption: 'FSIV Blue Brother in navigazione', vesselSlug: 'blue-brother', vesselLabel: 'Blue Brother' },
  { src: './img/servizi/crew-transfer-basket.jpg', caption: 'Trasferimento del personale con basket — Blue Mommy', vesselSlug: 'blue-mommy', vesselLabel: 'Blue Mommy' },
  { src: './img/servizi/fifi.jpg', caption: 'Impianto antincendio di bordo in funzione (classe FiFi1)' },
];

const CATEGORIES = [
  { id: 'all', label: 'Tutte' },
  { id: 'fsiv', label: 'FSIV' },
  { id: 'crew', label: 'Crew Boat' },
  { id: 'utility', label: 'Utility' },
  { id: 'operazioni', label: 'Operazioni' },
];

const CHIP = 'media-chip px-5 py-2 rounded-full border text-xs uppercase tracking-wider font-label-lg transition-colors cursor-pointer';
const CHIP_IDLE = ['border-outline-variant', 'text-on-surface-variant', 'hover:border-primary', 'hover:text-primary'];
const CHIP_ON = ['border-primary', 'bg-primary', 'text-white'];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Every real photo of the fleet (photoUrl(v, n) for n = 1..v.photos) plus the operation photos.
function buildItems() {
  const items = [];
  FLEET.forEach((v) => {
    for (let n = 1; n <= v.photos; n += 1) {
      items.push({
        src: photoUrl(v, n),
        category: v.category,
        caption: v.photos > 1 ? `${v.name} — ${v.cls} (foto ${n})` : `${v.name} — ${v.cls}`,
        vesselSlug: v.slug,
        vesselLabel: v.name,
      });
    }
  });
  OPERATIONS.forEach((op) => items.push({ ...op, category: 'operazioni' }));
  return items;
}

function galleryItem(item, index) {
  return `
    <button type="button" data-index="${index}" data-category="${item.category}"
            class="media-item block w-full mb-4 break-inside-avoid rounded-lg overflow-hidden border border-outline-variant bg-white cursor-zoom-in group focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
      <img src="${item.src}" alt="${esc(item.caption)}" loading="lazy" class="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.03]"/>
    </button>`;
}

function initFilters(items, grid, bar) {
  bar.innerHTML = CATEGORIES.map(({ id, label }) => {
    const n = id === 'all' ? items.length : items.filter((it) => it.category === id).length;
    return `<button type="button" data-category="${id}" class="${CHIP} ${(id === 'all' ? CHIP_ON : CHIP_IDLE).join(' ')}">${label} <span class="font-semibold">${n}</span></button>`;
  }).join('');

  const itemButtons = Array.from(grid.querySelectorAll('.media-item'));
  let category = 'all';

  const apply = () => {
    itemButtons.forEach((btn) => {
      btn.hidden = !(category === 'all' || btn.dataset.category === category);
    });
  };

  bar.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-category]');
    if (!chip) return;
    category = chip.dataset.category;
    bar.querySelectorAll('[data-category]').forEach((b) => {
      const on = b === chip;
      b.classList.remove(...(on ? CHIP_IDLE : CHIP_ON));
      b.classList.add(...(on ? CHIP_ON : CHIP_IDLE));
    });
    apply();
  });
}

// Accessible lightbox: button triggers, Esc closes, arrow keys navigate the
// currently visible (filtered) items, focus returns to the trigger on close.
function initLightbox(items, grid) {
  const lightbox = document.getElementById('media-lightbox');
  const img = document.getElementById('media-lightbox-img');
  const caption = document.getElementById('media-lightbox-caption');
  const link = document.getElementById('media-lightbox-link');
  const linkLabel = document.getElementById('media-lightbox-link-label');
  const closeBtn = document.getElementById('media-lightbox-close');
  const prevBtn = document.getElementById('media-lightbox-prev');
  const nextBtn = document.getElementById('media-lightbox-next');
  if (!lightbox || !img || !caption || !link || !linkLabel || !closeBtn || !prevBtn || !nextBtn) return;

  let trigger = null;
  let currentIndex = -1;

  const visibleButtons = () => Array.from(grid.querySelectorAll('.media-item')).filter((b) => !b.hidden);

  // Tabbing past the lightbox's own controls must not reach the header, the
  // page content or the cookie banner behind the overlay: inert everything
  // else in <body> while it is open, instead of hand-tracking a tab loop.
  function setBackgroundInert(isInert) {
    Array.from(document.body.children).forEach((el) => {
      if (el === lightbox) return;
      if (isInert) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }

  function show(index) {
    const item = items[index];
    currentIndex = index;
    img.src = item.src;
    img.alt = item.caption;
    caption.textContent = item.caption;
    if (item.vesselSlug) {
      link.href = `vessel-detail.html?v=${item.vesselSlug}`;
      link.classList.remove('hidden');
      linkLabel.textContent = `Scheda ${item.vesselLabel}`;
    } else {
      link.classList.add('hidden');
    }
  }

  function open(index, fromTrigger) {
    trigger = fromTrigger;
    show(index);
    lightbox.style.display = 'flex';
    document.body.classList.add('overflow-hidden');
    setBackgroundInert(true);
    closeBtn.focus();
  }

  function close() {
    lightbox.style.display = 'none';
    document.body.classList.remove('overflow-hidden');
    setBackgroundInert(false);
    if (trigger) trigger.focus();
    trigger = null;
  }

  function step(delta) {
    const visible = visibleButtons();
    if (!visible.length) return;
    const indices = visible.map((b) => Number(b.dataset.index));
    const pos = indices.indexOf(currentIndex);
    const nextPos = (pos + delta + indices.length) % indices.length;
    open(indices[nextPos], visible[nextPos]);
  }

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.media-item');
    if (!btn) return;
    open(Number(btn.dataset.index), btn);
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
}

// Same convention as the home hero (js/components/hero-video.js): plays
// ./video/hero-drone.mp4 if it exists (HEAD check, content-type video/*),
// otherwise the poster photo stays with an honest caption.
function initVideoSlot() {
  const section = document.querySelector('[data-video-poster]');
  const captionEl = document.getElementById('media-video-caption');
  if (!section) return;
  // Under reduced motion the video is still offered, but paused with controls,
  // so the visitor chooses to play it.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const src = './video/hero-drone.mp4';
  fetch(src, { method: 'HEAD' })
    .then((res) => {
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.startsWith('video/')) return;

      const video = document.createElement('video');
      Object.assign(video, { src, muted: true, loop: true, playsInline: true, autoplay: !reduceMotion, controls: reduceMotion });
      video.className = 'absolute inset-0 w-full h-full object-cover';
      if (reduceMotion) {
        video.setAttribute('aria-label', 'Riprese aeree della flotta');
        video.classList.add('z-10');
      } else {
        video.setAttribute('aria-hidden', 'true');
      }
      section.prepend(video);
      if (captionEl) captionEl.textContent = 'Riprese aeree della flotta.';
    })
    .catch(() => {});
}

export function initMedia() {
  const grid = document.getElementById('media-gallery');
  const bar = document.getElementById('media-filters');
  if (!grid || !bar) return;

  const items = buildItems();
  grid.innerHTML = items.map(galleryItem).join('');

  initFilters(items, grid, bar);
  initLightbox(items, grid);
  initVideoSlot();
}
