var inert = require('inert');

exports.register = function (server, options, next) {

    // register static file rendering
    server.register(inert, () => {
        server.route({
            method: 'GET',
            path: '/{param*}',
            handler: {
                directory: {
                    path: './lib/public',
                }
            }
        });
        server.route({
            method: 'GET',
            path: '/favicon.ico',
            handler: {
                file: './lib/public/img/favicon.ico'
            },
            config: {
                cache: { expiresIn: 86400000, privacy: 'public' }
            }
        });
    });
    next();
}

exports.register.attributes = {
    'name': 'public'
};