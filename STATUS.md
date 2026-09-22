# status

state: active
remote: github-public
updated: 2026-09-22
stale-after-days: 30

## kpi
None. This is a client-style demo site; whether it looks and runs right is not a number.
Declared deviation from the 1-3 KPI rule.

## now
Redesign in progress, 8 guided sessions (S1-S8) from the design canvas of 2026-09-22.
S1 done: `data/*.json` (8 files, verified facts only, `null` placeholders) and
`scripts/check-data.mjs` as a prebuild guardrail (production mode blocks the build on
unverified contact channels). Site still published on GitHub Pages from the previous
build; the pages do not read `data/` yet.

## backlog
- S2 motion base (css/main.css tokens, scroll-animations.js rewrite, counter.js)
- S3 contatti diretti (contact-router.js, contatti.html, footer.js)
- S4 home, S5 flotta, S6 vessel-detail, S7 azienda + news, S8 hseq/lavora-con-noi/i18n
- data to collect, in blocking order: 8 department contacts, real photos, fleet spec
  sheets, timeline events 2020/2022/2023/2025, counters, certification audit dates
- reference-scrape folders (the ten bambini_s.p.a._* dirs plus maritime_excellence/,
  ~5.4 MB, unreferenced by any built page) are dead weight in the public tree; keep or
  remove is the owner's decision (flagged 2026-08-20)
