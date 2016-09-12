'use strict';
var RedisLive = require('redis-live');

// future
var redisLive = new RedisLive({
    // the list of hosts 
    hosts : hosts,
    
    // ui components
    commandOutput : document.getElementById('commandOutput'),
    commandInput : document.getElementById('commandInput'),
    serverStatus : document.getElementById('serverStatus'),
    clusterStatus : document.getElementById('clusterStatus'),
})
