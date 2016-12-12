'use strict';

const Redis = require('ioredis'),
    nconf = require('nconf');

const Commands = require('../modules/commands');

let redis;

if (nconf.get('cluster')) {
    redis =  new Redis.Cluster(nconf.get('cluster'), 
    {
        redisOptions: nconf.get('options')
    });
}
else if (nconf.get('server')) {
    redis =  new Redis(nconf.get('server'));
}

exports.register = function (server, options, next) {

    // WebApi
    server.route({
        method: 'POST',
        path: '/command',
        handler: (request, reply) => {
            // regex to match on words separted by whitespace (unless in quotes).
            // e.g. SET hello world -> ['SET', 'hello', 'world']
            // e.g. SET hello "world is great" -> ['SET', 'hello', '"world is great"']
            var commands = request.payload.command.match(/('.*?'|".*?"|\S+)/g );

            // remove quotes
            for (let i=0; i<commands.length; i++) {
                if ((commands[i].startsWith('\'') || commands[i].startsWith('\"'))
                &&  (commands[i].endsWith('\'') || commands[i].endsWith('\"'))) {
                    commands[i] = commands[i].slice(1, -1);
                }
            }

            // run command against redis
            if (Commands.get().map((c) => c.name).map((c) => c.startsWith(commands[0].toUpperCase())).indexOf(true) > -1) {
                redis[commands[0].toLowerCase()](commands.slice(1), (err, result) => {
                    if (err) return reply(err.message);
                    return reply(result || 'no result');
                });
            }
            else {
                return reply("Command either in blacklist, or not in whitelist");                
            }
        }
    });

    next();
}

exports.register.attributes = {
    'name': 'command'
};