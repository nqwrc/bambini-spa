import { getLanguage, setLanguage } from '../i18n.js';

export function renderHeader() {
  const container = document.getElementById('app-header');
  if (!container) return;

  const path = window.location.pathname;
  const pageName = path.split('/').pop() || 'index.html';

  const navItems = [
    { href: 'servizi.html', key: 'nav.services', label: 'Servizi', active: pageName === 'servizi.html' },
    { href: 'flotta.html', key: 'nav.fleet', label: 'Flotta', active: pageName === 'flotta.html' || pageName === 'vessel-detail.html' },
    { href: 'aree-intervento.html', key: 'nav.areas', label: 'Aree di Intervento', active: pageName === 'aree-intervento.html' },
    { href: 'hseq.html', key: 'nav.hseq', label: 'HSEQ', active: pageName === 'hseq.html' },
    { href: 'compliance.html', key: 'nav.compliance', label: 'Compliance', active: pageName === 'compliance.html' },
    { href: 'contatti.html', key: 'nav.contact', label: 'Contatti', active: pageName === 'contatti.html' },
    { href: 'lavora-con-noi.html', key: 'nav.careers', label: 'Careers', active: pageName === 'lavora-con-noi.html' },
  ];

  const desktopNavLinks = navItems.map(item => `
    <a href="${item.href}" data-i18n="${item.key}" class="font-label-lg text-label-lg uppercase tracking-wider transition-all px-3 py-1 ${
      item.active ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'
    }">
      ${item.label}
    </a>
  `).join('');

  const mobileDropdownLinks = navItems.map(item => `
    <a href="${item.href}" data-i18n="${item.key}" class="block py-3 px-6 text-on-surface hover:bg-surface-container font-label-lg uppercase border-b border-outline-variant/30 ${
      item.active ? 'text-primary font-bold bg-surface-container-low' : ''
    }">
      ${item.label}
    </a>
  `).join('');

  container.innerHTML = `
    <header class="w-full top-0 sticky z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant transition-all duration-300">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 group">
          <span class="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">directions_boat</span>
          <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">Bambini S.p.A.</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-2">
          ${desktopNavLinks}
        </nav>

        <!-- Right Controls (Lang + CTA + Hamburger) -->
        <div class="flex items-center gap-4">
          <!-- Language Selector -->
          <div class="flex items-center gap-1 text-xs uppercase tracking-wider bg-surface-container-low px-2 py-1 rounded border border-outline-variant">
            <button class="lang-switch-btn cursor-pointer px-1 transition-colors" data-lang="it">IT</button>
            <span class="opacity-40">|</span>
            <button class="lang-switch-btn cursor-pointer px-1 transition-colors" data-lang="en">EN</button>
          </div>

          <!-- Request Quote CTA -->
          <a href="contatti.html?to=ops" data-i18n="nav.requestQuote" class="hidden sm:flex items-center gap-2 bg-secondary text-on-primary px-5 py-2.5 rounded font-label-lg uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-xs">
            Richiedi Preventivo
          </a>

          <!-- Mobile Hamburger Button -->
          <button id="mobile-menu-toggle" aria-label="Toggle Navigation Menu" class="lg:hidden text-primary p-2 focus:outline-none rounded hover:bg-surface-container">
            <span class="material-symbols-outlined text-3xl" id="menu-icon">menu</span>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-dropdown" class="hidden lg:hidden bg-surface border-b border-outline-variant shadow-lg animate-fadeIn">
        <div class="py-2">
          ${mobileDropdownLinks}
          <div class="p-4 bg-surface-container-low flex justify-center">
            <a href="contatti.html?to=ops" data-i18n="nav.requestQuote" class="w-full text-center bg-secondary text-on-primary py-3 rounded font-label-lg uppercase tracking-wider block">
              Richiedi Preventivo
            </a>
          </div>
        </div>
      </div>
    </header>
  `;

  // Language switch listeners
  container.querySelectorAll('.lang-switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetLang = e.target.getAttribute('data-lang');
      setLanguage(targetLang);
    });
  });

  // Mobile menu dropdown toggle
  const toggleBtn = container.querySelector('#mobile-menu-toggle');
  const dropdown = container.querySelector('#mobile-dropdown');
  const menuIcon = container.querySelector('#menu-icon');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = dropdown.classList.contains('hidden');
      if (isHidden) {
        dropdown.classList.remove('hidden');
        menuIcon.textContent = 'close';
      } else {
        dropdown.classList.add('hidden');
        menuIcon.textContent = 'menu';
      }
    });
  }
}
