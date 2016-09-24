'use strict';
const http = require('request'),
    fs = require('fs'),
    path = require('path');


let commands = {};
let blackListCommands = [];
let whiteListCommands = [];

/*
    Format of commands are:
    {
        "APPEND": {
            "summary": "Append a value to a key",
            "complexity": "O(1). The amortized time complexity is O(1) assuming the appended value is small and the already present value is of any size, since the dynamic string library used by Redis will double the free space available on every reallocation.",
            "arguments": [
                {
                    "name": "key",
                    "type": "key"
                },
                {
                    "name": "value",
                    "type": "string"
                }
            ],
        "since": "2.0.0",
        "group": "string"
    },
*/
http.get({
    url: 'https://raw.githubusercontent.com/antirez/redis-doc/master/commands.json',
    method: 'get',
    json: true
}, (err, response, body) => {
    commands = _format(body);
});

whiteListCommands = JSON.parse(fs.readFileSync(path.resolve(path.join(__dirname, '../../config/whitelist.json'))));
blackListCommands = JSON.parse(fs.readFileSync(path.resolve(path.join(__dirname, '../../config/blacklist.json'))));

function _format(json) {
    let commands = [];
    for (let key in json) {
        // if a whitelist is set and the command is not the whitelist, skip this iteration
        if (whiteListCommands.length > 0 && whiteListCommands.indexOf(key) == -1) continue;

        // if the whitelist is not set, and the item is in the blacklist, skip this iteration
        if (whiteListCommands.length == 0 && blackListCommands.indexOf(key) > -1) continue; 

        // continue as normal
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

