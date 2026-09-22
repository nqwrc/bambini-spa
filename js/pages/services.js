// Services page: vessel counts per service and the client list come from data/,
// so the copy can never claim more units than the fleet page shows.
import fleet from '../../data/fleet.json';
import clients from '../../data/clients.json';

const COUNTS = {
  fsiv: fleet.filter((v) => v.type === 'FSIV').length,
  dp2: fleet.filter((v) => v.dp === 2).length,
  fifi: fleet.filter((v) => v.fifi).length,
  crew: fleet.filter((v) => /crew/i.test(v.type)).length,
  utility: fleet.filter((v) => /utility/i.test(v.type)).length,
};

export function initServices() {
  // <span data-fleet-count="fsiv"></span> anywhere on the page
  document.querySelectorAll('[data-fleet-count]').forEach((el) => {
    el.textContent = COUNTS[el.dataset.fleetCount] ?? '';
  });

  const list = document.getElementById('clients-list');
  if (!list) return;
  const rows = clients.map(
    (c) => `
      <li class="flex flex-col gap-1 p-5 bg-white border border-outline-variant rounded-lg" data-reveal>
        <div class="flex items-center justify-between gap-2">
          <span class="font-headline-md text-headline-md text-primary" style="font-size: 20px; line-height: 28px;">${c.name}</span>
          <span class="font-headline-md text-secondary">${c.year}</span>
        </div>
        <p class="text-sm text-on-surface-variant">${c.scope_it}</p>
        <p class="text-xs text-on-surface-variant">Fonte: ${c.source} ${c.verified ? '<span class="badge-verified">verificato</span>' : '<span class="badge-verify">da verificare</span>'}</p>
      </li>`
  );
  // Visible placeholders for the names still to be supplied, never invented ones.
  for (let i = 0; i < 2; i += 1) {
    rows.push(`
      <li class="flex flex-col gap-2 p-5 border border-dashed border-outline-variant rounded-lg text-sm text-on-surface-variant" data-reveal>
        <span class="badge-missing">[CLIENTE E ANNO DA FORNIRE]</span>
        <span>Nome pubblicabile, anno del contratto, unita impiegate.</span>
      </li>`);
  }
  list.innerHTML = rows.join('');
}
