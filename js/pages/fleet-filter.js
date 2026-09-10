import { FLEET, FLEET_CATEGORIES, photoUrl, fmt } from '../data/fleet.js';

const BTN_BASE = 'fleet-filter-btn px-6 py-2 rounded-full border font-label-lg text-xs uppercase tracking-wider transition-colors cursor-pointer';
const BTN_IDLE = 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary';

function vesselCard(v) {
  const spec = (label, value) => `
    <div>
      <dt class="text-[10px] uppercase tracking-wider text-on-surface-variant">${label}</dt>
      <dd class="font-semibold text-primary">${value}</dd>
    </div>`;

  return `
    <article class="vessel-card bg-white border border-outline-variant rounded-lg overflow-hidden vessel-card-hover transition-all duration-300" data-category="${v.category}">
      <a href="vessel-detail.html?v=${v.slug}" class="block h-56 overflow-hidden relative bg-surface-container">
        <img src="${photoUrl(v, 1, 'sm')}" alt="${v.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"/>
        <span class="absolute top-3 left-3 bg-deep-sea/85 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">${v.cls}</span>
      </a>
      <div class="p-6">
        <h3 class="font-headline-md text-headline-md text-primary mb-4">${v.name}</h3>
        <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-6">
          ${spec('Lunghezza', `${fmt(v.loa)} m`)}
          ${spec('Velocità', `${v.speed} nodi`)}
          ${spec('Passeggeri', v.pax)}
          ${spec('Portata', `${v.cargo} t`)}
        </dl>
        <div class="flex flex-col gap-2.5">
          <a href="vessel-detail.html?v=${v.slug}" class="w-full py-2.5 border border-primary text-primary font-label-lg text-xs uppercase tracking-wider text-center rounded hover:bg-surface-container-low transition-colors inline-flex items-center justify-center gap-2">
            <span class="material-symbols-outlined text-sm">visibility</span> Scheda Nave
          </a>
          <a href="contatti.html" class="w-full py-2.5 bg-secondary text-white font-label-lg text-xs uppercase tracking-wider text-center rounded hover:opacity-90 transition-opacity">
            Richiedi Disponibilità
          </a>
        </div>
      </div>
    </article>`;
}

export function initFleetFilter() {
  const grid = document.getElementById('vessel-grid');
  const bar = document.getElementById('fleet-filters');
  if (!grid || !bar) return;

  grid.innerHTML = FLEET.map(vesselCard).join('');

  const buttons = [{ id: 'all', label: 'Tutte' }, ...FLEET_CATEGORIES].map(({ id, label }) => {
    const count = id === 'all' ? FLEET.length : FLEET.filter((v) => v.category === id).length;
    return `<button data-category="${id}" class="${BTN_BASE} ${id === 'all' ? 'border-primary active-tab' : BTN_IDLE}">${label} <span class="opacity-60">${count}</span></button>`;
  });
  bar.innerHTML = buttons.join('');

  const filterBtns = bar.querySelectorAll('.fleet-filter-btn');
  const vesselCards = grid.querySelectorAll('.vessel-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Toggle button styles
      filterBtns.forEach(b => {
        b.classList.remove('active-tab', 'border-primary');
        b.classList.add(...BTN_IDLE.split(' '));
      });
      btn.classList.add('active-tab', 'border-primary');
      btn.classList.remove(...BTN_IDLE.split(' '));

      // Filter cards with smooth opacity transition
      vesselCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}
