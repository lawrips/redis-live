'use strict';

const path = require('path'),
    vision = require('vision'),
    Glue = require('glue'),
    Inert = require('inert'),
    Hapi = require('hapi'),
    debug = require('debug')('redis-live'),
    handlebars = require('handlebars'),
    extend = require('handlebars-extend-block');

var nconf = require('nconf');
nconf.env().file({file: './config/config.json'});

const manifest = require('../config/manifest.json');

var options = {
    relativeTo: __dirname + '/plugins'
};

// port handling required for azure
manifest.connections[0].port = process.env.PORT || manifest.connections[0].port;
manifest.server.debug = { request: ['error'] }; 

debug('starting web server');
Glue.compose(manifest, options, (err, server) => {
    server.register([vision, Inert],
        (err) => {
            debug('plugins registered');
            if (err) throw err;
            // register jade for template handling
            server.views({
                engines: {
                    html: extend(handlebars),
                },
                path: 'views',
                layout: 'main',
                isCached: false,
                layoutPath: 'views/layouts',
                relativeTo: __dirname,
                compileOptions: {
                    pretty: true
                }
            });
        });

    // start webserver
    server.start(function (err) {
        // server running on port 9999
        debug('developer web server started - running on port ' + manifest.connections[0].port);
    });
});
