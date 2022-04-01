const OFFLINE = "offline.ejs";
self.addEventListener("install", (event) => {
  console.log("Installing");
  event.waitUntil(
    caches.open("test-cache").then((cache) => {
      return cache.addAll(["/css/style.css"]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  if (event.request.mode === "navigate") {
    event.respondWith(async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log("Fetch failed, returning offline page.", error);

        const cache = await caches.open("test");
        const cachedResponse = await cache.match(OFFLINE);
        return cachedResponse
      }
    });
  }
});
