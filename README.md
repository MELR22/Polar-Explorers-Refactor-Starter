# Polar Explorers refactor starter

A small browser only demo arranged so new tours can reuse shared screens, layout and storage code. The story, riddle wording, call captions, map facts and selected media are carried over from the original Escape Tromsø project; this starter only trims the experience to nine demo stages.

## Run it

Serve this folder over HTTP (ES modules and media do not work reliably from `file://`):

```sh
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Where to begin

- `src/app/` starts and runs a tour.
- `src/components/` contains reusable screen implementations.
- `src/tours/polar-explorers/` contains this tour's manifest and story data.
- `src/styles/` contains shared design tokens and layout.
- `assets/` contains the selected original media.
- `docs/architecture.md` describes the suggested expansion path.

The demo uses the original mission-phone palette from `CSS/intro_v2.css` (deep blue surfaces and yellow highlights), rather than the tester landing page colors. Each folder has a short README with its responsibility and a concrete example. To add a tour, add its content and manifest under `src/tours/`, then register any new screen types in `src/components/steps.js`.
