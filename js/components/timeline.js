// Timeline 2020 -> today from data/timeline.json. Horizontal on the home page (one column per
// year), vertical on the company page; the most recent verified event carries the active marker.
// A year without a verified event shows the placeholder, never a filler sentence.
import timeline from '../../data/timeline.json';

const years = [...timeline].sort((a, b) => a.year - b.year);
const activeYear = Math.max(...years.filter((y) => y.verified).map((y) => y.year));

function body(y) {
  if (y.verified) {
    return `<p class="text-sm text-on-surface leading-snug">${y.title_it}</p>
            <p class="text-xs text-on-surface-variant">${y.date} · ${y.source}</p>`;
  }
  return `<span class="badge-missing">[DATO DA FORNIRE]</span>
          <p class="text-xs text-on-surface-variant">1-3 eventi: ingressi in flotta, refit, contratti, certificazioni</p>`;
}

export function renderTimeline(el, { direction = 'horizontal' } = {}) {
  if (!el) return;
  if (direction === 'horizontal') {
    el.innerHTML = years
      .map((y) => {
        const active = y.year === activeYear;
        return `
        <li class="flex flex-col gap-3" data-reveal data-year="${y.year}"${active ? ' data-active' : ''}>
          <span class="font-headline-lg ${active ? 'text-headline-lg text-primary' : 'text-headline-md text-on-surface-variant'}">${y.year}</span>
          <div class="flex items-center">
            <span class="tl-marker shrink-0 rounded-full ${active ? 'w-4 h-4 bg-secondary' : 'w-3 h-3 bg-primary'}"></span>
            <span class="tl-line flex-grow h-0.5 bg-outline-variant"></span>
          </div>
          <div class="flex flex-col gap-1 pr-4">${body(y)}</div>
        </li>`;
      })
      .join('');
    return;
  }
  el.innerHTML = [...years]
    .reverse()
    .map((y) => {
      const active = y.year === activeYear;
      return `
      <li class="grid grid-cols-[80px_24px_1fr] gap-x-4" data-reveal data-year="${y.year}"${active ? ' data-active' : ''}>
        <span class="font-headline-lg ${active ? 'text-primary' : 'text-on-surface-variant'} leading-none">${y.year}</span>
        <div class="flex flex-col items-center">
          <span class="shrink-0 rounded-full ${active ? 'w-4 h-4 bg-secondary' : 'w-3 h-3 bg-primary'}"></span>
          <span class="w-0.5 flex-grow min-h-14 bg-outline-variant"></span>
        </div>
        <div class="flex flex-col gap-1 pb-8">${body(y)}</div>
      </li>`;
    })
    .join('');
}
