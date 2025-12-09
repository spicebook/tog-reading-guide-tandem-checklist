const CACHE_NAME = "spicebook-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "reading-order.html",
  "tandem-checklist.html",

  // icons
  "icon-192.png",
  "icon-512.png",

  // share svgs
  "x-icon.svg",
  "facebook-icon.svg",
  "reddit-icon.svg",
  "pinterest-icon.svg",
  "share-icon.svg",

  // your logo
  "spicebook-logo-clean.svg",

  // fonts (Google CDN will fail offline but cached once)
  "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;600;700&display=swap"
];

// INSTALL
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
