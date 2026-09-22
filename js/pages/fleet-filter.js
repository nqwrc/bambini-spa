// Fleet page: 17 cards rendered from data/fleet.json, filter chips with live counts,
// and the "ultimi ingressi e refit" table. Nothing on this page is hand-written data.
import fleet from '../../data/fleet.json';
import { countUp } from '../components/counter.js';

// A filter is a predicate over a vessel. Counts come from the same predicates,
// so a chip can never disagree with the grid.
const FILTERS = [
  { key: 'all', label: 'Tutte', test: () => true },
  { key: 'fsiv', label: 'FSIV', test: (v) => v.type === 'FSIV' },
  { key: 'crew', label: 'Crew boat', test: (v) => /crew/i.test(v.type) },
  { key: 'utility', label: 'Utility', test: (v) => /utility/i.test(v.type) },
  { key: 'dp2', label: 'DP2', test: (v) => v.dp === 2 },
  { key: 'dp1', label: 'DP1', test: (v) => v.dp === 1 },
  { key: 'fifi', label: 'FiFi1', test: (v) => v.fifi },
];

export const vesselClass = (v) =>
  [v.type, v.dp ? `DP${v.dp}` : null, v.fifi ? 'FiFi1' : null].filter(Boolean).join(' ');

const missing = (label) => `<span class="badge-missing">[${label}]</span>`;
const cell = (value, label) => (value === null || value === undefined ? missing(label) : value);

function card(v) {
  const cls = vesselClass(v);
  const photo = v.photo
    ? `<img src="${v.photo}" alt="${v.name}, ${cls}" loading="lazy" class="w-full h-full object-cover transition-transform duration-[var(--dur-fast)] group-hover:scale-[1.03]"/>`
    : `<div class="w-full h-full flex items-center justify-center text-white/70 text-xs p-4 text-center">[FOTO DA FORNIRE: ${v.name}]</div>`;
  // PIRIOU rule: one number per frame, on the photo. Speed is the number that sells an FSIV.
  const stat = v.speed !== null ? `<span class="absolute right-5 top-4 font-headline-md font-extrabold text-white text-lg tracking-[0.06em] drop-shadow">${v.speed} NODI</span>` : '';
  return `
    <article class="vessel-card group bg-white border border-outline-variant rounded-lg overflow-hidden vessel-card-hover" data-vessel="${v.id}" data-reveal>
      <a href="vessel-detail.html?id=${v.id}" class="block">
        <figure class="relative h-56 bg-deep-sea overflow-hidden">
          ${photo}${stat}
          <div class="absolute inset-x-0 bottom-0 h-24" style="background: linear-gradient(to top, rgba(13,38,64,0.85), transparent);"></div>
          <figcaption class="absolute left-5 bottom-4 font-headline-md font-extrabold uppercase tracking-[0.08em] text-white text-lg leading-tight drop-shadow">${cls} · ${v.name}</figcaption>
        </figure>
      </a>
      <div class="p-5 flex flex-col gap-3">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-headline-md text-headline-md text-primary" style="font-size: 20px; line-height: 28px;">${v.name}</h3>
          <span class="text-xs font-semibold text-on-surface-variant">${cls}</span>
        </div>
        <dl class="grid grid-cols-3 gap-2 text-xs text-on-surface-variant">
          <div><dt class="uppercase tracking-wider text-[10px]">LOA</dt><dd>${v.loa !== null ? `${v.loa.toFixed(2)} m` : missing('m')}</dd></div>
          <div><dt class="uppercase tracking-wider text-[10px]">Velocita</dt><dd>${v.speed !== null ? `${v.speed} nodi` : missing('nodi')}</dd></div>
          <div><dt class="uppercase tracking-wider text-[10px]">Pax</dt><dd>${cell(v.pax, 'pax')}</dd></div>
        </dl>
        <div class="flex gap-2">
          <a href="vessel-detail.html?id=${v.id}" class="flex-1 py-2.5 border border-primary text-primary font-label-lg text-xs uppercase tracking-wider text-center rounded hover:bg-surface-container-low transition-colors">Dettagli</a>
          <a href="contatti.html?to=ops" class="flex-1 py-2.5 bg-secondary text-on-secondary font-label-lg text-xs uppercase tracking-wider text-center rounded hover:brightness-110 transition-all">Disponibilita</a>
        </div>
      </div>
    </article>`;
}

function refitRow(v) {
  return `
    <tr class="border-b border-outline-variant">
      <td class="p-3 font-semibold text-primary whitespace-nowrap">${v.name}</td>
      <td class="p-3 whitespace-nowrap">${vesselClass(v)}</td>
      <td class="p-3">${cell(v.built, 'anno')}</td>
      <td class="p-3">${cell(v.lastRefit, 'refit')}</td>
      <td class="p-3">${cell(v.yard, 'cantiere')}</td>
      <td class="p-3">${cell(v.flag, 'bandiera')}</td>
      <td class="p-3">${cell(v.classSociety, 'classe')}</td>
    </tr>`;
}

export function initFleetFilter() {
  const grid = document.getElementById('vessel-grid');
  const bar = document.getElementById('fleet-filters');
  const shown = document.getElementById('fleet-shown');
  if (!grid || !bar) return;

  grid.innerHTML = fleet.map(card).join('');

  bar.innerHTML = FILTERS.map(
    (f) => `
      <button type="button" class="fleet-filter-btn inline-flex items-center gap-2 px-4 py-2 rounded-full border font-label-lg text-xs uppercase tracking-wider transition-colors" data-filter="${f.key}" aria-pressed="${f.key === 'all'}">
        ${f.label} <strong class="font-headline-md">${fleet.filter(f.test).length}</strong>
      </button>`
  ).join('');

  const table = document.getElementById('refit-table-body');
  if (table) {
    // Most recent refit first; vessels without a date keep the fleet order at the bottom.
    const sorted = [...fleet].sort((a, b) => (b.lastRefit ?? '').localeCompare(a.lastRefit ?? ''));
    table.innerHTML = sorted.map(refitRow).join('');
  }

  const apply = (key) => {
    const f = FILTERS.find((x) => x.key === key) ?? FILTERS[0];
    let visible = 0;
    fleet.forEach((v) => {
      const el = grid.querySelector(`[data-vessel="${v.id}"]`);
      const on = f.test(v);
      el.hidden = !on;
      if (on) visible += 1;
    });
    bar.querySelectorAll('.fleet-filter-btn').forEach((b) => {
      const active = b.dataset.filter === key;
      b.setAttribute('aria-pressed', String(active));
      b.classList.toggle('active-tab', active);
      b.classList.toggle('border-primary', active);
      b.classList.toggle('border-outline-variant', !active);
      b.classList.toggle('text-on-surface-variant', !active);
    });
    if (shown) {
      shown.dataset.count = String(visible);
      countUp(shown, { instant: false });
    }
  };

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.fleet-filter-btn');
    if (btn) apply(btn.dataset.filter);
  });

  apply('all');
}
