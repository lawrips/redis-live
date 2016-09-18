'use strict';
const http = require('request');

let commands = {};

http.get({
    url: 'https://raw.githubusercontent.com/antirez/redis-doc/master/commands.json',
    method: 'get',
    json: true
}, (err, response, body) => {
    commands = _format(body);
});

function _format(json) {
    let commands = [];
    for (let key in json) {
        let command = key + ' ';
        for (let argument in json[key].arguments) {
            if (json[key].arguments[argument].optional) {
                // optional
                command = command + '[' + json[key].arguments[argument].name + '] ';
            }
            else {
                // required
                command = command + json[key].arguments[argument].name + ' ';                
            }
        }
        commands.push({"name":command.trim(), summary: json[key].summary, complexity: json[key].complexity});
    }
    return commands;
}

module.exports = {
    get: function() {

        return commands;
    }
}

