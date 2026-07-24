export function initMapNavigation() {
  window.scrollToLocation = function(id) {
    const target = document.getElementById(id);
    if (!target) return;

    const offset = 100;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    target.classList.add('ring-2', 'ring-secondary', 'ring-offset-4', 'transition-all', 'duration-500');
    setTimeout(() => {
      target.classList.remove('ring-2', 'ring-secondary', 'ring-offset-4');
    }, 2000);
  };
}
