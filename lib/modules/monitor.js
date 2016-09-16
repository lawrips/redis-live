const RedisStats = require('redis-stats');
var nconf = require('nconf');
nconf.env().file({file: './config/config.json'});


// start monitoring
let redisStats = new RedisStats({
    interval: 60,
    servers: nconf.get('cluster'),
    redisOptions: nconf.get('options'),
    stats: ['uptime_in_seconds', 'used_memory', 'connected_clients'],
    cluster: true,
    maxItems: 400
});
redisStats.initialize();
