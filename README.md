# 🌿 SMVDU Green Atlas

> **Identify • Document • Map • Connect**

[![Release](https://img.shields.io/badge/Release-v3.2.0-10b981.svg)](https://github.com/ekakaul/GreenAtlas/releases/tag/v3.2.0)
[![Live Portal](https://img.shields.io/badge/Live%20Portal-GitHub%20Pages-1e4620.svg)](https://ekakaul.github.io/GreenAtlas/)
[![Desktop](https://img.shields.io/badge/Desktop-Windows%20x64%20%7C%20x86%20%7C%20ARM64-0284c7.svg)](https://github.com/ekakaul/GreenAtlas/releases/tag/v3.2.0)
[![Architecture](https://img.shields.io/badge/Architecture-Static%20PWA%20%2B%20Tauri%20v2-b5835a.svg)](#-tech-stack--architecture)
[![License](https://img.shields.io/badge/License-GPLv3-6b7280.svg)](LICENSE)

**SMVDU Green Atlas** is an offline-capable Progressive Web Application (PWA), native desktop application, and digital botanical database built to catalog, georeference, and analyze vascular flora across the **Shri Mata Vaishno Devi University (SMVDU)** campus in Kakryal, Katra, Jammu & Kashmir.

---

## 🌐 Live Portal & Desktop Downloads

* **Web Application (PWA):** [ekakaul.github.io/GreenAtlas](https://ekakaul.github.io/GreenAtlas/)
* **Windows Desktop Installers (`v3.2.0`):** Available on the [GitHub Releases](https://github.com/ekakaul/GreenAtlas/releases/tag/v3.2.0) page:
  * **Windows 64-bit (`x64` — Intel/AMD):** `SMVDU Green Atlas_3.2.0_x64-setup.exe` (NSIS) or `SMVDU Green Atlas_3.2.0_x64_en-US.msi`
  * **Windows 32-bit (`x86`):** `SMVDU Green Atlas_3.2.0_x86-setup.exe` (NSIS) or `SMVDU Green Atlas_3.2.0_x86_en-US.msi`
  * **Windows ARM64 (Snapdragon):** `SMVDU Green Atlas_3.2.0_arm64-setup.exe`

---

## ✨ Core Modules & Capabilities

| Module | File | Capabilities |
|---|---|---|
| **Portal & Telemetry** | `index.html` | Live campus flora metrics synchronized with IndexedDB (`smvdu:dataready` / `smvdu:datachanged`), project scope, and quick module routing. |
| **Herbarium Database** | `database.html` | 175 catalogued taxa across 69 families (73 verified, 116 georeferenced); multi-facet search (botanical name, synonyms, voucher cross-references, Dogri/English vernacular, family, sector, toxicity, IUCN, phenology); offline field observation intake with GPS & canvas image compression (`1600px`); UTF-8 BOM CSV exports with formula-injection protection. |
| **QR & Plaque Engine** | `database.html` | Local offline QR generation (`js/qrcode.min.js`) resolving to public deep links (`database.html?q=ID`) and printable `6" × 4"` landscape botanical field plaques. |
| **Vegetation GIS Map** | `maps.html` | Interactive Leaflet (`v1.9.4`) + MarkerCluster map across 4 ecological sectors (*Pine Ridge Belt*, *Academic Avenue*, *Lower Scrublands*, *Ravine Corridors*), WGS84 geodesy (`GeographicLib v1.52.1`), campus boundary polygon, pinpoint dropper, and GeoJSON export. |
| **Ecological Audit** | `research.html` | Data-derived sector composition breakdown, 6-phase field survey timetable, interactive specimen hovercards, and one-click institutional citation copy. |
| **Toxicology & Safety** | `safety.html` | Four-tier clinical toxicity classification (*Safe*, *Mild Irritant*, *Toxic*, *Unknown / Not assessed*), active chemical agents, first-aid actions, and SMVDU Medical Centre emergency routing. |

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** HTML5, CSS3 (Custom Properties, Light/Dark Theme Engine, Print Media Queries), Vanilla JavaScript (ES6+)
* **Desktop Wrapper:** [Tauri v2](https://v2.tauri.app/) (Rust backend + Microsoft Edge WebView2)
* **GIS & Geodesy:** [Leaflet.js](https://leafletjs.com/) (`v1.9.4`), [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster) (`v1.5.3`), [GeographicLib](https://geographiclib.sourceforge.io/) (`v1.52.1`)
* **Offline & Storage:** Service Worker API (`sw.js`, cache `smvdu-green-atlas-v3.2.0` + 500-tile LRU ArcGIS cache), IndexedDB (`SMVDU_BIO_INDEXED_DB` v4), Web App Manifest (`manifest.json`)
* **Security:** Enforcing Content Security Policy (CSP), Subresource Integrity (SRI) SHA-512 hashes, HTML output escaping, and spreadsheet formula guards

---

## 📁 Repository Structure

```text
.
├── .gitignore               # Git ignore rules
├── index.html               # Landing page & live campus ecological telemetry
├── database.html            # Searchable flora database, QR plaques & observation intake
├── maps.html                # Interactive GIS vegetation map interface
├── research.html            # Evidence-based ecological audit & sector composition
├── safety.html              # Clinical toxicity reference & emergency protocols
├── manifest.json            # PWA web app manifest & shortcuts
├── sw.js                    # Offline service worker & ArcGIS tile cache (v3.2.0)
├── css/
│   ├── style.css            # Core design tokens, layout, dark mode & navigation
│   ├── database.css         # Ledger table, modals & 6"x4" plaque print stylesheet
│   ├── maps.css             # GIS map viewport, legend & sidebar styles
│   ├── research.css         # Ecological audit tables, hovercards & timeline
│   └── safety.css           # Clinical hazard cards & emergency triage layout
├── js/
│   ├── data.js              # 175-taxa dataset & IndexedDB v4 persistence layer
│   ├── main.js              # Theme controller, navigation drawer & home telemetry sync
│   ├── database.js          # Search, pagination, QR/plaque generator, CSV export & intake
│   ├── qrcode.min.js        # Local QR code generator (qrcode-generator v1.4.4)
│   ├── maps-core.js         # Leaflet initialization, WGS84 geodesy & marker layers
│   ├── maps-controls.js     # Sector filters, pinpoint tool, GeoJSON export & session state
│   ├── maps.js              # Module architecture documentation stub
│   ├── research.js          # Sector metrics, hovercards & citation copier
│   └── safety.js            # Toxicity filter pills & hazard triage search
├── icons/                   # Favicons, Apple touch icon & maskable PWA icons
├── CHANGELOG.md             # Version history and release notes
├── CONTRIBUTING.md          # Local setup and contribution guidelines
├── SECURITY.md              # Vulnerability disclosure policy
└── LICENSE                  # GNU General Public License v3.0
```

---

## 🚀 Local Development & Preview

Service Workers and IndexedDB require an HTTP(S) origin. Serve the repository root using any local static web server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

---

## 🤝 Contributing & Security

* See [`CONTRIBUTING.md`](CONTRIBUTING.md) for local setup, data schema conventions, and pull request guidelines.
* See [`SECURITY.md`](SECURITY.md) for reporting vulnerabilities or data-integrity issues.

---

## 📄 License

Distributed under the terms specified in [`LICENSE`](LICENSE).