export function renderFooter() {
  const container = document.getElementById('app-footer');
  if (!container) return;

  container.innerHTML = `
    <footer class="bg-deep-sea text-offshore-white w-full border-t border-white/10 mt-20">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 flex flex-col md:flex-row justify-between gap-gutter">
        
        <!-- Column 1: Brand & Contact -->
        <div class="md:w-1/3">
          <a href="index.html" class="flex items-center gap-2 mb-6">
            <span class="material-symbols-outlined text-secondary-fixed text-3xl">directions_boat</span>
            <span class="font-headline-lg text-headline-lg text-offshore-white tracking-tight">Bambini S.p.A.</span>
          </a>
          <p class="text-offshore-white/70 mb-6 max-w-xs font-body-md leading-relaxed" data-i18n="footer.tagline">
            Logistica integrata, supporto tecnico d'avanguardia e massima sicurezza operativa per il settore energetico dal 1962.
          </p>
          <div class="text-sm text-offshore-white/60 space-y-1 mb-6">
            <p><span class="material-symbols-outlined text-xs mr-2">location_on</span>Via Funrocale Soart, 12 — 48123 Marina di Ravenna (RA)</p>
            <p><span class="material-symbols-outlined text-xs mr-2">phone</span>Tel. +39 0544 530118</p>
            <p><span class="material-symbols-outlined text-xs mr-2">mail</span>Email: info@bambinispa.it</p>
          </div>
          <div class="flex gap-3">
            <a href="#" class="w-10 h-10 border border-white/20 rounded flex items-center justify-center text-white hover:border-secondary-fixed hover:text-secondary-fixed transition-colors" aria-label="Share"><span class="material-symbols-outlined text-sm">share</span></a>
            <a href="#" class="w-10 h-10 border border-white/20 rounded flex items-center justify-center text-white hover:border-secondary-fixed hover:text-secondary-fixed transition-colors" aria-label="Link"><span class="material-symbols-outlined text-sm">link</span></a>
            <a href="mailto:info@bambinispa.it" class="w-10 h-10 border border-white/20 rounded flex items-center justify-center text-white hover:border-secondary-fixed hover:text-secondary-fixed transition-colors" aria-label="Email"><span class="material-symbols-outlined text-sm">mail</span></a>
          </div>
        </div>

        <!-- Columns 2, 3, 4: Nav, Legal, Newsletter -->
        <div class="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-12">
          
          <!-- Column 2: Navigation -->
          <div>
            <h4 class="text-secondary-fixed font-label-lg uppercase tracking-widest mb-6" data-i18n="footer.navigation">Navigazione</h4>
            <ul class="flex flex-col gap-3 font-body-md text-sm">
              <li><a href="servizi.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.services">Servizi</a></li>
              <li><a href="flotta.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.fleet">La Flotta</a></li>
              <li><a href="aree-intervento.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.areas">Aree di Intervento</a></li>
              <li><a href="hseq.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.hseq">HSEQ & Sostenibilità</a></li>
              <li><a href="compliance.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.compliance">Compliance & Ethics</a></li>
              <li><a href="contatti.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.contact">Contatti</a></li>
              <li><a href="lavora-con-noi.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="nav.careers">Lavora con Noi</a></li>
            </ul>
          </div>

          <!-- Column 3: Legal -->
          <div>
            <h4 class="text-secondary-fixed font-label-lg uppercase tracking-widest mb-6" data-i18n="footer.legal">Legale & Privacy</h4>
            <ul class="flex flex-col gap-3 font-body-md text-sm">
              <li><a href="compliance.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="footer.privacyPolicy">Privacy Policy</a></li>
              <li><a href="compliance.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="footer.cookiePolicy">Cookie Policy</a></li>
              <li><a href="compliance.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="footer.legalNotice">Note Legali</a></li>
              <li><a href="compliance.html" class="text-offshore-white/80 hover:text-offshore-white transition-all hover:underline" data-i18n="footer.ethicsCode">Codice Etico & Modello 231</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter -->
          <div>
            <h4 class="text-secondary-fixed font-label-lg uppercase tracking-widest mb-6" data-i18n="footer.newsletterTitle">Newsletter</h4>
            <p class="text-offshore-white/60 mb-4 text-xs leading-relaxed" data-i18n="footer.newsletterDesc">Rimani aggiornato sulle nostre attività offshore.</p>
            <form id="newsletter-form" class="flex">
              <input type="email" required placeholder="Email" data-i18n="footer.emailPlaceholder" class="bg-white/10 border border-white/20 text-white p-3 flex-grow text-sm focus:outline-none focus:border-secondary transition-all rounded-l" />
              <button type="submit" class="bg-secondary px-4 text-white hover:brightness-110 transition-all rounded-r flex items-center justify-center" aria-label="Subscribe">
                <span class="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </form>
            <p id="newsletter-msg" class="text-xs text-secondary-fixed mt-2 hidden">Grazie per esserti iscritto!</p>
          </div>

        </div>

      </div>

      <!-- Copyright Sub-bar -->
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-offshore-white/50 uppercase">
        <span>© 2026 Bambini S.p.A. - Marina di Ravenna. P.IVA 00063620392. <span data-i18n="footer.rightsReserved">Tutti i diritti riservati.</span></span>
        <div class="flex gap-6">
          <span data-i18n="footer.madeInItaly">Made in Italy</span>
          <span data-i18n="footer.offshoreExcellence">Offshore Excellence</span>
        </div>
      </div>
    </footer>
  `;

  const form = container.querySelector('#newsletter-form');
  const msg = container.querySelector('#newsletter-msg');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.classList.remove('hidden');
      form.reset();
      setTimeout(() => msg.classList.add('hidden'), 4000);
    });
  }
}
