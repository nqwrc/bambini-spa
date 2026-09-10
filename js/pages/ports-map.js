import { MAP_PINS } from '../data/map-pins.js';

const REGIONS = [
  { id: 'adriatico', label: 'Adriatico' },
  { id: 'mediterraneo', label: 'Mediterraneo centrale' },
  { id: 'africa-occidentale', label: 'Africa Occidentale' },
  { id: 'africa-centrale', label: 'Africa Centrale' },
];

// The Adriatic ports sit a few pixels apart on the continental map, so there
// only the HQ stands for them; the inset map shows each one.
function visibleOn(mapId, pin) {
  if (!pin.pos[mapId]) return false;
  return mapId !== 'overview' || pin.region !== 'adriatico' || pin.hq;
}

function pinButton(pin, mapId) {
  const { x, y } = pin.pos[mapId];
  return `<button type="button" class="port-pin${pin.hq ? ' port-pin--hq' : ''}" style="left:${x}%;top:${y}%" data-port="${pin.id}" aria-label="${pin.label}, ${pin.country}">
    <span class="port-pin__label">${pin.label}</span>
  </button>`;
}

function portList() {
  return REGIONS.map(({ id, label }) => {
    const pins = MAP_PINS.filter((p) => p.region === id);
    return `
      <div>
        <h3 class="text-xs uppercase tracking-widest text-secondary font-bold mb-2">${label}</h3>
        <ul class="divide-y divide-outline-variant/60 border-y border-outline-variant/60">
          ${pins.map((p) => `
            <li>
              <button type="button" class="port-list-item w-full flex items-center justify-between gap-3 py-2 px-2 text-left text-sm transition-colors" data-port="${p.id}">
                <span class="text-primary font-semibold">${p.label}${p.hq ? ' <span class="text-[10px] uppercase tracking-wider text-secondary">Sede</span>' : ''}</span>
                <span class="text-xs text-on-surface-variant">${p.country}</span>
              </button>
            </li>`).join('')}
        </ul>
      </div>`;
  }).join('');
}

export function initPortsMap() {
  document.querySelectorAll('[data-pin-layer]').forEach((layer) => {
    const mapId = layer.dataset.pinLayer;
    layer.innerHTML = MAP_PINS.filter((p) => visibleOn(mapId, p)).map((p) => pinButton(p, mapId)).join('');
  });

  const list = document.getElementById('port-list');
  if (list) list.innerHTML = portList();

  const countries = new Set(MAP_PINS.map((p) => p.country));
  document.querySelectorAll('[data-stat="ports"]').forEach((el) => { el.textContent = MAP_PINS.length; });
  document.querySelectorAll('[data-stat="countries"]').forEach((el) => { el.textContent = countries.size; });

  const setActive = (id) => {
    document.querySelectorAll('[data-port]').forEach((el) => {
      el.classList.toggle('is-active', el.dataset.port === id);
    });
  };

  document.querySelectorAll('[data-port]').forEach((el) => {
    el.addEventListener('mouseenter', () => setActive(el.dataset.port));
    el.addEventListener('focus', () => setActive(el.dataset.port));
    el.addEventListener('mouseleave', () => setActive(null));
    el.addEventListener('blur', () => setActive(null));
  });
}
