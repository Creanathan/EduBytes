/**
 * NormaLIES — Service Worker (v1.0)
 * Persistent Cache Storage for high-performance offline detection.
 */

const CACHE_NAME = 'edubytes-assets-v1';
const ASSETS_TO_CACHE = [
    // Core HTML/CSS/JS
    './index.html',
    './src/css/start.css',
    './src/css/cutscene.css',
    './src/css/rooms.css',
    './src/js/core/global_init.js',
    './src/js/core/gamestate.js',
    './src/js/core/inventory.js',
    './src/js/core/routing.js',
    './src/js/components/dynamic_loading.js',

    // Critical UI
    './src/assets/images/ui/logo.png',
    './src/assets/images/ui/logo.svg',

    // Starting Rooms
    './src/rooms/outside.html',
    './src/rooms/hallway.html',
    './src/assets/rooms/outside.png',
    './src/assets/rooms/hallway_main.png',

    // Essential Characters
    './src/assets/images/characters/butler.png',
    './src/assets/images/characters/detective.png',
    './src/assets/images/characters/thomas.png'
];

// Install Event: Pre-cache core assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Pre-caching core assets...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('[SW] Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event: Cache-First Strategy
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // Return cached response if found
            if (cachedResponse) {
                return cachedResponse;
            }

            // Otherwise fetch from network and cache for next time
            return fetch(event.request).then((networkResponse) => {
                // Don't cache if not a success or if it's a cross-origin request
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                // Cache the new resource
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});
