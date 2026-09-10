import { ROLES } from '../data/careers.js';

const AREAS = [
  { id: 'all', label: 'Tutte' },
  { id: 'bordo', label: 'A bordo' },
  { id: 'terra', label: 'A terra' },
];

const CHIP = 'careers-chip px-5 py-2 rounded-full border text-xs uppercase tracking-wider font-label-lg transition-colors cursor-pointer';
const CHIP_IDLE = ['border-outline-variant', 'text-on-surface-variant', 'hover:border-primary', 'hover:text-primary'];
const CHIP_ON = ['border-primary', 'bg-primary', 'text-white'];

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function roleItem(role) {
  const onBoard = role.area === 'bordo';
  return `
    <details class="career-role group border border-outline-variant rounded-lg bg-white open:shadow-md transition-shadow" data-area="${role.area}">
      <summary class="flex flex-wrap items-center gap-x-6 gap-y-2 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span class="flex-1 min-w-[14rem] font-headline-md text-lg text-primary">${esc(role.title_it)}</span>
        <span class="text-xs text-on-surface-variant inline-flex items-center gap-1">
          <span class="material-symbols-outlined text-sm">location_on</span>${esc(role.location)}
        </span>
        <span class="text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${onBoard ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}">${onBoard ? 'A bordo' : 'A terra'}</span>
        <span class="material-symbols-outlined text-primary transition-transform duration-300 group-open:rotate-180">expand_more</span>
      </summary>
      <div class="px-5 pb-6 pt-5 grid md:grid-cols-3 gap-6 text-sm border-t border-outline-variant/60">
        <p class="md:col-span-2 text-on-surface-variant leading-relaxed">${esc(role.description_it)}</p>
        <dl class="space-y-3 text-xs">
          <div>
            <dt class="uppercase tracking-wider text-on-surface-variant mb-0.5">Requisiti</dt>
            <dd class="text-primary font-medium leading-relaxed">${esc(role.requirements_it)}</dd>
          </div>
          <div>
            <dt class="uppercase tracking-wider text-on-surface-variant mb-0.5">Contratto</dt>
            <dd class="text-primary font-medium">${esc(role.contract)}</dd>
          </div>
        </dl>
        <div class="md:col-span-3">
          <a href="#apply-form" data-apply="${esc(role.title_it)}" class="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded font-label-lg text-xs uppercase tracking-wider hover:bg-primary-container transition-colors">
            Candidati <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </details>`;
}

function departments() {
  const order = [];
  for (const role of ROLES) if (!order.includes(role.department)) order.push(role.department);
  return order;
}

export function initCareers() {
  const list = document.getElementById('careers-list');
  const chips = document.getElementById('careers-areas');
  const deptSelect = document.getElementById('careers-dept');
  const count = document.getElementById('careers-count');
  const positionSelect = document.getElementById('position-select');
  if (!list || !chips || !deptSelect) return;

  const depts = departments();

  list.innerHTML = depts.map((dept) => `
    <section class="careers-group" data-dept="${esc(dept)}">
      <h3 class="flex items-baseline gap-3 text-xs uppercase tracking-widest text-primary font-bold mb-3">
        ${esc(dept)} <span class="careers-group-count text-on-surface-variant font-medium"></span>
      </h3>
      <div class="space-y-3">${ROLES.filter((r) => r.department === dept).map(roleItem).join('')}</div>
    </section>`).join('');

  chips.innerHTML = AREAS.map(({ id, label }) => {
    const n = id === 'all' ? ROLES.length : ROLES.filter((r) => r.area === id).length;
    return `<button type="button" data-area="${id}" class="${CHIP} ${(id === 'all' ? CHIP_ON : CHIP_IDLE).join(' ')}">${label} <span class="opacity-70">${n}</span></button>`;
  }).join('');

  deptSelect.innerHTML = `<option value="all">Tutti i reparti</option>${depts.map((d) => `<option value="${esc(d)}">${esc(d)}</option>`).join('')}`;

  if (positionSelect) {
    positionSelect.insertAdjacentHTML('beforeend', ROLES.map((r) => `<option value="${esc(r.title_it)}">${esc(r.title_it)}</option>`).join(''));
  }

  let area = 'all';
  const apply = () => {
    const dept = deptSelect.value;
    let visible = 0;
    list.querySelectorAll('.careers-group').forEach((group) => {
      const deptMatch = dept === 'all' || group.dataset.dept === dept;
      let shown = 0;
      group.querySelectorAll('.career-role').forEach((item) => {
        const on = deptMatch && (area === 'all' || item.dataset.area === area);
        item.hidden = !on;
        if (on) shown += 1;
      });
      group.hidden = shown === 0;
      group.querySelector('.careers-group-count').textContent = shown;
      visible += shown;
    });
    if (count) count.textContent = `${visible} ${visible === 1 ? 'posizione' : 'posizioni'}`;
  };

  chips.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-area]');
    if (!btn) return;
    area = btn.dataset.area;
    chips.querySelectorAll('[data-area]').forEach((b) => {
      const on = b === btn;
      b.classList.remove(...(on ? CHIP_IDLE : CHIP_ON));
      b.classList.add(...(on ? CHIP_ON : CHIP_IDLE));
    });
    apply();
  });
  deptSelect.addEventListener('change', apply);

  list.addEventListener('click', (e) => {
    const link = e.target.closest('[data-apply]');
    if (link && positionSelect) positionSelect.value = link.dataset.apply;
  });

  apply();
}
