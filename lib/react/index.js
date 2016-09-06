'use strict';

let RedisResults = require('./redisResults');
let CommandInput = require('./commandInput');
let RunButton = require('./runButton');
let ServerStatus = require('./serverStatus');
let ClusterStatus = require('./clusterStatus');

var Output = ReactDOM.render(
    <RedisResults />,
    document.getElementById('redisResultsTextarea')
);

var Input = ReactDOM.render(
    <CommandInput commands={commands}/>,
    document.getElementById('commandInput')
);

var Run = ReactDOM.render(
    <RunButton/>,
    document.getElementById('runButton')
);

var Status = ReactDOM.render(
    <ServerStatus hosts={hosts}/>,
    document.getElementById('serverStatus')
);

var Cluster = ReactDOM.render(
    <ClusterStatus/>,
    document.getElementById('clusterStatus')
);

Run.setOutput(Output);
Run.setInput(Input);
Cluster.initialize();
