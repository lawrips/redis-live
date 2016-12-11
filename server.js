'use strict';

const debug = require('debug')('redis-live'),
    app = require('./lib/app');

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);


    process.nextTick(function () {
        process.exit(1);
    });
});
