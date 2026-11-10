// App shell is cached for offline use; live data (maps, weather, rates, Wikipedia) goes to the network.
const CACHE = 'bcn-v2';
const SHELL = ['./', './index.html', './styles.css', './app.js', './data.js', './stories.js', './manifest.webmanifest', './icons/icon-192.png',
  './vendor/leaflet/leaflet.css', './vendor/leaflet/leaflet.js'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  const isShell = u.origin === location.origin || u.hostname === 'unpkg.com' || u.hostname.endsWith('gstatic.com') || u.hostname === 'fonts.googleapis.com';
  if (!isShell) return; // network only for APIs and map tiles
  // network first for our own files so updates arrive; fall back to cache offline
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('./index.html'))));
});
