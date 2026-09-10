// Replaces the hero photo with a looping background video once one exists at
// the path in data-hero-video (e.g. public/video/hero-drone.mp4). Until then the
// photo stays, and nothing broken is ever shown.
export function initHeroVideo() {
  const hero = document.querySelector('[data-hero-video]');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const src = hero.dataset.heroVideo;
  fetch(src, { method: 'HEAD' })
    .then((res) => {
      const type = res.headers.get('content-type') || '';
      if (!res.ok || !type.startsWith('video/')) return;

      const video = document.createElement('video');
      Object.assign(video, { src, muted: true, loop: true, autoplay: true, playsInline: true });
      video.className = 'absolute inset-0 w-full h-full object-cover';
      video.setAttribute('aria-hidden', 'true');
      hero.prepend(video);
    })
    .catch(() => {});
}
