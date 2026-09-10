import { getLanguage, setLanguage } from '../i18n.js';

// Split header: a thin deep-navy utility bar (phone, email, careers, IT/EN) that scrolls
// away, over a translucent sticky main bar. #app-header is display:contents (css/main.css)
// so the main bar sticks to the page, not to its wrapper.
// [data-header-shrink] is the hook for the motion JS (adds .is-shrunk on scroll).
export function renderHeader() {
  const container = document.getElementById('app-header');
  if (!container) return;

  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';

  // Desktop uses short labels (navShort.*) so seven items fit on one line from 1280px.
  const navItems = [
    { href: 'servizi.html', key: 'nav.services', shortKey: 'nav.services', label: 'Servizi', active: pageName === 'servizi.html' },
    { href: 'flotta.html', key: 'nav.fleet', shortKey: 'navShort.fleet', label: 'Flotta', active: pageName === 'flotta.html' || pageName === 'vessel-detail.html' },
    { href: 'aree-intervento.html', key: 'nav.areas', shortKey: 'nav.areas', label: 'Aree di Intervento', active: pageName === 'aree-intervento.html' },
    { href: 'media.html', key: 'nav.media', shortKey: 'nav.media', label: 'Media', active: pageName === 'media.html' },
    { href: 'hseq.html', key: 'nav.hseq', shortKey: 'navShort.hseq', label: 'HSEQ', active: pageName === 'hseq.html' },
    { href: 'compliance.html', key: 'nav.compliance', shortKey: 'navShort.compliance', label: 'Compliance', active: pageName === 'compliance.html' },
    { href: 'contatti.html', key: 'nav.contact', shortKey: 'nav.contact', label: 'Contatti', active: pageName === 'contatti.html' },
  ];
  const careers = { href: 'lavora-con-noi.html', key: 'nav.careers', label: 'Lavora con Noi', active: pageName === 'lavora-con-noi.html' };

  const current = (item) => (item.active ? ' aria-current="page"' : '');

  const desktopNavLinks = navItems.map(item => `
    <a href="${item.href}" data-i18n="${item.shortKey}" class="site-nav__link"${current(item)}>${item.label}</a>
  `).join('');

  const mobileDropdownLinks = [...navItems, careers].map(item => `
    <a href="${item.href}" data-i18n="${item.key}"${current(item)} class="block py-3.5 px-6 text-on-surface hover:bg-surface-container font-medium border-b border-outline-variant/40 ${
      item.active ? 'text-primary font-semibold bg-surface-container-low' : ''
    }">${item.label}</a>
  `).join('');

  container.innerHTML = `
    <div class="utility-bar">
      <div class="utility-bar__inner max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-between gap-4">
        <div class="flex items-center gap-5">
          <a href="tel:+390544530537" aria-label="Telefono +39 0544 530537">
            <span class="material-symbols-outlined" aria-hidden="true">call</span>+39 0544 530537
          </a>
          <a href="mailto:info@bambinispa.it" class="!hidden sm:!inline-flex">
            <span class="material-symbols-outlined" aria-hidden="true">mail</span>info@bambinispa.it
          </a>
        </div>
        <div class="flex items-center gap-5">
          <a href="${careers.href}" data-i18n="nav.careers" class="!hidden md:!inline-flex"${current(careers)}>${careers.label}</a>
          <div class="flex items-center gap-1 uppercase tracking-wider" role="group" aria-label="Lingua / Language">
            <button type="button" class="lang-switch-btn cursor-pointer px-1.5 py-1" data-lang="it" lang="it">IT</button>
            <span class="text-white/40" aria-hidden="true">|</span>
            <button type="button" class="lang-switch-btn cursor-pointer px-1.5 py-1" data-lang="en" lang="en">EN</button>
          </div>
        </div>
      </div>
    </div>

    <header class="site-header" data-header-shrink>
      <div class="site-header__inner max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center gap-6">
        <!-- Logo (unchanged until the client picks one of the proposals in public/brand/) -->
        <a href="index.html" class="flex items-center gap-2 group shrink-0">
          <span class="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">directions_boat</span>
          <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight whitespace-nowrap">Bambini S.p.A.</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden xl:flex items-center" aria-label="Principale">
          ${desktopNavLinks}
        </nav>

        <div class="flex items-center gap-3">
          <!-- Request Quote CTA: accent blue, white text 6.21:1 -->
          <a href="contatti.html" data-i18n="nav.requestQuote" class="hidden sm:inline-flex items-center h-11 px-5 bg-secondary text-on-secondary rounded font-label-lg uppercase tracking-wider text-xs font-semibold whitespace-nowrap hover:bg-primary transition-colors">
            Richiedi Preventivo
          </a>

          <!-- Mobile Hamburger Button -->
          <button id="mobile-menu-toggle" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="mobile-dropdown" class="xl:hidden text-primary w-11 h-11 grid place-items-center rounded hover:bg-surface-container">
            <span class="material-symbols-outlined text-3xl" id="menu-icon" aria-hidden="true">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-dropdown" class="hidden xl:hidden bg-white border-t border-outline-variant/60 shadow-lg max-h-[calc(100svh-64px)] overflow-y-auto">
        <nav class="py-2" aria-label="Principale (mobile)">
          ${mobileDropdownLinks}
          <div class="p-4 bg-surface-container-low flex justify-center">
            <a href="contatti.html" data-i18n="nav.requestQuote" class="w-full text-center bg-secondary text-on-secondary py-3.5 rounded font-label-lg uppercase tracking-wider text-sm font-semibold block">
              Richiedi Preventivo
            </a>
          </div>
        </nav>
      </div>
    </header>
  `;

  // Language switch listeners
  container.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = e.currentTarget.getAttribute('data-lang');
      setLanguage(targetLang);
    });
  });

  // Mobile menu dropdown toggle
  const toggleBtn = container.querySelector('#mobile-menu-toggle');
  const dropdown = container.querySelector('#mobile-dropdown');
  const menuIcon = container.querySelector('#menu-icon');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', () => {
      const willOpen = dropdown.classList.contains('hidden');
      dropdown.classList.toggle('hidden', !willOpen);
      menuIcon.textContent = willOpen ? 'close' : 'menu';
      toggleBtn.setAttribute('aria-expanded', String(willOpen));
      toggleBtn.setAttribute('aria-label', willOpen ? 'Chiudi il menu' : 'Apri il menu');
    });
  }
}
