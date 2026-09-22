# Bambini S.p.A. — Website

A responsive website for Bambini S.p.A., presenting the company's maritime heritage and positioning through a clean, modern web experience.

**[View the live site](https://nqwrc.github.io/bambini-spa/)**

## Highlights

- Brand-led responsive design
- Fast static site built with Vite and Tailwind CSS
- Production build ready for deployment on GitHub Pages

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Data

Dynamic content (fleet, news, timeline, contacts, certifications, counters, team)
lives in `data/*.json`. Only facts verified against public sources are filled in
(source and date are recorded on each entry); everything else is `null` and renders
as a visible placeholder on the site, never as an invented value. The department
contacts other than the switchboard and `info@` are unconfirmed and marked
`"verified": false`.

`npm run build` runs `scripts/check-data.mjs` first. With `BAMBINI_MODE=production`
the build stops while any published contact channel is unverified; without it
(mockup mode, the default) unverified items are listed as warnings.

## Media

Vessel photos and the hero image are Bambini S.p.A.'s own material, referenced from
bambinispa.it (not copied into this repository) and credited on the page, pending the
originals in high resolution. Fleet specifications come from bambinispa.it/flotta
(September 2026). No image on the site is generated.

## Stack

Vite, Tailwind CSS, JavaScript
