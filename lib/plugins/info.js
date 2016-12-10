'use strict';

var Redis = require('ioredis'),
    nconf = require('nconf');

exports.register = function (server, options, next) {

    // WebApi which exposes the "info" command 
    server.route({
        method: 'POST',
        path: '/info',
        handler: (request, reply) => {
            let redisOptions = nconf.get('options') || nconf.get('server');
            redisOptions.host = request.payload.host.split(':')[0];
            redisOptions.port = request.payload.host.split(':').length > 1 ? request.payload.host.split(':')[1] : 6379;
            let redis = new Redis(redisOptions);

            redis.info((err, result) => {
                if (err) return reply(err)
                return reply(result);
            }); 
        }
    });

    next();
}

exports.register.attributes = {
    'name': 'info'
};