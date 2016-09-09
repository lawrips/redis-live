'use strict';

let RedisResults = require('./redisResults');
let CommandInput = require('./commandInput');
let RunButton = require('./runButton');
let ServerStatus = require('./serverStatus');
let ClusterStatus = require('./clusterStatus');

var resultsTextArea = redisLive.resultsTextArea;
var commandInput = redisLive.commandInput;
var runButton = redisLive.runButton;
var serverStatus = redisLive.serverStatus;
var clusterStatus = redisLive.clusterStatus;

redisLive.path = redisLive.path || '';

if (resultsTextArea && commandInput && runButton) {
    var Output = ReactDOM.render(
        <RedisResults />,
        resultsTextArea
    );

    var Input = ReactDOM.render(
        <CommandInput commands={redisLive.commands}/>,
        commandInput
    );

    var Run = ReactDOM.render(
        <RunButton path={redisLive.path}/>,
        runButton
    );

    Run.setOutput(Output);
    Run.setInput(Input);
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

