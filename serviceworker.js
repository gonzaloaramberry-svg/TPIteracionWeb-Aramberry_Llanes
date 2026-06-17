const CACHE_NAME = "2048-cache-v1";

const urlsToCache = [
  "./",                 
  "./index.html",        
  "./style/main.css",   
  "./js/application.js",
  "./js/game_manager.js",
  "./js/stats_manager.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});