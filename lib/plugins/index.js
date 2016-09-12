'use strict';
var nconf = require('nconf');

var commands = require('../modules/commands');

exports.register = function (server, options, next) {

    // WebApi
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            let hosts = nconf.get('cluster').map((i) => i.host + ':' + i.port);
            return reply.view('index', {
                commands: JSON.stringify(commands.get()), hosts: JSON.stringify(hosts)
            });
        }
    });

    next();
}

exports.register.attributes = {
    'name': 'index'
};