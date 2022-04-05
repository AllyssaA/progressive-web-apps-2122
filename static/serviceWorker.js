// Cache name
const CORE_CACHE_VERSION = "v1";
const CORE_ASSETS = ["/", "/offline", "/css/style.css"];
const OFFLINE_FALLBACK = "/offline";


// Installing cache "v1", storing assets in cache
self.addEventListener("install", (event) => {
  console.log("Installing service worker");
  event.waitUntil(
    caches.open(CORE_CACHE_VERSION).then(function (cache) {
      return cache.addAll(CORE_ASSETS).then(() => {
        console.log("adding assets to cache " + CORE_CACHE_VERSION);
        self.skipWaiting();
      });
    })
  );
});

// Activating service worker
self.addEventListener("activate", (event) => {
  console.log("Activating service worker");
  event.waitUntil(clients.claim());
});

//Serve offline page
self.addEventListener("fetch", (event) => {
  console.log("Fetch event:", event.request.url)

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch((error) => {
        return caches.match(OFFLINE_FALLBACK);
      })
  );
});


