const CACHE_NAME = "ligacache-v1.0";
var urlsToCache = [
  "/",
  "/index.html",
  "/detail-team.html",
  "/manifest.json",
  "/common/nav.html",
  "/common/pages/favourite.html",
  "/common/pages/home.html",
  "/common/pages/match.html",
  "/common/pages/scorers.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/images/laliga-logo-white.png",
  "/images/LaLiga.svg",
  "/images/icons/icon-72x72.png",
  "/images/icons/icon-96x96.png",
  "/images/icons/icon-128x128.png",
  "/images/icons/icon-144x144.png",
  "/images/icons/icon-152x152.png",
  "/images/icons/icon-192x192.png",
  "/images/icons/icon-384x384.png",
  "/images/icons/icon-512x512.png",
  "/js/component/detail-nav.js",
  "/js/component/nav.js",
  "/js/component/fab.js",
  "/js/component/preloader.js",
  "/js/data/api.js",
  "/js/data/cache.js",
  "/js/data/db.js",
  "/js/loader/detailteam-loader.js",
  "/js/loader/match-loader.js",
  "/js/loader/page-loader.js",
  "/js/loader/scorer-loader.js",
  "/js/loader/standings-loader.js",
  "/js/loader/favourite-loader.js",
  "/js/app.js",
  "/js/app-detail.js",
  "/js/materialize.min.js",
  "/js/idb.js",
  "/js/reg-sw.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  let base_url = "https://api.football-data.org/v2";
  
  if(event.request.url.indexOf(base_url) > -1){
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch(event.request).then((response) => {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {ignoreSearch: true}).then((response) => {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} telah dihapus`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', function(event) {
  var body;
  if(event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    icon: '/images/icons/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});