const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'main.js'
]

self.addEventListener('install', (e) => {
    console.log('sw installed')

    // creat cache
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('sw caching files')
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e => {
    console.log('sw activated')

    // remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('sw clearing old cache');
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener('fetch', e => {
    console.log('sw fetching')
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    )
})