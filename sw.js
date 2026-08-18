const CACHE_NAME = 'science-escape-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
  // หากมีไฟล์ CSS หรือ JS เพิ่มเติม ให้ใส่ Path ตรงนี้ เช่น:
  // './style.css',
  // './script.js'
];

// ขั้นตอน Install: ทำการเก็บไฟล์ลง Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ขั้นตอน Activate: ลบ Cache เก่าที่ไม่ได้ใช้
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// ขั้นตอน Fetch: ดึงข้อมูลจาก Cache ก่อน หากไม่มีจึงไปดึงจาก Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

