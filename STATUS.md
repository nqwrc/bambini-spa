# status

state: active
remote: github-public
updated: 2026-09-22
stale-after-days: 30

## kpi
None. This is a client-style demo site; whether it looks and runs right is not a number.
Declared deviation from the 1-3 KPI rule.

## now
Redesign in progress from the design canvas of 2026-09-22. Done and deployed to GitHub
Pages (deploy.yml runs on every push to main): S1 data/*.json + prebuild guardrail, S2 motion
base (opt-in reveal, count-up, reduced-motion), S3 contatti with department router and real
footer, S5 flotta (17 vessels from fleet.json, live-count filters, refit table), S6 servizi and
lavora-con-noi (services from the real fleet, dated positions, mailto applications), MIT
licence. Pages still on the generated mockup: index, vessel-detail, aree-intervento, hseq,
compliance.

## backlog
- S4 home (index.html rows 46-69 still show 50+/400+; hero video, timeline, news)
- S6b vessel-detail.html (?id= from fleet.json; invented Blue Brother specs still live)
- S7 azienda.html + news.html (new pages, vite.config.js input)
- S8 hseq.html, aree-intervento.html, compliance.html cleanup, FR in js/translations.js
- data to collect, in blocking order: 8 department contacts, real photos, fleet spec
  sheets, timeline events 2020/2022/2023/2025, counters, certification audit dates,
  open positions with dates, publishable clients
- reference-scrape folders (the ten bambini_s.p.a._* dirs plus maritime_excellence/,
  ~5.4 MB, unreferenced by any built page) are dead weight in the public tree; keep or
  remove is the owner's decision (flagged 2026-08-20)
