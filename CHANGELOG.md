# Changelog

All notable changes to **SMVDU Green Atlas** (formerly **SMVDU Floris**) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.1.6] - 2026-11-20

### Added
- **Native Windows Desktop Installers (Tauri v2):** Built and published native Windows installers for **x64** (`.exe` / `.msi`), **x86 32-bit** (`.exe` / `.msi`), and **ARM64** (`.exe`) alongside the Progressive Web App.

### Changed
- **Service Worker Cache Bump (`v3.1.6`):** Updated `sw.js` cache namespaces (`smvdu-green-atlas-v3.1.6` and `smvdu-green-atlas-gis-tiles-v3.1.6`) so returning PWA users automatically purge `v3.1.5` assets and fetch the updated database scripts and stylesheets.

### Fixed
- **QR Deep-Link Resolution in Local & Tauri Environments (`js/database.js`):** Resolved `localhost`, `127.0.0.1`, `tauri.localhost`, `tauri:`, and `file:` origins to the public GitHub Pages base URL (`https://ekakaul.github.io/GreenAtlas/`) so generated specimen QR codes and plaques always point to a scannable public link.
- **Offline QR Download Fallback (`js/database.js`):** Prevented blocked `window.open(..., '_blank')` popup attempts inside Tauri desktop/mobile WebViews when remote QR image fallback downloads fail, displaying an inline offline status message instead.
- **Stylesheet Deduplication & Print Orientation (`css/database.css`):** Removed duplicate `.hazard-unknown` and `.qr-frame img` CSS declarations already defined in `style.css` and aligned plaque print engine documentation with the `6in x 4in` landscape plate layout.

## [3.1.5] - 2026-11-18

### Added
- **Botanical Synonyms & Voucher Cross-Referencing**: Added `synonyms` and `duplicateOf` schema fields in `js/data.js`, enabling search, CSV exports, `research.html` hovercards, and the Specimen Inspection Modal to resolve legacy binomial synonyms and duplicate voucher records to their canonical taxon.
- **Toxicological Agent & First-Aid Visibility**: Updated the Specimen Inspection Modal in `js/database.js` to display active chemical compounds (`toxicAgent`) and field first-aid notes (`firstAid`) for `Toxic` and `Mild Irritant` specimens.
- **Live Home Page Telemetry Sync**: Connected `index.html` and `js/main.js` to `getCampusTelemetry()` via `smvdu:dataready` and `smvdu:datachanged` events so catalogued taxa, verified counts, georeferenced counts, and family totals reflect newly logged field observations automatically.
- **ID & Synonym Search in Safety Triage**: Extended `js/safety.js` filtering to match specimen IDs and botanical synonyms alongside binomials, common names, Dogri names, and active toxins.

