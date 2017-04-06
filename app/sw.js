
(global => {
  'use strict';

  // Load the sw-tookbox library.
  importScripts('sw-toolbox.js'); // Update path to match your own setup

  global.toolbox.options.cache.name = 'sw-cache-<%= hash %>';

  global.toolbox.precache(['/', <%= precache %>]);//its variable populated by node script


  global.toolbox.router.default = global.toolbox.networkFirst;
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
