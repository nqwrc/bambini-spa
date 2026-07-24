export function initFleetFilter() {
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const vesselCards = document.querySelectorAll('.vessel-card');

  if (!filterBtns.length || !vesselCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Toggle button styles
      filterBtns.forEach(b => {
        b.classList.remove('active-tab', 'bg-primary', 'text-white');
        b.classList.add('border-outline-variant', 'text-on-surface-variant');
      });
      btn.classList.add('active-tab', 'bg-primary', 'text-white');
      btn.classList.remove('border-outline-variant', 'text-on-surface-variant');

      // Filter cards with smooth opacity transition
      vesselCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.style.display = 'block';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
}
