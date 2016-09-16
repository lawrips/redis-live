'use strict';

var Redis = require('ioredis'),
    nconf = require('nconf');

const prefix = 'status:'

let redis = new Redis.Cluster(nconf.get('cluster'), { redisOptions: nconf.get('options')});

exports.register = function (server, options, next) {

    // WebApi
    server.route({
        method: 'POST',
        path: '/stats',
        handler: (request, reply) => {
            let type = request.payload.type;
            let host = request.payload.host.split(':')[0];
            let port = request.payload.host.split(':')[1];

            console.log('quering: ' + prefix + host + ':' + port  + ':' + type)
            // get all the keys in the set for this server:port:type
            redis.zrangebyscore(prefix + host + ':' + port + ':' + type, '-inf', '+inf', (err, results) => {                
                return reply(results.map((a) => JSON.parse(a)));
            });

        }
    });

    next();
}

exports.register.attributes = {
    'name': 'stats'
};