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

            // remove quotes
            for (let i=0; i<commands.length; i++) {
                if ((commands[i].startsWith('\'') || commands[i].startsWith('\"'))
                &&  (commands[i].endsWith('\'') || commands[i].endsWith('\"'))) {
                    commands[i] = commands[i].slice(1, -1);
                }
            }

            // run command against redis
            cluster[commands[0].toLowerCase()](commands.slice(1), (err, result) => {
                if (err) return reply(err);
                return reply(result);
            });
        }
    });

    next();
}

exports.register.attributes = {
    'name': 'command'
};