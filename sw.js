const CACHE_NAME = 'golf-lab-v4';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './js/physics_ultimate.js',
    './js/ui_manager.js',
    './js/swing_logic.js',
    './js/chip_logic.js',
    './js/putt_logic.js',
    './js/putting_view_3d.js',
    './src/html/swing_ui.html',
    './src/html/chip_ui.html',
    './src/html/putt_ui.html',
    './src/html/game_ui.html',
    './js/game_logic.js',
    './components/modals.html',
    './manifest.json',
    './ico.png'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    self.skipWaiting();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true })
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});
