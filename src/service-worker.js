/**
 * This is Service Worker template for Workbook injectManifest mode!
 * 
 * The injectManifest mode will generate a list of URLs to precache, 
 * and add that precache manifest to an existing service worker file. 
 * It will otherwise leave the file as-is.
 * 
 * https://developers.google.com/web/tools/workbox/modules/workbox-build
 */

workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerNavigationRoute(
    workbox.precaching.getCacheKeyForURL("/static/index.html")
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|svg)$/g,
    new workbox.strategies.CacheFirst({
        cacheName: "runtimeCachingImage",
        plugins: [new workbox.expiration.Plugin({ maxAgeSeconds: 30 * 24 * 60 * 60, purgeOnQuotaError: false })]
    }),
    'GET'
);

workbox.routing.registerRoute(
    /\.*/g,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "runtimeCaching",
        plugins: [new workbox.expiration.Plugin({ maxAgeSeconds: 86400, purgeOnQuotaError: false })]
    }),
    'GET'
);