### Changed
- **Service Worker Cache Hardening (`v3.1.5`)**: Upgraded `sw.js` (`smvdu-green-atlas-v3.1.5`) to fetch app-shell and CDN assets with `cache: 'no-cache'` during installation, added LRU tile trimming (`500` tile cap) for ArcGIS basemaps, and enabled query-safe navigation fallback (`ignoreSearch: true`) for offline QR deep links.
- **Documentation & Repository Metadata**: Updated `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, and `.gitignore` for `v3.1.5` and the `ekakaul/GreenAtlas` repository path.

### Fixed
- **Strict Toxicity Fallback Normalization**: Updated `normalizeStoredToxicity()` so unassessed or unrecognized toxicity strings resolve consistently to `Unknown / Not assessed` across `js/data.js`, `js/database.js`, `js/maps-core.js`, `js/maps-controls.js`, and `js/safety.js`.

---

## [3.1.1] - 2026-10-19

### Added
- **Rebrand to SMVDU Green Atlas**: Transitioned platform branding from *SMVDU Floris* across all five HTML pages, navigation headers, footers, `manifest.json`, and `SECURITY.md`. Added a centred **GREEN ATLAS** wordmark to the sticky, scroll-aware navigation header.
- **Expanded & Verified Flora Catalogue**: Increased total records from 116 to **175 taxa** (`SMVDU-FL-001` through `SMVDU-FL-175`) across **69 documented families**, adding 59 new verified entries (`FL-117` to `FL-175`) and a per-record `verified` flag covering 73 records.
- **Verified Filtering & Datasheet Exports**: Added a **Verified Only** quick toggle, dynamic sector/habit dropdown filters, an **Unknown / Not assessed** toxicity filter, a separate **Verified CSV** export action, and bundled `master-datasheet.csv` (175 records) and `verified-datasheet.xlsx` (73 records).
- **Local QR Generation**: Added locally vendored `js/qrcode.min.js` (`qrcode-generator` v1.4.4) for offline-first QR code generation and 4×6 printable botanical plaques, keeping the remote QR API strictly as a fallback.
- **WGS84 Geodesy & Campus Boundary**: Added GeographicLib (`v1.52.1`) ellipsoidal geodesy calculations for sector and campus areas/perimeters, a distinct campus boundary polygon, a retractable map legend, fullscreen mode, a **Clear** pinpoint button, and sector deep linking (`maps.html?sector=…`).
- **Evidence-Based Ecological Audit**: Added a data-scope and limitations notice to `research.html`, live data-derived metrics, a sector composition table (including an *Unassigned* row), a 6-phase field survey timetable, interactive plant hovercards, and one-click institutional citation copying with `aria-live` feedback.
- **Safety Disclaimer & Unknown Toxicity Tier**: Added a clinical-limitation notice and a fourth **Unknown / Not assessed** toxicity tier to `safety.html` so missing values are never defaulted to *Safe*.
- **PWA Icon Suite**: Added 10 physical favicon, Apple touch, and PWA icon assets under `icons/` (`32×32`, SVG, Apple touch icon, and `72` to `512 px` PNGs).
- **Security Hardening**: Implemented an enforcing `Content-Security-Policy` meta tag and `strict-origin-when-cross-origin` referrer policy across all five pages, plus SHA-512 Subresource Integrity (`SRI`) attributes on Font Awesome, Leaflet, MarkerCluster, and GeographicLib.

### Changed
- **Home Page Architecture**: Redesigned the hero into a stacked "SMVDU / Green Atlas" title with the tagline *Identify – Document – Map – Connect* and contained release telemetry cards, removing IndexedDB initialization from the landing page to speed up initial load.
- **Modular GIS Architecture**: Split the monolithic `js/maps.js` into `js/maps-core.js` (map setup, WGS84 geodesy, layers, markers) and `js/maps-controls.js` (sector controls, accessibility, export, pinpoint, session restore), retaining `js/maps.js` as a documentation stub.
- **GeoJSON Export**: Upgraded GeoJSON export to respect the active sector filter and include sector polygons, the campus boundary polygon, area/perimeter properties, and generation metadata alongside flora points.
- **IndexedDB Schema & Migration (v4)**: Upgraded `SMVDU_BIO_INDEXED_DB` to schema version 4 with a verification index, automatically relocating legacy user observations with IDs `117+` to prevent collisions with the 59 new seed records.
- **CSV Export Hardening**: Upgraded CSV generation to 16 columns with full text quoting, doubled internal quotes, spreadsheet formula-injection prefixing (`=`, `+`, `-`, `@`), UTF-8 BOM encoding for Dogri script compatibility, and Blob-based downloads.
- **Accessibility & Responsive Design**: Expanded ARIA attributes across the site from 20 to 184, added 25 `:focus-visible` style rules, skip links, `aria-current` navigation states, modal focus trapping, inert backgrounds, `prefers-reduced-motion` support, native `<details>`/`<summary>` hazard cards, and horizontal table scroll hints.
- **Service Worker Cache**: Bumped service worker cache to `smvdu-green-atlas-v3.1.1`, caching the new icon set, local QR library, and split GIS modules while removing the unused `html5-qrcode` dependency.

### Fixed
- **Unsupported Research Claims**: Removed unsubstantiated hardcoded claims from `research.html` (1,420 tCO₂e/yr sequestration, 3.18 Shannon–Wiener index, 14.2% invasive pressure, "PEER REVIEWED" badge, and 6/6 survey completion).
- **Data Coercion & Observation Validation**: Stopped coercing missing toxicity to *Safe* or missing IUCN status to *Least Concern*; removed fallback coordinates from observation intake in favor of strict global/campus bounds validation, duplicate-entry warnings, image MIME/size validation (`10 MB` cap), and confirmed IndexedDB write reporting.
- **XSS & Injection Prevention**: Replaced unescaped HTML notification injection in the map controller with `textContent` and enforced HTML escaping across table rows, map popups, hazard cards, hovercards, and print plaques.
- **Medical Emergency Dialler**: Updated the SMVDU Medical Centre link on `safety.html` to `+91 1991 285524` without automatic DTMF pause dialling (`,,2222`), instructing callers to request extension `2222` manually.

---

## [2.3.0] - Baseline Release (SMVDU Floris)

### Added
- **5-Page Static PWA Architecture**: Built a zero-build progressive web app (`index.html`, `database.html`, `maps.html`, `research.html`, `safety.html`) with a web app manifest (`manifest.json`) and offline service worker (`sw.js`, cache `smvdu-floris-v2.3.0`) featuring network-first navigation, cache-first static assets, and a dedicated ArcGIS tile cache (`smvdu-floris-gis-tiles-v2`).
- **116-Taxa Master Botanical Dataset**: Curated 116 georeferenced vascular plant records (`SMVDU-FL-001` to `SMVDU-FL-116`) across 60 botanical families spanning four ecological zones (*Pine Ridge Belt*, *Academic Avenue*, *Lower Scrublands*, and *Ravine Corridors*) with scientific names, Dogri vernacular names, phenology, IUCN status, and toxicity metadata.
- **IndexedDB Storage Engine (`js/data.js`)**: Implemented `SMVDU_BIO_INDEXED_DB` (v2) with in-memory synchronous caching, automatic baseline seeding, live telemetry aggregation, and client-side field observation persistence.
- **Herbarium Database & Plaque Engine (`database.html`, `js/database.js`)**:
  - 15-item paginated ledger with live search and multi-facet filtering (Sector Zone, Plant Habit, Toxicity Profile).
  - Specimen detail inspection modal and dedicated QR code modal with `?q=ID` deep linking.
  - Field observation intake form with one-tap HTML5 Geolocation GPS capture and client-side canvas image resizing/compression (`1600px` HD JPEG).
  - Printable 4×6 inch physical botanical plaque generator (`@page` print layout) and full-catalogue CSV export.
- **Interactive Vegetation GIS Atlas (`maps.html`, `js/maps.js`)**:
  - Leaflet (`v1.9.4`) and Leaflet.markercluster (`v1.5.3`) map with Street, Satellite, and Topographic ArcGIS basemaps.
  - Interactive sector polygons with geodesic area/perimeter calculations, collapsible Sector Inspector sidebar, coordinate pinpoint dropper, GeoJSON point export, and 24-hour `localStorage` session recovery toast.
- **Sustainability Audit & Safety Triage (`research.html`, `safety.html`)**:
  - Ecological sampling methodology overview, sector biomass breakdown, 6-phase DYD Batch of 2026 survey timetable, and click-to-select institutional citation box.
  - Clinical toxicity filter pills (*Safe*, *Mild Irritant*, *Toxic*), searchable hazard profile cards with active chemical compounds and first-aid actions, exposure triage table, and SMVDU Medical Centre quick-call action.
- **Theme & Navigation System (`css/style.css`, `js/main.js`)**: Implemented instant light/dark theme loading (`smvdu_floris_theme`) with OS `prefers-color-scheme` detection, cross-tab storage sync, retractable navigation drawer, and smooth page transitions.