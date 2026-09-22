// Company page: vertical timeline, today's facts, certifications with dates, team by department.
import site from '../../data/site.json';
import certifications from '../../data/certifications.json';
import team from '../../data/team.json';
import contacts from '../../data/contacts.json';
import { renderTimeline } from '../components/timeline.js';

const missing = (label) => `<span class="badge-missing">[${label}]</span>`;

export function renderCertifications(el) {
  if (!el) return;
  el.innerHTML = certifications
    .map((c) => {
      const ok = c.verified && (c.since || c.kind === 'training');
      const since = c.since ? `dal ${c.since}` : missing('DATA DA CONFERMARE');
      return `
      <div class="bg-white border border-outline-variant border-l-4 ${ok ? 'border-l-secondary' : 'border-l-[#b45309]'} rounded-lg p-4 flex flex-col gap-1" data-reveal>
        <span class="font-headline-md text-primary" style="font-size: 16px;">${c.name}</span>
        <span class="text-sm text-on-surface-variant">${c.body ?? 'formazione equipaggi'} · ${since}</span>
        ${c.kind === 'training' ? '' : `<span class="text-xs text-on-surface-variant">Ultimo audit ${c.lastAudit ?? missing('DATA')} · scadenza ${c.expires ?? missing('DATA')}</span>`}
      </div>`;
    })
    .join('');
}

export function initCompany() {
  renderTimeline(document.getElementById('timeline-v'), { direction: 'vertical' });

  const facts = document.getElementById('company-facts');
  if (facts) {
    const fleet = site.facts.find((f) => f.key === 'fleet');
    const employees = site.facts.find((f) => f.key === 'employees');
    facts.innerHTML = `
      <div class="bg-white border border-outline-variant rounded-lg p-5 flex flex-col gap-1" data-reveal>
        <span class="font-headline-lg text-headline-lg text-primary" data-count="${fleet.value}">0</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Unita in flotta</span>
        <span class="text-xs text-on-surface-variant">${fleet.source} · ${fleet.asOf}</span>
      </div>
      <div class="bg-white border border-outline-variant rounded-lg p-5 flex flex-col gap-1" data-reveal>
        <span class="font-headline-lg text-headline-lg text-primary">${employees.value}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Dipendenti</span>
        <span class="text-xs text-on-surface-variant">${employees.source} · ${employees.asOf} <span class="badge-verify">da confermare</span></span>
      </div>
      <div class="bg-white border border-outline-variant rounded-lg p-5 flex flex-col gap-1" data-reveal>
        <span class="font-headline-lg text-headline-lg text-primary">${site.founded ?? missing('ANNO')}</span>
        <span class="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Anno di fondazione</span>
        <span class="text-xs text-on-surface-variant">oltre 60 anni di attivita</span>
      </div>`;
  }

  renderCertifications(document.getElementById('certifications'));

  const teamEl = document.getElementById('team');
  if (teamEl) {
    teamEl.innerHTML = team
      .map((m) => {
        const c = contacts.find((x) => x.key === m.dept);
        return `
        <div class="bg-white border border-outline-variant rounded-lg p-4 flex flex-col gap-2" data-reveal>
          <div class="h-36 rounded bg-surface-container-high flex items-center justify-center text-xs text-on-surface-variant">${m.photo ? `<img src="${m.photo}" alt="${m.name ?? m.role_it}" class="w-full h-full object-cover rounded"/>` : '[FOTO]'}</div>
          <span class="font-headline-md text-primary" style="font-size: 15px;">${m.role_it}</span>
          <span class="text-sm">${m.name ?? missing('NOME')}</span>
          ${c ? `<a href="contatti.html?to=${c.key}" class="text-xs font-semibold text-primary hover:underline">${c.label_it} ${c.verified ? '' : '<span class="badge-verify">da verificare</span>'}</a>` : ''}
        </div>`;
      })
      .join('');
  }
}
