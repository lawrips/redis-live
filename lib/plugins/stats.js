'use strict';

var Redis = require('ioredis'),
    nconf = require('nconf');

const prefix = 'status:'

let redis = new Redis.Cluster(nconf.get('cluster'), { redisOptions: nconf.get('options')});
redis.on("connect", () => console.log('established redis connection for configServer'));
redis.on("error", (err) => console.log('error on redis connection for configServer. retry should be invoked: ' + err));

exports.register = function (server, options, next) {

    // WebApi
    server.route({
        method: 'POST',
        path: '/stats',
        handler: (request, reply) => {
            let type = request.payload.type;
            let host = request.payload.host.split(':')[0];
            let port = request.payload.host.split(':')[1];

            // period will be set to either hourly, daily or raw... if raw, then omit this from the key lookup
            let period = request.payload.period;
            period = period == 'raw' ? period = ':' : period = ':' + period + ':';

            console.log('quering: ' + prefix + host + ':' + port + period + type);
            // get all the keys in the set for this server:port:type
            redis.zrangebyscore(prefix + host + ':' + port + period + type, '-inf', '+inf', (err, results) => {                
                return reply(results.map((a) => JSON.parse(a)).map((a) => {delete a.n; return a}));                
            });

        }
    });

    next();
}

exports.register.attributes = {
    'name': 'stats'
};