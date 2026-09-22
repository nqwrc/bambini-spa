// Careers page: open positions come from data/positions.json. A position is shown only
// while it has a publication date and a deadline that has not passed; without dates it
// never appears, which is what made the old page look stale (three undated roles).
// Applications go by mail to HR (no backend on GitHub Pages): the form builds the mailto:
// and asks the candidate to attach the CV, because a mailto: cannot carry a file.
import positions from '../../data/positions.json';
import contacts from '../../data/contacts.json';

const hr = contacts.find((c) => c.key === 'hr');
const today = new Date().toISOString().slice(0, 10);

const open = positions.filter((p) => p.posted && p.deadline && p.deadline >= today);

function positionCard(p) {
  return `
    <article class="bg-white border border-outline-variant rounded-lg p-6 flex flex-col gap-3 vessel-card-hover" data-reveal>
      <div class="flex items-start justify-between gap-2">
        <h3 class="font-headline-md text-headline-md text-primary">${p.title_it}</h3>
        <span class="text-xs font-semibold text-on-surface-variant whitespace-nowrap">${p.location_it ?? ''}</span>
      </div>
      <p class="text-sm text-on-surface-variant">${p.summary_it ?? ''}</p>
      <p class="text-xs text-on-surface-variant">Pubblicata il <time datetime="${p.posted}">${p.posted}</time> · scade il <time datetime="${p.deadline}">${p.deadline}</time></p>
      <a href="#apply-form" class="self-start text-xs font-label-lg uppercase tracking-wider text-primary hover:underline" data-apply="${p.id}">Candidati</a>
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
    const body = `${message}\n\nAllego il mio CV.\n\n--\n${name}\n${email}`;
    window.location.href = `mailto:${hr.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
