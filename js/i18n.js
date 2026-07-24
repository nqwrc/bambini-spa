import { translations } from './translations.js';

export function getLanguage() {
  return localStorage.getItem('bambini_lang') || 'it';
}

export function setLanguage(lang) {
  if (lang !== 'it' && lang !== 'en') lang = 'it';
  localStorage.setItem('bambini_lang', lang);
  document.documentElement.lang = lang;
  updatePageLanguage(lang);
}

export function updatePageLanguage(lang) {
  const currentLang = lang || getLanguage();
  document.documentElement.lang = currentLang;

  // Toggle visible elements with data-lang-it / data-lang-en attributes if present
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
      if (value) value = value[k];
    }
    if (value) {
      if (el.tagName === 'INPUT' && el.type === 'placeholder') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });

  // Highlight active language button
  document.querySelectorAll('.lang-switch-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === currentLang) {
      btn.classList.add('font-bold', 'text-secondary');
      btn.classList.remove('opacity-60');
    } else {
      btn.classList.remove('font-bold', 'text-secondary');
      btn.classList.add('opacity-60');
    }
  });
}

export function initI18n() {
  const lang = getLanguage();
  setLanguage(lang);
}
