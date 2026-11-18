# Contributing to SMVDU Green Atlas

Thank you for your interest in contributing to **SMVDU Green Atlas**! Whether you are a student, software developer, GIS specialist, or botanical researcher, your contributions help maintain and expand this institutional herbarium and spatial mapping platform for Shri Mata Vaishno Devi University.

Please take a moment to review this document before submitting your contributions.

---

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Types of Contributions](#types-of-contributions)
3. [Getting Started (Local Development)](#getting-started-local-development)
4. [Branching & Workflow Guidelines](#branching--workflow-guidelines)
5. [Code & Data Standards](#code--data-standards)
6. [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
7. [Reporting Security Issues](#reporting-security-issues)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful, inclusive, and collaborative environment. Treat all team members, researchers, and contributors with respect regardless of their background or experience level.

---

## Types of Contributions

You can contribute to SMVDU Green Atlas in several ways:

* **Botanical Data & Field Observations:** Verifying existing taxa, supplying missing Dogri/common names, updating phenology schedules, or adding newly georeferenced specimen records.
* **GIS & Spatial Mapping:** Refining campus polygon boundaries, adding new map features, or improving spatial calculation performance (`GeographicLib` / `Leaflet`).
* **Frontend & Accessibility (UI/UX):** Enhancing responsive layouts, dark/light theme styling, focus states, keyboard navigation, or screen-reader accessibility (ARIA compliance).
* **PWA & Offline Performance:** Optimizing Service Worker caching pipelines, local IndexedDB schema handling, or asset loading speeds.
* **Documentation:** Improving READMEs, adding inline code comments, or writing guides for field researchers.

---

## Getting Started (Local Development)

SMVDU Green Atlas is built as a **static, zero-build Progressive Web Application (PWA)**. You do **not** need `npm`, Webpack, or any build step to get started.

1. **Fork and Clone the Repository:**
   ```bash
   git clone [https://github.com/ekakaul/GreenAtlas.git](https://github.com/ekakaul/GreenAtlas.git)
   cd GreenAtlas
   ```

2. **Serve Locally over HTTP:**
   Service Workers (`sw.js`) and IndexedDB require an `http://localhost` or `https://` origin rather than `file://`. Start a local static server from the repository root:
   ```bash
   python -m http.server 8080
   ```
   Then open `http://localhost:8080` in your browser.

---

## Branching & Workflow Guidelines

* Create a descriptive branch from `main` before making changes (e.g., `feat/add-ravine-taxa`, `fix/gis-legend-mobile`, or `docs/update-audit`).
* Keep commits focused and descriptive using Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
* If you modify any cached static asset or add a new file, bump `CACHE_NAME` in `sw.js` and include the file path in `APP_SHELL`.

---

## Code & Data Standards

* **Botanical Schema (`js/data.js`):** Every taxon record must include a unique `id` (`SMVDU-FL-XXX`), `botanicalName`, `family`, `zone`, and explicit `toxicity` (`Safe`, `Mild Irritant`, `Toxic`, or `Unknown`). Never default unverified safety data to `Safe`.
* **Security & XSS Prevention:** Escape all dynamic text rendered into HTML templates using `escapeHtml()`, preserve strict Content Security Policy (`CSP`) headers on all HTML pages, and include Subresource Integrity (`SRI`) hashes on any external CDN script or stylesheet.
* **Accessibility:** Maintain keyboard focusability (`:focus-visible`), semantic landmarks, and descriptive `aria-label` attributes on interactive controls.

---

## Submitting a Pull Request (PR)

1. Verify that all five pages (`index.html`, `database.html`, `maps.html`, `research.html`, `safety.html`) load without console or CSP errors.
2. Confirm offline functionality by testing a reload in browser DevTools with **Offline** mode enabled.
3. Open a Pull Request against `main` summarizing the problem, your changes, and any dataset or cache version updates.

---

## Reporting Security Issues

Please do not open public issues for security vulnerabilities. Follow the private disclosure instructions in [`SECURITY.md`](SECURITY.md).