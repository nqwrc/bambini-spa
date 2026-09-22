// News page: cards from data/news.json, tag filters with counts, LinkedIn column without embed
// (posts are copied into news.json with sourceType "linkedin" once supplied).
import news from '../../data/news.json';

const sorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
const TAGS = ['contratto', 'base', 'azienda', 'flotta', 'hseq'];

function card(n) {
  return `
    <article class="bg-white border border-outline-variant rounded-lg p-6 flex flex-col gap-3 vessel-card-hover" data-news data-tag="${n.tag}" data-reveal>
      <div class="flex justify-between items-center"><time class="font-headline-md text-sm text-primary" datetime="${n.date}">${n.date}</time><span class="text-xs font-semibold uppercase tracking-wider text-secondary">${n.tag}</span></div>
      <h2 class="font-headline-md text-headline-md text-on-surface">${n.title_it}</h2>
      <p class="text-sm text-on-surface-variant">${n.summary_it}</p>
      <p class="text-xs text-on-surface-variant">Fonte: ${n.source}${n.url ? ` · <a href="${n.url}" rel="noopener" class="text-primary hover:underline">leggi</a>` : ''} ${n.verified ? '<span class="badge-verified">verificato</span>' : '<span class="badge-verify">da verificare</span>'}</p>
    </article>`;
}

export function initNews() {
  const list = document.getElementById('news-list');
  const filters = document.getElementById('news-filters');
  const linkedin = document.getElementById('linkedin-posts');
  if (!list) return;

  list.innerHTML = sorted.map(card).join('');

  if (filters) {
    const chip = (key, label, n, active) =>
      `<button type="button" data-tag="${key}" aria-pressed="${active}" class="news-filter inline-flex items-center gap-2 h-9 px-4 rounded-full border text-xs font-semibold ${active ? 'bg-primary text-white border-primary' : 'border-outline-variant text-on-surface-variant'}">${label} <strong class="font-headline-md">${n}</strong></button>`;
    filters.innerHTML =
      chip('all', 'Tutte', sorted.length, true) +
      TAGS.map((t) => chip(t, t, sorted.filter((n) => n.tag === t).length, false)).join('');
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.news-filter');
      if (!btn) return;
      const tag = btn.dataset.tag;
      filters.querySelectorAll('.news-filter').forEach((b) => {
        const on = b === btn;
        b.setAttribute('aria-pressed', String(on));
        b.classList.toggle('bg-primary', on); b.classList.toggle('text-white', on); b.classList.toggle('border-primary', on);
        b.classList.toggle('border-outline-variant', !on); b.classList.toggle('text-on-surface-variant', !on);
      });
      list.querySelectorAll('[data-news]').forEach((el) => { el.hidden = tag !== 'all' && el.dataset.tag !== tag; });
    });
  }

  if (linkedin) {
    const posts = sorted.filter((n) => n.sourceType === 'linkedin').slice(0, 3);
    linkedin.innerHTML = posts.length
      ? posts.map(card).join('')
      : [1, 2, 3].map((i) => `<div class="bg-white border border-dashed border-outline-variant rounded-lg p-4 text-sm text-on-surface-variant flex flex-col gap-2"><span class="text-xs">Post ${i}</span><span class="badge-missing">[DATA E TESTO DEL POST DA FORNIRE]</span></div>`).join('');
  }
}
