const CACHE_NAME = 'ulpgl-smartpass-v2';

// On ne met en cache que l'essentiel pour ne pas bloquer l'installation
const ASSETS_TO_CACHE = [
  './index.html',
  './paiement.html',
  './dashboard.html',
  './firebase-config.js',
  './manifest.json'
];

// Installation : on force l'activation immédiate
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation : on prend le contrôle des pages tout de suite
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
    ])
  );
});

// Stratégie : Réseau d'abord, sinon Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});