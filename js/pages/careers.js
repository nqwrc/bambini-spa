// Careers page: open positions come from data/positions.json. A position is shown only
// while it has a publication date and a deadline that has not passed; without dates it
// never appears, which is what made the old page look stale (three undated roles).
// Applications go by mail to HR (no backend on GitHub Pages): the form builds the mailto:
// and asks the candidate to attach the CV, because a mailto: cannot carry a file.
import positions from '../../data/positions.json';
import contacts from '../../data/contacts.json';

const hr = contacts.find((c) => c.key === 'hr');
const today = new Date().toISOString().slice(0, 10);

// Shown: a verified vacancy (from the official site, even undated) or any vacancy whose
// deadline has not passed. An unverified vacancy without dates never appears.
const open = positions.filter((p) => (p.verified && !p.deadline) || (p.posted && p.deadline && p.deadline >= today));

function positionCard(p) {
  // An unverified position is a worked example of the format, shown with its badge so it
  // is never mistaken for a real vacancy. The apply flow works the same for both.
  const reqs = (p.requirements_it ?? []).map((r) => `<li>${r}</li>`).join('');
  return `
    <article class="bg-white border border-outline-variant rounded-lg p-6 flex flex-col gap-3 vessel-card-hover" data-reveal>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-headline-md text-headline-md text-primary" style="font-size: 20px; line-height: 28px;">${p.title_it}</h3>
        ${p.verified ? '<span class="badge-verified">posizione reale</span>' : '<span class="badge-verify">esempio, da confermare</span>'}
      </div>
      <p class="text-xs font-semibold text-on-surface-variant">${[p.location_it, p.contract_it].filter(Boolean).join(' · ')}</p>
      <p class="text-sm text-on-surface-variant">${p.summary_it ?? ''}</p>
      ${reqs ? `<ul class="text-sm text-on-surface-variant list-disc pl-5 flex flex-col gap-1">${reqs}</ul>` : ''}
      <p class="text-xs text-on-surface-variant mt-auto">${p.posted ? `Pubblicata il <time datetime="${p.posted}">${p.posted}</time>` : 'Pubblicata: <span class="badge-missing">[data da fornire]</span>'} · ${p.deadline ? `scade il <time datetime="${p.deadline}">${p.deadline}</time>` : 'scadenza: <span class="badge-missing">[da fornire]</span>'}${p.source ? ` · fonte ${p.source}` : ''}</p>
      <a href="#apply-form" class="inline-flex items-center justify-center h-11 border-2 border-primary text-primary rounded font-label-lg text-xs uppercase tracking-wider hover:bg-surface-container-low transition-colors" data-apply="${p.id}">Candidati</a>
    </article>`;
}

export function initCareers() {
  const list = document.getElementById('positions-list');
  const select = document.getElementById('position-select');
  const form = document.getElementById('candidate-form');
  if (!list || !select || !form) return;

  list.innerHTML = open.length
    ? open.map(positionCard).join('')
    : `<p class="col-span-full p-6 border border-dashed border-outline-variant rounded-lg text-sm text-on-surface-variant">
         Nessuna posizione aperta pubblicata al momento. Le posizioni compaiono qui con data di pubblicazione e scadenza;
         nel frattempo la candidatura spontanea arriva all'ufficio personale.
       </p>`;

  select.innerHTML =
    '<option value="Candidatura spontanea">Candidatura spontanea</option>' +
    open.map((p) => `<option value="${p.id}">${p.title_it}</option>`).join('');

  document.querySelectorAll('[data-apply]').forEach((a) =>
    a.addEventListener('click', () => {
      select.value = a.dataset.apply;
    })
  );

  const target = document.getElementById('apply-target');
  if (target) {
    target.innerHTML = hr.email
      ? `Destinatario: <strong class="text-primary">${hr.label_it}</strong> &lt;${hr.email}&gt; ${hr.verified ? '<span class="badge-verified">verificato</span>' : '<span class="badge-verify">da verificare</span>'}`
      : '<span class="badge-missing">[indirizzo HR da fornire]</span>';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!hr.email) return;
    const name = form.querySelector('#candidate-name').value.trim();
    const email = form.querySelector('#candidate-email').value.trim();
    const chosen = select.options[select.selectedIndex].textContent;
    const message = form.querySelector('#candidate-message').value.trim();
    const subject = `[Candidatura] ${chosen}`;
    // The official page asks for: experience, languages, and for seafarers the list of
    // certificates with expiry dates plus the embarkation history.
    const body = `${message}\n\nAllego il CV con esperienze, lingue conosciute, elenco certificati con scadenze e storico imbarchi.\n\n--\n${name}\n${email}`;
    window.location.href = `mailto:${hr.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
