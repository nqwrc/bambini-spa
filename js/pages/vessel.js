// Vessel detail: one page, seventeen vessels. The id comes from ?id= (default blue-brother);
// everything shown is read from data/fleet.json, and a null field renders a placeholder.
import fleet from '../../data/fleet.json';
import { vesselClass } from './fleet-filter.js';

const missing = (label) => `<span class="badge-missing">[${label}]</span>`;
const verified = (ok, src) => (ok ? `<span class="badge-verified">${src}</span>` : '<span class="badge-verify">da verificare</span>');

function specRows(v) {
  const rows = [
    ['Tipo', v.type, verified(v.verified.type, v.source)],
    ['Classe DP', v.dp ? `DP${v.dp}` : 'nessuna', verified(v.verified.dp, v.source)],
    ['Antincendio', v.fifi ? 'FiFi1' : 'nessuno', verified(v.verified.fifi, v.source)],
    ['Lunghezza fuori tutto (LOA)', v.loa !== null ? `${v.loaApprox ? 'circa ' : ''}${v.loa} m` : missing('DATO DA FORNIRE'), v.loa !== null && v.loaSource ? `<span class="badge-verified">${v.loaSource}</span>` : ''],
    ['Anno di costruzione', v.built ?? missing('DATO DA FORNIRE'), ''],
    ['Cantiere', v.yard ?? missing('DATO DA FORNIRE'), ''],
    ['Bandiera', v.flag ?? missing('DATO DA FORNIRE'), ''],
    ['Registro di classe', v.classSociety ?? missing('DATO DA FORNIRE'), ''],
    ['Passeggeri', v.pax ?? missing('DATO DA FORNIRE'), ''],
    ['Velocita di servizio', v.speed !== null ? `${v.speed} nodi` : missing('DATO DA FORNIRE'), ''],
    ['Ultimo bacino / refit', v.lastRefit ?? missing('DATO DA FORNIRE'), ''],
  ];
  return rows
    .map(([k, val, badge]) => `<tr class="border-b border-outline-variant"><th scope="row" class="p-3 text-left font-semibold text-deep-sea w-2/5">${k}</th><td class="p-3 text-on-surface-variant">${val} ${badge}</td></tr>`)
    .join('');
}

export function initVessel() {
  const id = new URLSearchParams(window.location.search).get('id') || 'blue-brother';
  const v = fleet.find((x) => x.id === id) ?? fleet.find((x) => x.id === 'blue-brother');
  const cls = vesselClass(v);

  document.title = `${v.name}, ${cls} | Bambini S.p.A.`;
  const set = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };

  set('[data-vessel-name]', v.name);
  set('[data-vessel-class]', cls);
  set('[data-vessel-caption]', `${cls} · ${v.name}`);
  set('[data-vessel-photo]', v.photo ? `<img src="${v.photo}" alt="${v.name}, ${cls}" class="w-full h-full object-cover"/>` : `[FOTO DA FORNIRE: ${v.name} in navigazione, drone di prua]`);
  set('[data-vessel-specs]', specRows(v));
  set('[data-vessel-status]', `Disponibilita: ${missing('DATO')} · aggiornato ${missing('DATA')}`);

  const sisters = fleet.filter((x) => x.id !== v.id && x.type === v.type && x.dp === v.dp && x.fifi === v.fifi);
  set('[data-vessel-sisters]', sisters.length
    ? sisters.map((s) => `<a href="vessel-detail.html?id=${s.id}" class="px-3 py-2 border border-outline-variant rounded text-sm font-semibold text-primary bg-white hover:border-primary">${s.name}</a>`).join('')
    : '<span class="text-sm text-on-surface-variant">Nessuna altra unita della stessa classe.</span>');

  const rfq = document.querySelector('[data-vessel-rfq]');
  if (rfq) rfq.href = `contatti.html?to=ops&vessel=${encodeURIComponent(v.name)}`;
  const pdf = document.querySelector('[data-vessel-pdf]');
  if (pdf && !v.datasheet) { pdf.setAttribute('aria-disabled', 'true'); pdf.classList.add('opacity-60', 'pointer-events-none'); }
}
