# Suggested architecture

## Layers

1. **App shell (`src/app/`)** owns navigation, progress, and shared services such as audio and persistence.
2. **Shared screens (`src/components/`)** own reusable presentation and interaction. They receive data and callbacks instead of importing another tour's content.
3. **Tour modules (`src/tours/<tour-id>/`)** own the ordered manifest, story copy, puzzle definitions, routes, and asset references.
4. **Assets (`assets/`)** hold media, with subfolders for larger collections.

## Adding a tour

Create a sibling folder under `src/tours/`, add a `tour.js` manifest, and provide the data needed by existing views. Add a screen view only when a tour introduces an interaction the shared screens cannot represent. Register new view keys in `src/components/steps.js`.

## Database later

Keep UI components independent of the transport. The current progress interface is `load(sessionId)` / `save(sessionId, progress)` in `src/app/progress-store.js`; an API-backed implementation can replace it without changing screen components. A database-backed content API can use stable IDs, for example:

```text
Tour(id, title, version, theme)
TourStep(id, tourId, position, view, contentId)
ContentBlock(id, tourId, kind, payload)
Asset(id, tourId, path, mimeType, altText)
Progress(sessionId, tourId, stepId, updatedAt)
```

Store stable identifiers and structured content rather than HTML strings. Validate content before rendering and keep a static-file mode so tours can still be previewed without a backend.

## A practical next refactor

Move the call captions/choices, map entries, and riddle cards into a consistent data shape; pass them into the shared views. Then implement a `LocalStorageProgressStore` behind the existing interface. Keep the memory store for fast demos and tests.
