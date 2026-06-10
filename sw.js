const CACHE_NAME = "learning-web-v1";

const FILES_TO_CACHE = [
    "./main.html",
    "./learn.html",
    "./cardOptions.html",
    "./finishedCreation.html",
    "./search.html",
    "./main.js",
    "./learnPage.js",
    "./card_exact.js",
    "./search.js",
    "./secondTry.css",
    "./icon-192.png",
    "./icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.allSettled(
                FILES_TO_CACHE.map(file =>
                    cache.add(file).catch(err => console.log("Failed to cache:", file, err))
                )
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});