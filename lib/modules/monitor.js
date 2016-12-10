'use strict';

const RedisStats = require('redis-stats'),
    nconf = require('nconf'),
    path = require('path');

nconf.env().file({file: path.resolve(__dirname, '../../config/config.json')});


// start monitoring
let redisStats = new RedisStats({
    interval: 60,
    servers: nconf.get('cluster') || [nconf.get('server')],
    redisOptions: nconf.get('options'),
    stats: ['uptime_in_seconds', 'used_memory_human', 'connected_clients', 'db0:keys', 'db0:avg_ttl'],
    cluster: nconf.get('cluster') ? true : false, 
    maxItems: 400
});
redisStats.initialize();
