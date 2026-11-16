const C='tablero-vivo-v2',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
self.addEventListener('notificationclick',e=>{
 e.notification.close();
 const id=e.notification.data&&e.notification.data.id,a=e.action;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
  if(list.length){const w=list[0];if(a)w.postMessage({type:'act',id,action:a});return w.focus()}
  return clients.openWindow('./index.html');
 }));
});
