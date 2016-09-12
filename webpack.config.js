var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'lib/public/react');
var APP_DIR = path.resolve(__dirname, 'lib/react');

var config = {
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'] 
            }
        }        ]
    },
    resolve: {
    extensions: ['', '.js', '.es6']
    },
    watch: false
};

module.exports = config;