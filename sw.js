/* وَنّاسة — يخلي اللعبة تشتغل كتطبيق وحتى بدون إنترنت */
const VERSION = 'wanasa-v4';
const CORE = [
  './', 'index.html', 'play.html', 'about.html', 'privacy.html', '404.html',
  'assets/q1.js', 'assets/q2.js', 'assets/q3.js', 'assets/site.css', 'assets/site.js', 'assets/logo.svg',
  'assets/icon-192.png', 'assets/icon-512.png', 'manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // الصفحات: من الشبكة أولًا عشان التحديثات توصل، ومن الكاش لو ما في نت
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('play.html')))
    );
    return;
  }

  // الملفات والخطوط: من الكاش أولًا
  if (url.origin === location.origin || url.host.includes('fonts.g')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }))
    );
  }
});
