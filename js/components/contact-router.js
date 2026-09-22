// Direct-contact model: every request goes to the department that answers it.
// Data: data/contacts.json (key, label_it, who_it, scope_it, email, phone, verified, lastResort).
// Three jobs, each opt-in through a DOM hook:
//   [data-contacts-list]   render one card per department
//   #contact-form          "A chi scrivi?" select drives the mailto: and the button label
//   ?to=<key>              deep link from any page's CTA (e.g. contatti.html?to=hseq)
// There is no backend on GitHub Pages, so "send" opens the visitor's mail client with the
// department address, subject and body prefilled. The fallback info@ is never preselected.
import contacts from '../../data/contacts.json';

const byKey = Object.fromEntries(contacts.map((c) => [c.key, c]));
const DEFAULT_KEY = 'ops';

function badge(c) {
  return c.verified
    ? '<span class="badge-verified">verificato</span>'
    : '<span class="badge-verify">da verificare</span>';
}

function channel(c) {
  if (c.email) return `<a href="mailto:${c.email}" class="text-primary font-semibold hover:underline">${c.email}</a>`;
  if (c.phone) return `<a href="tel:${c.phone.replace(/\s+/g, '')}" class="text-primary font-semibold hover:underline">${c.phone}</a>`;
  return '<span class="badge-missing">[canale da fornire]</span>';
}

export function renderContactCards() {
  const list = document.querySelector('[data-contacts-list]');
  if (!list) return;
  list.innerHTML = contacts
    .map(
      (c) => `
      <article class="bg-white border border-outline-variant rounded-lg p-5 flex flex-col gap-2 vessel-card-hover" data-reveal data-contact="${c.key}">
        <div class="flex items-start justify-between gap-2">
          <h3 class="font-headline-md text-headline-md text-primary" style="font-size: 18px; line-height: 26px;">${c.label_it}</h3>
          ${badge(c)}
        </div>
        <p class="text-sm text-on-surface-variant">${c.who_it} · ${c.scope_it}</p>
        <p class="text-sm">${channel(c)}</p>
        <button type="button" class="self-start text-xs font-label-lg uppercase tracking-wider text-primary hover:underline" data-pick="${c.key}">Scrivi a questo reparto</button>
      </article>`
    )
    .join('');
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const select = form.querySelector('#contact-to');
  const recipient = form.querySelector('#contact-recipient');
  const submit = form.querySelector('button[type="submit"]');

  select.innerHTML = contacts
    .filter((c) => c.email) // only departments with a mailbox can receive a form
    .map((c) => `<option value="${c.key}">${c.label_it} · ${c.email}</option>`)
    .join('');

  const requested = new URLSearchParams(window.location.search).get('to');
  select.value = requested && byKey[requested]?.email ? requested : DEFAULT_KEY;

  const update = () => {
    const c = byKey[select.value];
    recipient.innerHTML = `Destinatario: <strong class="text-primary">${c.label_it}</strong> &lt;${c.email}&gt; ${badge(c)}`;
    submit.textContent = `Invia a ${c.label_it}`;
  };
  select.addEventListener('change', update);
  update();

  // "Scrivi a questo reparto" on a card selects it in the form and scrolls there.
  document.querySelectorAll('[data-pick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.pick;
      if (byKey[key]?.email) {
        select.value = key;
        update();
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        form.querySelector('#contact-name').focus();
      } else {
        // The switchboard and DPA have no mailbox: point to the phone instead.
        document.querySelector(`[data-contact="${key}"] a[href^="tel:"]`)?.focus();
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const c = byKey[select.value];
    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();
    const subject = `[${c.label_it}] Richiesta dal sito`;
    const body = `${message}\n\n--\n${name}\n${email}`;
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

export function initContactRouter() {
  renderContactCards();
  initContactForm();
}
