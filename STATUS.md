# status

state: active
remote: github-public
updated: 2026-09-11
stale-after-days: 30

## kpi
None. This is a client-style demo site; whether it looks and runs right is not a number.
Declared deviation from the 1-3 KPI rule.

## now
Published on GitHub Pages: a responsive Vite + Tailwind site for Bambini S.p.A.
Branch feature/meeting-revisions-2026-09 applies two client meetings (2026-09): towing removed
everywhere; fleet rebuilt from the 17 real vessels and 23 real photos of bambinispa.it; map
regenerated from Natural Earth with the live site's 16 ports; homogeneous blue palette; dynamic
home (scrimmed video-ready hero, counters, service panels, fleet scroll strip, photo band);
new media.html gallery with a video slot; careers list of 33 roles on board and ashore (3 real,
30 marked as examples); logo v2 in two directions (public/brand/v2/logo-v2.html, v2-A
recommended) with metal keychain engraving files and mockup. Two review rounds; the last
round's 1 blocker, 1 major and 5 minors are fixed and verified in the browser. Not merged:
merging to main deploys it.

## backlog
- client picks logo v2-A or v2-B; then it replaces the boat icon in header/footer and gets a
  simplified favicon (the palms do not read below 32 px)
- keychains: 250 laser-engraved pieces about EUR 275-480 excl. VAT on supplier list prices;
  proposal to the client about EUR 2.00-2.20/pc; no quote requested yet
- AI drone video for the hero and media.html (Veo 3.1 Fast about USD 0.12/s at 1080p, about
  USD 1 per 8 s clip; Sora API closes 2026-09-24): needs the owner's go-ahead and a key in the
  keychain (nqwrc/GEMINI_API_KEY); drop the file at public/video/hero-drone.mp4 and add
  data-hero-video on the home hero (media.html picks it up by itself)
- AI still images still in use: only the home hero poster
- deploy blocked: GitHub Actions starts no job on the account since 2026-09-07 (spending
  limit), so a merge to main would not publish Pages until billing is fixed
- confirm with the client: "Unitech" as a reference is the Norwegian Unitech Energy (no Italian
  offshore Unitech exists); Modello 231 and anticorruption policy on compliance.html are not on
  the live site
- reference-scrape folders (the ten bambini_s.p.a._* dirs plus maritime_excellence/,
  ~5.4 MB, unreferenced by any built page) still hold the old towing copy; keep or remove is
  the owner's decision (flagged 2026-08-20)
