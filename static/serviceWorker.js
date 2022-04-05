// Cache name
const CORE_CACHE_VERSION = "v1";
const CORE_ASSETS = [
  "/", 
  "/offline",
  "/css/style.css",
];


// Installing cache "v1", storing assets in cache
self.addEventListener("install", (event) => {
  console.log("Installing service worker");
  event.waitUntil(
    caches.open(CORE_CACHE_VERSION).then(function (cache) {
      // console.log("adding assets to cache " + CORE_CACHE_VERSION);
      return cache.addAll(CORE_ASSETS).then(() => self.skipWaiting());
    })
  );
});

// Activating service worker
self.addEventListener("activate", (event) => {
  console.log("Activating service worker");
  event.waitUntil(clients.claim());
});

//Serve offline page
/**
 * Stores pages that has been visited into html-cache
 */
self.addEventListener("fetch", (event) => {
  console.log("Fetch event:", event.request.url);
  if (coreGetRequest(event.request)) {
    event.respondWith(
      caches
        .open(CORE_CACHE_VERSION)
        .then((cache) => cache.match(event.request.url))
    );
  } else if (htmlGetRequest(event.request)) {
    console.log("html get request", event.request.url);
    event.respondWith(
      caches
        .open("html-cache")
        .then((cache) => cache.match(event.request.url))
        .then((response) =>
          response ? response : fetchAndCache(event.request, "html-cache")
        )
        .catch((e) => {
          return caches
            .open(CORE_CACHE_VERSION)
            .then((cache) => cache.match("/offline"));
        })
    );
  }
});

function fetchAndCache(request, cacheName) {
  return fetch(request).then((response) => {
    if (!response.ok) {
      throw new TypeError("Something went wrong..");
    }

    const clone = response.clone();
    caches.open(cacheName).then((cache) => cache.put(request, clone));
    return response;
  });
}

function htmlGetRequest(request) {
  return (
    request.method === "GET" &&
    request.headers.get("accept") !== null &&
    request.headers.get("accept").indexOf("text/html") > -1
  );
}

/**
 * Checks if a request is a core GET request
 *
 * @param {Object} request        The request object
 * @returns {Boolean}            Boolean value indicating whether the request is in the core mapping
 */
function coreGetRequest(request) {
  return (
    request.method === "GET" && CORE_ASSETS.includes(getPathName(request.url))
  );
}

/**
 * Get a pathname from a full URL by stripping off domain
 *
 * @param {Object} requestUrl        The request object, e.g. https://www.mydomain.com/index.css
 * @returns {String}                Relative url to the domain, e.g. index.css
 */
function getPathName(requestUrl) {
  const url = new URL(requestUrl);
  return url.pathname;
}
