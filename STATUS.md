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
Branch feature/meeting-revisions-2026-09 applies the 2026-09 client meeting: towing
(rimorchio) removed everywhere, fleet rebuilt from the 17 real vessels and photos of
bambinispa.it, intervention-area map regenerated from Natural Earth with the 16 ports of the
live site (Ortona's Florida pin fixed), real HQ address/phone, two logo proposals in
public/brand/logo-compare.html. Not merged: merging to main deploys it.

## backlog
- client picks logo version A or B, then it replaces the boat icon in header/footer and
  gets a simplified favicon (neither mark reads as a B at 16 px)
- AI drone video of an FSIV for the home hero (paid generation, needs the owner's go-ahead);
  drop it at public/video/hero-drone.mp4 and add data-hero-video to the hero div
- AI images still in use: home hero, contatti/lavora-con-noi/hseq heroes and photos
- unverified draft claims to confirm with the client: Modello 231 and anticorruption policy
  (not on the live site), satellite monitoring and "Zero Oil Spills" cards on hseq, "Supporto
  Tecnico H24", P.IVA (removed, the live site does not publish it)
- reference-scrape folders (the ten bambini_s.p.a._* dirs plus maritime_excellence/,
  ~5.4 MB, unreferenced by any built page) are dead weight in the public tree; keep or
  remove is the owner's decision (flagged 2026-08-20)
