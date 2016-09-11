'use strict';

let CommandOutput = require('./commandOutput');
let CommandInput = require('./commandInput');
let ServerStatus = require('./serverStatus');
let ClusterStatus = require('./clusterStatus');

class RedisLive {
    constructor (redisLive) {
        
        var commandOutput = redisLive.commandOutput;
        var commandInput = redisLive.commandInput;

        var serverStatus = redisLive.serverStatus;
        var clusterStatus = redisLive.clusterStatus;

        redisLive.path = redisLive.path || '';

        if (commandOutput && commandInput) {
            var Output = ReactDOM.render(
                <CommandOutput />,
                commandOutput
            );

            var Input = ReactDOM.render(
                <CommandInput  path={redisLive.path} commands={redisLive.commands}/>,
                commandInput
            );

            Input.setOutput(Output);
        }

        if (serverStatus) {
            var Status = ReactDOM.render(
                <ServerStatus hosts={redisLive.hosts} path={redisLive.path}/>,
                serverStatus
            );
        }

        if (clusterStatus) {
            var Cluster = ReactDOM.render(
                <ClusterStatus path={redisLive.path}/>,
                clusterStatus
            );
            Cluster.initialize();
        }

    }
}

module.exports = RedisLive;