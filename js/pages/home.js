// Home page: every number and card comes from data/, none from the markup.
import site from '../../data/site.json';
import fleet from '../../data/fleet.json';
import news from '../../data/news.json';
import counters from '../../data/counters.json';
import contacts from '../../data/contacts.json';
import { renderTimeline } from '../components/timeline.js';
import { vesselClass } from './fleet-filter.js';

const missing = (label) => `<span class="badge-missing">[${label}]</span>`;
const verifyBadge = (ok) =>
  ok ? '<span class="badge-verified">verificato</span>' : '<span class="badge-verify">da verificare</span>';

function todayStrip() {
  const el = document.getElementById('today-strip');
  if (!el) return;
  const tile = (value, label, note) => `
    <div class="bg-white border border-outline-variant rounded-lg p-5 flex flex-col gap-1" data-reveal>
      <span class="font-headline-lg text-headline-lg text-primary">${value}</span>
      <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">${label}</span>
      <span class="text-xs text-on-surface-variant">${note}</span>
    </div>`;
  const fleetFact = site.facts.find((f) => f.key === 'fleet');
  const c = (v) => (v === null ? missing('DATO') : `<span data-count="${v}">0</span>`);
  el.innerHTML =
    tile(`<span data-count="${fleetFact.value}">0</span>`, 'Unita in flotta', `${fleetFact.source}, ${fleetFact.asOf}`) +
    tile(c(counters.operativeToday), 'Unita operative oggi', counters.updated ? `aggiornato ${counters.updated}` : 'frequenza di aggiornamento da definire') +
    tile(c(counters.hoursYtd), 'Ore di navigazione 2026', 'da counters.json') +
    tile(c(counters.paxYtd), 'Passeggeri trasferiti 2026', 'da counters.json');
}

function facts() {
  const el = document.getElementById('facts');
  if (!el) return;
  const keys = ['fleet', 'certifications', 'years', 'revenue2024'];
  el.innerHTML = keys
    .map((k) => {
      const f = site.facts.find((x) => x.key === k);
      const value = typeof f.value === 'number'
        ? `<span data-count="${f.value}"${f.suffix ? ` data-suffix="${f.suffix}"` : ''}${Number.isInteger(f.value) ? '' : ' data-decimals="1"'}>0</span>${f.unit ? ` <span class="text-headline-md">${f.unit}</span>` : ''}`
        : f.value;
      return `
      <div class="flex flex-col gap-1 py-4 md:border-r md:border-outline-variant last:border-r-0" data-reveal>
        <span class="font-display-lg text-display-lg text-primary">${value}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">${f.label_it}</span>
        <span class="text-xs text-on-surface-variant">${f.source} · ${f.asOf} ${f.verified ? '' : verifyBadge(false)}</span>
      </div>`;
    })
    .join('');
}

function fleetTeaser() {
  const el = document.getElementById('fleet-teaser');
  const chips = document.getElementById('fleet-chips');
  if (!el) return;
  const pick = ['blue-mommy', 'blue-brother', 'blue-boy'].map((id) => fleet.find((v) => v.id === id));
  el.innerHTML = pick
    .map((v) => {
      const cls = vesselClass(v);
      return `
      <a href="vessel-detail.html?id=${v.id}" class="block bg-white border border-outline-variant rounded-lg overflow-hidden vessel-card-hover" data-reveal>
        <figure class="relative h-48 bg-deep-sea flex items-center justify-center text-white/70 text-xs">
          ${v.photo ? `<img src="${v.photo}" alt="${v.name}, ${cls}" class="w-full h-full object-cover"/>` : `[FOTO DA FORNIRE: ${v.name}]`}
          <figcaption class="absolute left-5 bottom-4 font-headline-md font-extrabold uppercase tracking-[0.08em] text-white text-lg">${cls} · ${v.name}</figcaption>
        </figure>
        <div class="p-4 flex items-center justify-between"><span class="font-headline-md text-primary" style="font-size: 18px;">${v.name}</span><span class="text-xs font-semibold text-on-surface-variant">${cls}</span></div>
      </a>`;
    })
    .join('');
  if (chips) {
    const counts = [
      ['Tutte', fleet.length], ['FSIV', fleet.filter((v) => v.type === 'FSIV').length],
      ['DP2', fleet.filter((v) => v.dp === 2).length], ['DP1', fleet.filter((v) => v.dp === 1).length],
      ['FiFi1', fleet.filter((v) => v.fifi).length],
    ];
    chips.innerHTML = counts
      .map(([l, n], i) => `<a href="flotta.html" class="inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-semibold ${i === 0 ? 'bg-primary text-white border-primary' : 'border-outline-variant text-on-surface-variant'}">${l} <strong class="font-headline-md">${n}</strong></a>`)
      .join('');
  }
}

function latestNews() {
  const list = document.getElementById('news-cards');
  const last = document.getElementById('latest-news');
  const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
  if (last && sorted[0]) {
    last.innerHTML = `<span class="text-xs font-semibold uppercase tracking-wider text-secondary">Ultima notizia</span>
      <time class="font-headline-md text-primary text-sm" datetime="${sorted[0].date}">${sorted[0].date}</time>
      <a href="news.html" class="text-sm font-semibold text-primary hover:underline">${sorted[0].title_it}</a>`;
  }
  if (!list) return;
  list.innerHTML = sorted
    .slice(0, 3)
    .map(
      (n) => `
      <article class="bg-white border border-outline-variant rounded-lg p-6 flex flex-col gap-3 vessel-card-hover" data-reveal>
        <div class="flex justify-between items-center"><time class="font-headline-md text-sm text-primary" datetime="${n.date}">${n.date}</time><span class="text-xs font-semibold uppercase tracking-wider text-secondary">${n.tag}</span></div>
        <h3 class="font-headline-md text-headline-md text-on-surface" style="font-size: 20px; line-height: 28px;">${n.title_it}</h3>
        <p class="text-sm text-on-surface-variant">${n.summary_it}</p>
        <span class="text-xs text-on-surface-variant">Fonte: ${n.source}</span>
      </article>`
    )
    .join('');
}

function contactChips() {
  const el = document.getElementById('contact-chips');
  if (!el) return;
  el.innerHTML = contacts
    .filter((c) => !c.lastResort)
    .map((c) => `<a href="contatti.html?to=${c.key}" class="inline-flex items-center gap-2 min-h-11 px-4 border border-white/40 rounded text-white text-sm font-semibold hover:bg-white/10 transition-colors">${c.label_it} ${c.verified ? '' : verifyBadge(false)}</a>`)
    .join('');
}

export function initHome() {
  todayStrip();
  renderTimeline(document.getElementById('timeline'), { direction: 'horizontal' });
  facts();
  fleetTeaser();
  latestNews();
  contactChips();
}
