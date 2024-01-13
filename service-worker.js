// service-worker.js
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open("tic-tac-toe-v1").then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/index.css',
          '/index.js',
          // Add other paths or files to cache as needed
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  