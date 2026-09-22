// Footer: address, switchboard and department list come from data/site.json and
// data/contacts.json, so a wrong number can only exist in one place.
import site from '../../data/site.json';
import contacts from '../../data/contacts.json';
import certifications from '../../data/certifications.json';

const link = (href, label, key) =>
  `<li><a href="${href}" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline"${key ? ` data-i18n="${key}"` : ''}>${label}</a></li>`;

export function renderFooter() {
  const container = document.getElementById('app-footer');
  if (!container) return;

  const departments = contacts
    .filter((c) => !c.lastResort)
    .map(
      (c) => `
        <li class="flex items-center justify-between gap-2 py-1 border-b border-white/10">
          <a href="contatti.html?to=${c.key}" class="text-offshore-white/85 hover:text-offshore-white hover:underline">${c.label_it}</a>
          ${c.verified ? '<span class="badge-verified">verificato</span>' : '<span class="badge-verify">da verificare</span>'}
        </li>`
    )
    .join('');

  const certs = certifications
    .filter((c) => c.kind !== 'training')
    .map((c) => {
      const since = c.since ? `dal ${c.since.slice(0, 4)}` : '<span class="badge-verify">data da confermare</span>';
      return `<li class="text-offshore-white/85">${c.name} · ${c.body ?? ''} · ${since}</li>`;
    })
    .join('');

  const vat = site.vat ? ` · P.IVA ${site.vat}` : '';

  container.innerHTML = `
    <footer class="bg-deep-sea text-offshore-white w-full border-t border-white/10 mt-20">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 grid grid-cols-1 md:grid-cols-4 gap-gutter">

        <div>
          <a href="index.html" class="flex items-center gap-2 mb-5">
            <span class="material-symbols-outlined text-secondary-fixed text-3xl">directions_boat</span>
            <span class="font-headline-md text-headline-md text-offshore-white tracking-tight">${site.company}</span>
          </a>
          <address class="not-italic text-sm text-offshore-white/80 space-y-1">
            <p>${site.address.street}<br/>${site.address.zip} ${site.address.city}</p>
            <p>Tel <a href="tel:${site.phone.replace(/\s+/g, '')}" class="hover:underline">${site.phone}</a></p>
            <p>Fax ${site.fax}</p>
            <p><a href="mailto:${site.email}" class="hover:underline">${site.email}</a> <span class="text-offshore-white/50">(ultima scelta)</span></p>
          </address>
          <a href="${site.linkedin}" rel="noopener" target="_blank" class="inline-block mt-4 text-sm font-semibold text-secondary-fixed hover:underline">LinkedIn</a>
        </div>

        <div>
          <h4 class="text-secondary-fixed font-label-lg uppercase tracking-widest mb-4">Reparti</h4>
          <ul class="text-sm">${departments}</ul>
        </div>

        <div>
          <h4 class="text-secondary-fixed font-label-lg uppercase tracking-widest mb-4" data-i18n="footer.navigation">Navigazione</h4>
          <ul class="flex flex-col gap-2 text-sm">
            ${link('servizi.html', 'Servizi', 'nav.services')}
            ${link('flotta.html', 'Flotta', 'nav.fleet')}
            ${link('aree-intervento.html', 'Aree di intervento', 'nav.areas')}
            ${link('hseq.html', 'HSEQ', 'nav.hseq')}
            ${link('compliance.html', 'Compliance', 'nav.compliance')}
            ${link('lavora-con-noi.html', 'Lavora con noi', 'nav.careers')}
            ${link('contatti.html', 'Contatti', 'nav.contact')}
          </ul>
        </div>

        <div>
          <h4 class="text-secondary-fixed font-label-lg uppercase tracking-widest mb-4">Certificazioni</h4>
          <ul class="flex flex-col gap-2 text-sm">${certs}</ul>
        </div>

      </div>

      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-xs text-offshore-white/50">
        <span>&copy; 2026 ${site.company} · ${site.address.city}${vat}</span>
        <span>Ultimo aggiornamento dei dati: <strong class="text-offshore-white/80">${site.updated}</strong></span>
      </div>
    </footer>
  `;
}
