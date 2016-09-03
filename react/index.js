'use strict';

let RedisResults = require('./redisResults');
let CommandTextBox = require('./commandTextBox');
let RunButton = require('./runButton');

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

Run.setOutput(Output);
Run.setInput(Input);
