# Steam Lab (Slab) – Premium Vape Website

Cinematische Scroll-Snap-Website für die E-Vape-Marke **Steam Lab (Slab)**
mit 6 Geschmackswelten, Jugendschutz-Abfrage (18+), Cookie-Banner und
Set-Konfigurator.

## Sorten

1. **Wave Rider** – Kiwi Erdbeere
2. **Fata Morgana** – Wassermelone Honigmelone
3. **Black Berry** – Johannisbeere
4. **Steam Press** – Apfel Berry
5. **Doppelbass** – Himbeere Blaubeere
6. **Frost Aufguss** – Menthol

## Preise

- Kartusche: **4 €**
- Starter-Set mit Akku: **10 €**
- Nachfüllflasche mit Slab-Logo: **6 €** (Preis in `src/data/flavors.ts` anpassbar)
- Pod-System wiederauffüllbar, Platz für 2 Liquids

## Tech-Stack

- React 18 + Vite + TypeScript
- Tailwind CSS 3
- Framer Motion (Animationen, 3D-Maus-Parallax, Partikel)
- react-intersection-observer (aktive Sektion → dynamischer Hintergrund)
- CSS `scroll-snap-type: y mandatory` (keine Scroll-Hijacker)

## Entwicklung

```bash
npm install
npm run dev      # Dev-Server
npm run build    # Produktions-Build (dist/)
npm run preview  # Build lokal testen
```

## Eigene Bilder einbinden

Siehe [`public/images/README.md`](public/images/README.md) – Design-Fotos
unter festen Dateinamen ablegen, fertig. Bis dahin zeigt die Seite
automatisch generierte Platzhalter.
