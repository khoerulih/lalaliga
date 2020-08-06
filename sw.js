importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox){
  console.log('Workbox activated');
} else {
  console.log('Workbox fail to activated');
}

workbox.precaching.precacheAndRoute([
  { url: '/common/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/style.css', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/app.js', revision: '1' },
  { url: '/js/app-detail.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1'},
  { url: '/index.html', revision: '1' },
  { url: '/detail-team.html', revision: '1' },
  { url: '/manifest.json', revision: '1' }
],{
  ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/common/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages-cache'
  })
);

workbox.routing.registerRoute(
  new RegExp('/images/'),
  workbox.strategies.cacheFirst({
    cacheName: 'images-icon-cache'
  })
);

workbox.routing.registerRoute(
  new RegExp('/js/'),
  workbox.strategies.cacheFirst({
    cacheName: 'js-cache'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com\/icon?family=Material+Icons/,
  workbox.strategies.cacheFirst({
    cacheName: 'material-icon-cache'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-cache'
  })
);

workbox.routing.registerRoute(
  /^https:\/\/upload\.wikimedia\.org/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'club-cache'
  })
);

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