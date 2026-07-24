(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const p={it:{nav:{services:"Servizi",fleet:"La Flotta",areas:"Aree di Intervento",hseq:"HSEQ & Sostenibilità",compliance:"Compliance & Ethics",contact:"Contatti",careers:"Lavora con Noi",clientPortal:"Client Portal",requestQuote:"Richiedi Preventivo"},footer:{tagline:"Eccellenza marittima e supporto logistico integrato dal 1962.",navigation:"Navigazione",legal:"Legale & Privacy",newsletterTitle:"Newsletter",newsletterDesc:"Rimani aggiornato sulle nostre attività offshore.",emailPlaceholder:"La tua email",privacyPolicy:"Privacy Policy",cookiePolicy:"Cookie Policy",legalNotice:"Note Legali",ethicsCode:"Codice Etico",rightsReserved:"Tutti i diritti riservati.",madeInItaly:"Made in Italy",offshoreExcellence:"Offshore Excellence"},cookie:{text:"Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Continuando accetti la nostra privacy policy.",preferences:"Preferenze",accept:"Accetta e Chiudi"}},en:{nav:{services:"Services",fleet:"Fleet",areas:"Areas of Operation",hseq:"HSEQ & Sustainability",compliance:"Compliance & Ethics",contact:"Contact",careers:"Careers",clientPortal:"Client Portal",requestQuote:"Request Quote"},footer:{tagline:"Maritime excellence and integrated logistics support since 1962.",navigation:"Navigation",legal:"Legal & Privacy",newsletterTitle:"Newsletter",newsletterDesc:"Stay updated with our offshore operations.",emailPlaceholder:"Your email",privacyPolicy:"Privacy Policy",cookiePolicy:"Cookie Policy",legalNotice:"Legal Notice",ethicsCode:"Ethics Code",rightsReserved:"All rights reserved.",madeInItaly:"Made in Italy",offshoreExcellence:"Offshore Excellence"},cookie:{text:"We use cookies to enhance your experience on our website. By continuing you agree to our privacy policy.",preferences:"Preferences",accept:"Accept & Close"}}};function d(){return localStorage.getItem("bambini_lang")||"it"}function f(e){e!=="it"&&e!=="en"&&(e="it"),localStorage.setItem("bambini_lang",e),document.documentElement.lang=e,u(e)}function u(e){const o=e||d();document.documentElement.lang=o,document.querySelectorAll("[data-i18n]").forEach(t=>{const i=t.getAttribute("data-i18n").split(".");let a=p[o];for(const l of i)a&&(a=a[l]);a&&(t.tagName==="INPUT"&&t.type==="placeholder"?t.placeholder=a:t.textContent=a)}),document.querySelectorAll(".lang-switch-btn").forEach(t=>{t.getAttribute("data-lang")===o?(t.classList.add("font-bold","text-secondary"),t.classList.remove("opacity-60")):(t.classList.remove("font-bold","text-secondary"),t.classList.add("opacity-60"))})}function v(){const e=d();f(e)}function g(){const e=document.getElementById("app-header");if(!e)return;const t=window.location.pathname.split("/").pop()||"index.html",r=[{href:"servizi.html",key:"nav.services",label:"Servizi",active:t==="servizi.html"},{href:"flotta.html",key:"nav.fleet",label:"Flotta",active:t==="flotta.html"||t==="vessel-detail.html"},{href:"aree-intervento.html",key:"nav.areas",label:"Aree di Intervento",active:t==="aree-intervento.html"},{href:"hseq.html",key:"nav.hseq",label:"HSEQ",active:t==="hseq.html"},{href:"compliance.html",key:"nav.compliance",label:"Compliance",active:t==="compliance.html"},{href:"contatti.html",key:"nav.contact",label:"Contatti",active:t==="contatti.html"},{href:"lavora-con-noi.html",key:"nav.careers",label:"Careers",active:t==="lavora-con-noi.html"}],i=r.map(n=>`
    <a href="${n.href}" data-i18n="${n.key}" class="font-label-lg text-label-lg uppercase tracking-wider transition-all px-3 py-1 ${n.active?"text-primary font-bold border-b-2 border-primary":"text-on-surface-variant hover:text-primary"}">
      ${n.label}
    </a>
  `).join(""),a=r.map(n=>`
    <a href="${n.href}" data-i18n="${n.key}" class="block py-3 px-6 text-on-surface hover:bg-surface-container font-label-lg uppercase border-b border-outline-variant/30 ${n.active?"text-primary font-bold bg-surface-container-low":""}">
      ${n.label}
    </a>
  `).join("");e.innerHTML=`
    <header class="w-full top-0 sticky z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant transition-all duration-300">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-20">
        <!-- Logo -->
        <a href="index.html" class="flex items-center gap-2 group">
          <span class="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">directions_boat</span>
          <span class="font-headline-md text-headline-md font-bold text-primary tracking-tight">Bambini S.p.A.</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-2">
          ${i}
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
          <a href="contatti.html" data-i18n="nav.requestQuote" class="hidden sm:flex items-center gap-2 bg-secondary text-on-primary px-5 py-2.5 rounded font-label-lg uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all text-xs">
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
          ${a}
          <div class="p-4 bg-surface-container-low flex justify-center">
            <a href="contatti.html" data-i18n="nav.requestQuote" class="w-full text-center bg-secondary text-on-primary py-3 rounded font-label-lg uppercase tracking-wider block">
              Richiedi Preventivo
            </a>
          </div>
        </div>
      </div>
    </header>
  `,e.querySelectorAll(".lang-switch-btn").forEach(n=>{n.addEventListener("click",h=>{const m=h.target.getAttribute("data-lang");f(m)})});const l=e.querySelector("#mobile-menu-toggle"),s=e.querySelector("#mobile-dropdown"),c=e.querySelector("#menu-icon");l&&s&&l.addEventListener("click",()=>{s.classList.contains("hidden")?(s.classList.remove("hidden"),c.textContent="close"):(s.classList.add("hidden"),c.textContent="menu")})}function x(){const e=document.getElementById("app-footer");if(!e)return;e.innerHTML=`
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
  `;const o=e.querySelector("#newsletter-form"),t=e.querySelector("#newsletter-msg");o&&t&&o.addEventListener("submit",r=>{r.preventDefault(),t.classList.remove("hidden"),o.reset(),setTimeout(()=>t.classList.add("hidden"),4e3)})}function b(){if(localStorage.getItem("bambini_cookie_accepted"))return;const e=document.createElement("div");e.id="cookie-banner",e.className="fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant p-4 z-[100] transform translate-y-full transition-transform duration-500 shadow-xl",e.innerHTML=`
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
  `,document.body.appendChild(e),setTimeout(()=>{e.classList.remove("translate-y-full")},1500),e.querySelector("#accept-cookie-btn").addEventListener("click",()=>{localStorage.setItem("bambini_cookie_accepted","true"),e.classList.add("translate-y-full"),setTimeout(()=>e.remove(),600)})}function y(){const e={threshold:.1,rootMargin:"0px 0px -50px 0px"},o=new IntersectionObserver(t=>{t.forEach(r=>{r.isIntersecting&&(r.target.classList.add("visible"),o.unobserve(r.target))})},e);document.querySelectorAll("section, .scroll-reveal").forEach(t=>{t.classList.contains("scroll-reveal")||t.classList.add("scroll-reveal"),o.observe(t)})}document.addEventListener("DOMContentLoaded",()=>{g(),x(),b(),v(),y()});
