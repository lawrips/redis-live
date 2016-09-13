'use strict';
var RedisLive = require('redis-live');

var redisLive = new RedisLive({
    // the list of hosts 
    hosts : hosts,
    
    // ui components
    commandOutput : document.getElementById('commandOutput'),
    commandInput : document.getElementById('commandInput'),
    serverStatus : document.getElementById('serverStatus'),
    clusterStatus : document.getElementById('clusterStatus'),
    systemStatus : document.getElementById('systemStatus'),
    systemStatusList: ['uptime_in_days', 'used_memory_human', 'connected_clients', 'db0']
})
