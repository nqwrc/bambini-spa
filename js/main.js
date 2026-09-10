import { initI18n } from './i18n.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderCookieBanner } from './components/cookie-banner.js';
import { initScrollAnimations } from './components/scroll-animations.js';
import { initHeroVideo } from './components/hero-video.js';

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  renderCookieBanner();
  initI18n();
  initScrollAnimations();
  initHeroVideo();
});
