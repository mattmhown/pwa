const CACHE_NAME = 'my-pwa-cache-v1';

// Files to cache for offline use
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://www.hown.com.au/wp-content/uploads/2024/02/Color-logo-no-background-1-2048x2024.png',
  'https://www.hown.com.au/wp-content/uploads/2024/02/Color-logo-no-background-1-2048x2024.png',
  // Add any other assets you want to cache
];

// Install event - cache necessary assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Activate event - delete old caches if they exist
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached assets for offline use
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If the request is in cache, return the cached response
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise, fetch from the network
      return fetch(event.request);
    })
  );
});
