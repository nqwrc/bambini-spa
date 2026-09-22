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
licence, S4 home (hero poster, today counters, timeline, real facts, news), S7 azienda.html
and news.html (new), S6b vessel-detail from fleet.json by ?id= plus three example vacancies
(verified:false, blocked in production) with the full apply flow. Pages still on the generated
mockup: aree-intervento, hseq, compliance. Media: official vessel photos (16/17) and the
official spec table (LOA, beam, deck, speed, pax, goods, water, fuel) from bambinispa.it,
referenced not copied; hero on the Blue Brother photo with Ken Burns; three real vacancies
from bambinispa.it/lavora-con-noi, applications routed to info@ (official channel).

## backlog
- pitch to the company: problem + solution per finding (see issue log 2026-09-22)
- S8 hseq.html, aree-intervento.html, compliance.html cleanup, FR in js/translations.js
- data to collect, in blocking order: 7 department contacts, high-res originals of the
  photos plus Blue Cami, build year/yard/flag/refit per vessel, timeline events
  2020/2022/2023/2025, counters, certification audit dates, vacancy dates, clients
- reference-scrape folders (the ten bambini_s.p.a._* dirs plus maritime_excellence/,
  ~5.4 MB, unreferenced by any built page) are dead weight in the public tree; keep or
  remove is the owner's decision (flagged 2026-08-20)
