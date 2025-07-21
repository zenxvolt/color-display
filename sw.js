const CACHE_NAME = 'fullscreen-color-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Event: Install
// Saat service worker diinstal, buka cache dan tambahkan file-file aset
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache dibuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Event: Fetch
// Intersep setiap request dan sajikan dari cache jika ada.
// Jika tidak ada di cache, ambil dari network.
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika response ditemukan di cache, kembalikan dari cache
                if (response) {
                    return response;
                }
                // Jika tidak, ambil dari network
                return fetch(event.request);
            })
    );
}
                     );
