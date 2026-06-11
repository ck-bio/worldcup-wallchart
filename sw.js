const CACHE = 'wc2026-v1';
const CORE  = ['./', './index.html', './style.css', './script.js', './manifest.json', './icon-192.png', './icon-512.png'];

// ── Install: pre-cache core assets ───────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

// ── Activate: purge old caches ───────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first for local assets, network-first for API ───────────────
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // API score endpoints → network-first, fall back silently
  if (url.hostname.includes('worldcup2026')) {
    e.respondWith(fetch(e.request).catch(() => new Response('[]', { headers: { 'Content-Type': 'application/json' } })));
    return;
  }

  // Google Fonts → network-first (let browser handle its own font cache)
  if (url.hostname.includes('fonts.g')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Everything else → cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok && e.request.method === 'GET') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    }).catch(() => caches.match('./index.html'))
  );
});
