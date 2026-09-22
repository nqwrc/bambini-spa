// Hero video: plays only when a file exists (site.json heroVideo), the visitor has not asked
// for reduced motion and is not on a data-saver connection. Otherwise the poster stays.
// The <video> is muted, looped, playsinline and has no controls: motion, not media.
import site from '../../data/site.json';

export function initHeroVideo() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;
  const video = hero.querySelector('video');
  if (!video || !site.heroVideo) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduced || saveData) return;

  video.src = site.heroVideo;
  video.hidden = false;
  video.play().catch(() => {
    video.hidden = true; // autoplay refused: the poster is already there
  });
}
