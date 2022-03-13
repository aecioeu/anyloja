const CACHE = 'content-v4'; // name of the current cache
const AUTO_CACHE = [ // URLs of assets to immediately cache
    'https://fonts.googleapis.com/css?family=Google+Sans:300,400,600,700,900&display=swap',
    '/assets/js/base.min.js',
    '/assets/css/style.min.css',
    '/assets/css/style.css',
    '/assets/fonts/LineIcons.woff2'
];

// Iterate AUTO_CACHE and add cache each entry
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
        .then(cache => cache.addAll(AUTO_CACHE))
        .then(self.skipWaiting())
    );
});

// Destroy inapplicable caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => CACHE !== cacheName);
        }).then(unusedCaches => {
            console.log('DESTROYING CACHE', unusedCaches.join(','));
            return Promise.all(unusedCaches.map(unusedCache => {
                return caches.delete(unusedCache);
            }));
        }).then(() => self.clients.claim())
    );
});


self.addEventListener('fetch', event => {
    //console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log('Found ', event.request.url, ' in cache');
                return response;
            }
            // console.log('Network request for ', event.request.url);
            return fetch(event.request)
                // TODO 4 - Add fetched files to the cache
        }).catch(error => {
            // TODO 6 - Respond with custom offline page
        })
    );
});