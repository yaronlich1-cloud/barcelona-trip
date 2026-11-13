// App shell is cached for offline use; live data (map tiles, weather, rates, Wikipedia) goes to the network.
const CACHE = 'bcn-v30';
const SHELL = ['./', './index.html', './styles.css?v=30', './app.js?v=30', './data.js?v=30', './stories.js?v=30', './gems.js?v=30', './enrich.js?v=30', './manifest.webmanifest', './icons/icon-192.png', './vendor/leaflet/leaflet.css', './vendor/leaflet/leaflet.js'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const req = e.request; if (req.method !== 'GET') return;
  const u = new URL(req.url);
  const shell = u.origin === location.origin || u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';
  if (!shell) return; // maps, weather, rates and Wikipedia always go straight to the network
  // Network first, bypassing the HTTP cache, so a new version shows up right away; cache is the offline fallback.
  const net = req.mode === 'navigate' ? fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(req, { cache: 'no-cache' });
  e.respondWith(net.then((r) => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); } return r; })
    .catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then((r) => r || caches.match('./index.html'))));
});
