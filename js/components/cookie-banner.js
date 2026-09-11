export function renderCookieBanner() {
  if (localStorage.getItem('bambini_cookie_accepted')) return;

  const container = document.createElement('div');
  container.id = 'cookie-banner';
  container.className = 'fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant p-4 z-[100] transform translate-y-full transition-transform duration-500 motion-reduce:transition-none shadow-xl';

  container.innerHTML = `
    <div class="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-on-surface-variant text-sm leading-relaxed" data-i18n="cookie.text">
        Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando accetti la nostra privacy policy.
      </p>
      <div class="flex gap-4 shrink-0">
        <a href="compliance.html" class="text-primary font-bold text-sm hover:underline py-2" data-i18n="cookie.preferences">Preferenze</a>
        <button id="accept-cookie-btn" class="bg-primary text-white px-6 py-2 font-label-lg uppercase tracking-widest text-xs rounded hover:bg-tertiary transition-colors" data-i18n="cookie.accept">
          Accetta e Chiudi
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  setTimeout(() => {
    container.classList.remove('translate-y-full');
  }, 1500);

  container.querySelector('#accept-cookie-btn').addEventListener('click', () => {
    localStorage.setItem('bambini_cookie_accepted', 'true');
    container.classList.add('translate-y-full');
    setTimeout(() => container.remove(), 600);
  });
}
