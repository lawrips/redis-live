'use strict';

var Redis = require('ioredis'),
    nconf = require('nconf');

let cluster = new Redis.Cluster(nconf.get('cluster'), 
{
    redisOptions: nconf.get('options')
});

exports.register = function (server, options, next) {

    // WebApi
    server.route({
        method: 'POST',
        path: '/command',
        handler: (request, reply) => {
            var commands = request.payload.command.split(' ');

            cluster.pipeline([
                commands        
            ]).exec((err, result)  => { 
                if (err) return reply(err);
                if (result[0].length <= 1) return reply('bad');
                return reply(result[0][1]);
            });
        }
    });

    next();
}

exports.register.attributes = {
    'name': 'command'
};