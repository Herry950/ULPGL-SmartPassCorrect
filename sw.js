// Nom du cache pour ton application
const CACHE_NAME = 'ulpgl-smartpass-v1';

// Fichiers à mettre en cache pour un accès rapide
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/paiement.html',
  '/dashboard.html',
  '/firebase-config.js',
  '/manifest.json'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SmartPass : Cache ouvert');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Stratégie : Réseau en priorité, puis Cache si hors-ligne
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SmartPass : Nettoyage ancien cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});