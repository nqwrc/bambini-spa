export function initRfqStepper() {
  const form = document.getElementById('rfq-form');
  if (!form) return;

  window.nextStep = function(step) {
    document.querySelectorAll('.rfq-step').forEach(el => el.classList.remove('active'));
    const targetStep = document.getElementById('step-' + step);
    if (targetStep) targetStep.classList.add('active');

    for (let i = 1; i <= 3; i++) {
      const indicator = document.getElementById('step-indicator-' + i);
      if (!indicator) continue;
      if (i < step) {
        indicator.className = 'relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold transition-colors';
        indicator.innerHTML = '<span class="material-symbols-outlined text-sm">check</span>';
      } else if (i === step) {
        indicator.className = 'relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-on-secondary font-bold transition-colors';
        indicator.innerHTML = step;
      } else {
        indicator.className = 'relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface-variant font-bold transition-colors';
        indicator.innerHTML = i;
      }
    }

    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const origText = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-sm">sync</span> Invio in corso...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<span class="material-symbols-outlined text-sm">check_circle</span> Richiesta Inviata con Successo!';
        btn.className = 'bg-green-600 text-white px-10 py-3 rounded-lg font-label-lg shadow-md';
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.className = 'bg-secondary text-on-secondary px-10 py-3 rounded-lg font-label-lg hover:bg-secondary/90 transition-all shadow-md';
          btn.disabled = false;
          form.reset();
          window.nextStep(1);
        }, 3000);
      }, 1200);
    }
  });

  // Radio label selection highlights
  const radioLabels = form.querySelectorAll('label.rfq-radio-card');
  radioLabels.forEach(label => {
    label.addEventListener('click', () => {
      radioLabels.forEach(l => l.classList.remove('border-secondary', 'bg-secondary/5'));
      label.classList.add('border-secondary', 'bg-secondary/5');
    });
  });
}
