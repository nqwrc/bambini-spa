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

The intervention-area maps are generated from Natural Earth data; regenerate them after editing `scripts/map-points.json`:

```bash
npm run build:map
```

## Content sources

- **Real, from bambinispa.it:** the 17 vessels and their specifications, the vessel photos, the 16 reference ports on the map, the company's address and contacts, the certifications, and the three open positions marked as published.
- **Illustrative, for the prototype:** 30 of the 33 open positions on the careers page (each is marked "Posizione Esemplificativa" on the page) and the home hero image, which is AI-generated until the drone footage is ready.
- **Maps:** coastlines and borders from [Natural Earth](https://www.naturalearthdata.com/) via `world-atlas`.

## Stack

Vite, Tailwind CSS, JavaScript
