'use strict';

var RedisResults = require('./redisResults');
var CommandTextBox = require('./commandTextBox');
var RunButton = require('./runButton');

var Output = ReactDOM.render(React.createElement(RedisResults, null), document.getElementById('redisResultsTextarea'));

var Input = ReactDOM.render(React.createElement(CommandTextBox, null), document.getElementById('commandTextBox'));

var Run = ReactDOM.render(React.createElement(RunButton, null), document.getElementById('runButton'));

Run.setOutput(Output);
Run.setInput(Input);