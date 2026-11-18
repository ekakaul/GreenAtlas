# 🌿 SMVDU Green Atlas

> **Identify • Document • Map • Connect**

[![Release](https://img.shields.io/badge/Release-v3.1.5-10b981.svg)](https://github.com/ekakaul/GreenAtlas/releases/tag/v3.1.5)
[![Platform](https://img.shields.io/badge/Platform-GitHub%20Pages-blue.svg)](https://ekakaul.github.io/GreenAtlas/)
[![Architecture](https://img.shields.io/badge/Architecture-Static%20PWA-orange.svg)](#-tech-stack--architecture)

**SMVDU Green Atlas** is an interactive Progressive Web Application (PWA) and digital ecological directory designed to catalog, map, and analyze the vascular flora across the Shri Mata Vaishno Devi University (SMVDU) campus in Kakryal, Katra (J&K)[cite: 24].

---

## 📸 Key Features & Capabilities

### 📖 Comprehensive Flora Database
* **175 Catalogued Taxa:** Documented across **69 botanical families**, featuring **73** verified specimen records and **116** georeferenced entries[cite: 24].
* **Smart Search, Synonyms & Filters:** Search by botanical name, taxonomic synonym, voucher cross-reference, common vernacular (Dogri/English), family, sector, toxicity tier, IUCN status, and phenology[cite: 24].
* **Offline Observation Logging:** Native browser-side data intake using IndexedDB (Schema v4) with client-side canvas image compression (`1600px` max), duplicate detection, and campus range validation[cite: 24].
* **Hardened Data Exports:** Export filtered or verified datasets directly to **CSV** with built-in spreadsheet formula-injection safeguards and UTF-8 BOM encoding[cite: 24].

### 🗺️ Interactive Vegetation GIS Maps
* **WGS84 Geodesy:** Accurate sector areas and perimeters calculated via GeographicLib (`v1.52.1`) and Leaflet (`v1.9.4`)[cite: 24].
* **Sector Breakdown:** Coverage across *Pine Ridge Belt*, *Academic Avenue*, *Lower Scrublands*, and *Ravine Corridors* with deep-link support (`maps.html?sector=...`)[cite: 24].
* **GIS Tools:** Retractable map legend, campus boundary overlay, custom toxicity markers, dark/light/satellite basemaps, fullscreen mode, coordinate pinpoint tool, and GeoJSON export[cite: 24].

### 🛡️ Toxicity & Safety Protocols
* **Safety Tiers:** Explicit clinical categorization (*Safe*, *Mild Irritant*, *Toxic*, and *Unknown / Not assessed*) so unassessed species are never defaulted to *Safe*[cite: 24].
* **Emergency Guidance:** Active toxicological compounds, field first-aid protocols, and direct SMVDU Medical Centre contact routing[cite: 24].

### 📌 QR Plaques & Field Identification
* **Local Offline Generation:** Uses an embedded QR generator (`js/qrcode.min.js`) to produce instant field deep links (`database.html?q=...`) and printable 4×6 inch botanical plaques without relying on external APIs[cite: 24].

### ⚡ Offline PWA Architecture
* **Fast & Static:** Zero server dependencies or build steps; hosted directly via GitHub Pages[cite: 24].
* **Service Worker Caching (`v3.1.5`):** Full offline access for core application pages, vendor assets, query-parameter deep links, and LRU-managed ArcGIS map tiles (`500` tile cap)[cite: 24].

---

## 🛠️ Tech Stack & Architecture

| Category | Technologies / Libraries |
|---|---|
| **Frontend** | HTML5, CSS3 (Custom Properties, Flexbox/Grid), Vanilla JavaScript (ES6+)[cite: 24] |
| **GIS & Mapping** | [Leaflet.js](https://leafletjs.com/), [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster), [GeographicLib](https://geographiclib.sourceforge.io/)[cite: 24] |
| **Storage & PWA** | Service Worker API (`sw.js`), IndexedDB API (`v4`), Web App Manifest (`manifest.json`)[cite: 24] |
| **Security** | Content Security Policy (CSP), Subresource Integrity (SRI), HTML Output Sanitization, CSV Formula Guard[cite: 24] |
| **Icons & Fonts** | Font Awesome 6, Google Fonts (*Inter*, *JetBrains Mono*, *Playfair Display*)[cite: 24] |

---

## 📁 Repository Structure

```text
.
├── index.html               # Landing page & live campus ecological telemetry
├── database.html            # Searchable flora database, QR plaques & observation intake
├── maps.html                # Interactive GIS vegetation map interface
├── research.html            # Evidence-based ecological audit & sector composition
├── safety.html              # Clinical toxicity reference & emergency protocols
├── manifest.json            # PWA web app manifest & home-screen shortcuts
├── sw.js                    # Offline service worker & ArcGIS tile cache (v3.1.5)
├── css/                     # Global theme & page-specific stylesheets
├── js/                      # Modular controllers (data, main, database, maps-core, maps-controls, research, safety)
├── icons/                   # Favicons, Apple touch icon & maskable PWA icons
├── CHANGELOG.md             # Version history and release notes
├── CONTRIBUTING.md          # Local setup and contribution guidelines
├── SECURITY.md              # Vulnerability disclosure policy
└── LICENSE                  # Repository license
```

---

## 🚀 Local Preview

Because Service Workers and IndexedDB require an HTTP origin, run any static server from the repository root:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## 📄 License

Distributed under the terms specified in [`LICENSE`](LICENSE).