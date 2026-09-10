import { FLEET, photoUrl, fmt } from '../data/fleet.js';

const DEFAULT_SLUG = 'blue-brother';

function fill(name, value) {
  document.querySelectorAll(`[data-vessel="${name}"]`).forEach((el) => { el.textContent = value; });
}

export function initVesselDetail() {
  const slug = new URLSearchParams(window.location.search).get('v') || DEFAULT_SLUG;
  let index = FLEET.findIndex((v) => v.slug === slug);
  if (index < 0) index = FLEET.findIndex((v) => v.slug === DEFAULT_SLUG);
  const v = FLEET[index];

  document.title = `${v.name} — ${v.cls} | Bambini S.p.A.`;
  fill('name', v.name);
  fill('cls', v.cls);

  const hero = document.getElementById('vessel-hero');
  hero.src = photoUrl(v, 1);
  hero.alt = v.name;

  // Gallery: only when the live site has more than one photo of this vessel.
  const gallery = document.getElementById('vessel-gallery');
  if (v.photos > 1) {
    gallery.innerHTML = Array.from({ length: v.photos }, (_, i) => `
      <button type="button" data-photo="${photoUrl(v, i + 1)}" class="aspect-[4/3] rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-secondary' : 'border-transparent'} cursor-pointer">
        <img src="${photoUrl(v, i + 1)}" alt="${v.name}, foto ${i + 1}" loading="lazy" class="w-full h-full object-cover"/>
      </button>`).join('');
    gallery.querySelectorAll('[data-photo]').forEach((btn) => {
      btn.addEventListener('click', () => {
        hero.src = btn.dataset.photo;
        gallery.querySelectorAll('[data-photo]').forEach((b) => {
          b.classList.toggle('border-secondary', b === btn);
          b.classList.toggle('border-transparent', b !== btn);
        });
      });
    });
  } else {
    gallery.remove();
  }

  const rows = [
    ['Classe', v.cls],
    ['Lunghezza fuori tutto (LOA)', `${fmt(v.loa)} m`],
    ['Larghezza', `${fmt(v.beam)} m`],
    ['Velocità massima', `${v.speed} nodi`],
    ['Passeggeri', v.pax],
    ['Ponte di carico', v.deck],
    ['Portata', `${v.cargo} t`],
    ...(v.extra || []),
  ];
  document.getElementById('vessel-specs').innerHTML = rows.map(([label, value], i) => `
    <tr class="${i % 2 ? 'bg-surface-container-low ' : ''}hover:bg-white transition-colors">
      <td class="p-4 font-semibold text-deep-sea">${label}</td>
      <td class="p-4 text-on-surface-variant">${value}</td>
    </tr>`).join('');

  const dp = v.cls.match(/DP(\d)/);
  const capabilities = [
    dp ? `Posizionamento dinamico DP${dp[1]} per operare in sicurezza a ridosso delle installazioni offshore.` : 'Unità veloce per il trasporto di personale e materiali verso le installazioni offshore.',
    v.cls.includes('FiFi1') ? 'Classe antincendio FiFi1.' : '',
  ].join(' ');
  fill('capabilities', capabilities.trim());

  const prev = FLEET[(index - 1 + FLEET.length) % FLEET.length];
  const next = FLEET[(index + 1) % FLEET.length];
  const prevLink = document.getElementById('vessel-prev');
  const nextLink = document.getElementById('vessel-next');
  prevLink.href = `vessel-detail.html?v=${prev.slug}`;
  prevLink.querySelector('[data-label]').textContent = prev.name;
  nextLink.href = `vessel-detail.html?v=${next.slug}`;
  nextLink.querySelector('[data-label]').textContent = next.name;
}
