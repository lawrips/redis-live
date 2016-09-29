'use strict';
var RedisLive = require('redis-live');

var redisLive = new RedisLive({
        // the list of hosts 
        hosts: hosts,
        commands: commands,
        
        // ui components
        commandOutput: document.getElementById('commandOutput'),
        commandInput: document.getElementById('commandInput'),
        serverStatus: document.getElementById('serverStatus'),
        clusterStatus: document.getElementById('clusterStatus'),
        systemStatus: { 
            div: document.getElementById('systemStatus'),
            options: {
                list: ['uptime_in_days', 'used_memory_human', 'connected_clients', 'db0' ]
            }
        },
        statsChart: {
            div: document.getElementById('statsChart'),
            options: {
                types: ['used_memory_human', 'uptime_in_seconds', 'connected_clients', 'db0:keys', 'db0:avg_ttl']
            }
        },
        sparkChart: {
            div: document.getElementById('sparkChart'),
            options: {
                types: ['used_memory_human', 'uptime_in_seconds', 'connected_clients', 'db0:keys', 'db0:avg_ttl']
            }
        }
    })
