'use strict';

let RedisResults = require('./redisResults');
let CommandTextBox = require('./commandTextBox');
let RunButton = require('./runButton');
let ServerStatus = require('./serverStatus');
let ClusterStatus = require('./clusterStatus');

var Output = ReactDOM.render(
    <RedisResults />,
    document.getElementById('redisResultsTextarea')
);

var Input = ReactDOM.render(
    <CommandTextBox />,
    document.getElementById('commandTextBox')
);

var Run = ReactDOM.render(
    <RunButton/>,
    document.getElementById('runButton')
);

var Status = ReactDOM.render(
    <ServerStatus/>,
    document.getElementById('serverStatus')
);

var Cluster = ReactDOM.render(
    <ClusterStatus/>,
    document.getElementById('clusterStatus')
);

Run.setOutput(Output);
Run.setInput(Input);
Status.initialize();
Cluster.initialize();