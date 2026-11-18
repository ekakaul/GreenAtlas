/**
 * SMVDU Green Atlas: Progressive Web App Service Worker (sw.js)
 * High-Performance Offline Caching & Non-Blocking GIS Tile Pipeline
 * Shri Mata Vaishno Devi University, Kakryal, Katra
 */

const CACHE_NAME = 'smvdu-green-atlas-v3.1.5';
const GIS_TILE_CACHE = 'smvdu-green-atlas-gis-tiles-v3.1.5';
const MAX_GIS_TILES = 500;
const NAV_TIMEOUT_MS = 4000;

// 1. Static App Shell & Core Assets
const APP_SHELL = [
    './',
    './index.html',
    './database.html',
    './maps.html',
    './research.html',
    './safety.html',
    './manifest.json',
    './icons/favicon-32x32.png',
    './icons/icon.svg',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    './css/style.css',
    './css/database.css',
    './css/maps.css',
    './css/research.css',
    './css/safety.css',
    './js/data.js',
    './js/main.js',
    './js/database.js',
    './js/qrcode.min.js',
    './js/maps-core.js',
    './js/maps-controls.js',
    './js/research.js',
    './js/safety.js'
];

// 2. External CDN Vendor Libraries
const EXTERNAL_DEPENDENCIES = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css',
    'https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js',
    'https://unpkg.com/geographiclib@1.52.1/geographiclib.min.js'
];

async function trimTileCache(cache) {
    const keys = await cache.keys();
    if (keys.length <= MAX_GIS_TILES) return;
    const excess = keys.length - MAX_GIS_TILES;
    for (let i = 0; i < excess; i++) {
        await cache.delete(keys[i]);
    }
}

function fetchWithTimeout(request, timeoutMs) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    return fetch(request, { signal: controller.signal }).finally(() => clearTimeout(timer));
}

// INSTALL LIFECYCLE
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            console.log('[Service Worker] Pre-caching application shell...');
            const shellRequests = APP_SHELL.map((url) => new Request(url, { cache: 'no-cache' }));
            await cache.addAll(shellRequests);

            for (const url of EXTERNAL_DEPENDENCIES) {
                try {
                    const response = await fetch(url, { mode: 'cors', cache: 'no-cache' });
                    if (response.ok || response.type === 'opaque') {
                        await cache.put(url, response);
                    }
                } catch (err) {
                    console.warn(`[Service Worker] CDN bypassed: ${url}`, err);
                }
            }
        }).then(() => self.skipWaiting())
    );
});

// ACTIVATE LIFECYCLE (Purge Outdated Caches & Claim Clients)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME && name !== GIS_TILE_CACHE) {
                        console.log(`[Service Worker] Purging stale cache: ${name}`);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// FETCH ENGINE (Non-Blocking GIS Pipeline & Resilient Cache Delivery)
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Only intercept HTTP(S) GET operations
    if (request.method !== 'GET' || !request.url.startsWith('http')) {
        return;
    }

    // STRATEGY 1: Leaflet GIS Map Tiles (ArcGIS Online)
    const isArcGisHost = url.hostname === 'arcgisonline.com' || url.hostname.endsWith('.arcgisonline.com');
    const isTilePath = /\/arcgis\/rest\/services\/.+\/mapserver\/tile\//i.test(url.pathname);

    if (isArcGisHost && isTilePath) {
        event.respondWith(
            caches.open(GIS_TILE_CACHE).then(async (tileCache) => {
                const cachedTile = await tileCache.match(request);
                if (cachedTile) {
                    return cachedTile;
                }

                try {
                    const networkTile = await fetch(request);
                    if (networkTile && (networkTile.ok || networkTile.type === 'opaque')) {
                        await tileCache.put(request, networkTile.clone());
                        trimTileCache(tileCache).catch(() => {});
                    }
                    return networkTile;
                } catch (fetchErr) {
                    return cachedTile || new Response('', { status: 408, statusText: 'Tile Request Aborted' });
                }
            })
        );
        return;
    }

    // STRATEGY 2: HTML Page Navigations (Network-First with Timeout & Query-Safe Fallback)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetchWithTimeout(request, NAV_TIMEOUT_MS)
                .then(async (networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const cache = await caches.open(CACHE_NAME);
                        cache.put(request, networkResponse.clone());
                    }
                    return networkResponse;
                })
                .catch(async () => {
                    const cachedPage = await caches.match(request, { ignoreSearch: true });
                    if (cachedPage) return cachedPage;
                    return caches.match('./index.html');
                })
        );
        return;
    }

    // STRATEGY 3: Static Assets & Vendor Bundles (Stale-While-Revalidate)
    event.respondWith(
        caches.match(request).then((cached) => {
            const refresh = fetch(request).then((res) => {
                if (res && res.status === 200 && url.origin === self.location.origin) {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then((c) => c.put(request, copy));
                }
                return res;
            }).catch(() => cached);
            return cached || refresh;
        })
    );
});