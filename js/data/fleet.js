// Fleet data as published on bambinispa.it (fleet, FSIV and utility pages), read 2026-09-11.
// Year built, flag and IMO are not published there, so they are not listed here either.
// Photos are the ones on the live site, resized into public/img/flotta/.

export const FLEET_CATEGORIES = [
  { id: 'fsiv', label: 'FSIV' },
  { id: 'crew', label: 'Crew Boats' },
  { id: 'utility', label: 'Utility' },
];

export const FLEET = [
  { slug: 'famar-intervention', name: 'Famar Intervention', category: 'fsiv', cls: 'FSIV DP2 FiFi1', loa: 54.0, beam: 9.0, speed: 27, pax: 58, deck: '192 m²', cargo: 250, photos: 2 },
  { slug: 'blue-mommy', name: 'Blue Mommy', category: 'fsiv', cls: 'FSIV DP2 FiFi1', loa: 56.0, beam: 9.36, speed: 28, pax: 71, deck: '210 m²', cargo: 200, photos: 2 },
  { slug: 'blue-ludo', name: 'Blue Ludo', category: 'fsiv', cls: 'FSIV DP2 FiFi1', loa: 55.1, beam: 10.0, speed: 25, pax: 72, deck: '200 m²', cargo: 226, photos: 1 },
  { slug: 'blue-giulia', name: 'Blue Giulia', category: 'fsiv', cls: 'FSIV DP2', loa: 50.7, beam: 9.1, speed: 23, pax: 72, deck: '223 m²', cargo: 279, photos: 2 },
  { slug: 'blue-brother', name: 'Blue Brother', category: 'fsiv', cls: 'FSIV DP1 FiFi1', loa: 51.3, beam: 9.2, speed: 27, pax: 71, deck: '200 m²', cargo: 180, photos: 1 },
  { slug: 'blue-daddy', name: 'Blue Daddy', category: 'fsiv', cls: 'FSIV DP1 FiFi1', loa: 51.43, beam: 9.2, speed: 29, pax: 71, deck: '25,00 × 7,20 m', cargo: 200, photos: 1 },
  { slug: 'blue-asia', name: 'Blue Asia', category: 'fsiv', cls: 'FSIV DP1 FiFi1', loa: 53.35, beam: 9.76, speed: 25, pax: 80, deck: '242 m²', cargo: 223, photos: 1 },
  { slug: 'blue-mati', name: 'Blue Mati', category: 'fsiv', cls: 'FSIV DP1 FiFi1', loa: 51.82, beam: 9.76, speed: 23, pax: 70, deck: '260 m²', cargo: 200, photos: 1 },
  { slug: 'blue-cami', name: 'Blue Cami', category: 'fsiv', cls: 'FSIV DP1', loa: 51.67, beam: 9.14, speed: 21, pax: 70, deck: '242 m²', cargo: 180, photos: 1 },
  { slug: 'volo', name: 'Volo', category: 'fsiv', cls: 'FSIV', loa: 50.0, beam: 9.1, speed: 26, pax: 70, deck: '181 m²', cargo: 150, photos: 1 },
  { slug: 'blue-boy', name: 'Blue Boy', category: 'crew', cls: 'Crew Boat', loa: 42.68, beam: 8.16, speed: 25, pax: 55, deck: '21,10 × 6,40 m', cargo: 114, photos: 1 },
  { slug: 'blue-lady', name: 'Blue Lady', category: 'crew', cls: 'Crew Boat', loa: 41.0, beam: 8.2, speed: 23, pax: 60, deck: '22,90 × 7,00 m', cargo: 165, photos: 1 },
  { slug: 'mare-diamante', name: 'Mare Diamante', category: 'crew', cls: 'Crew Boat', loa: 47.63, beam: 9.14, speed: 23, pax: 45, deck: '28,00 × 7,50 m', cargo: 200, photos: 1 },
  { slug: 'mare-rubino', name: 'Mare Rubino', category: 'crew', cls: 'Crew Boat', loa: 47.63, beam: 9.14, speed: 23, pax: 70, deck: '28,00 × 7,50 m', cargo: 230, photos: 1 },
  { slug: 'skorpion', name: 'Skorpion', category: 'crew', cls: 'Crew Boat', loa: 28.8, beam: 7.5, speed: 22, pax: 45, deck: '70 m²', cargo: 30, photos: 1 },
  // The live site gives 21 kn on one page and 25 kn on another; the lower figure is shown.
  { slug: 'sea-runner', name: 'Sea Runner', category: 'crew', cls: 'Crew-Utility Boat', loa: 35.71, beam: 7.46, speed: 21, pax: 47, deck: '18,50 × 5,40 m', cargo: 80, photos: 2 },
  { slug: 'melanie-b', name: 'Melanie B', category: 'utility', cls: 'Utility Vessel DP1', loa: 41.6, beam: 9.3, speed: 12, pax: 25, deck: '22,00 × 7,60 m', cargo: 130, photos: 1, extra: [['Acqua dolce', '78,50 m³'], ['Gasolio', '146,40 m³']] },
];

export function photoUrl(vessel, n = 1, size = '') {
  return `./img/flotta/${vessel.slug}-${n}${size ? `-${size}` : ''}.jpg`;
}

export function fmt(n) {
  return n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
