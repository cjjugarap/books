/* Books: serves the unlocked course from the on-device cache; the public files are only the lock screen and an encrypted payload. */
var SCOPE=self.registration.scope,APP='books-app';
self.addEventListener('install',function(e){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==APP}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.href.indexOf(SCOPE)!==0)return;
  var path=u.href.slice(SCOPE.length).split('?')[0].split('#')[0];if(path==='')path='index.html';
  if(path==='unlock.html'||path==='sw.js'||path==='payload.enc'||path==='manifest.webmanifest'||path.indexOf('icons/')===0)return;
  e.respondWith(caches.open(APP).then(function(c){return c.match(SCOPE+path)}).then(function(res){return res||fetch(r)}))});
