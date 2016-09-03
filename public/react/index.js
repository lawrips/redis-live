'use strict';

var RedisResults = require('./redisResults');
var CommandTextBox = require('./commandTextBox');
var RunButton = require('./runButton');
var ServerStatus = require('./serverStatus');

var Output = ReactDOM.render(React.createElement(RedisResults, null), document.getElementById('redisResultsTextarea'));

var Input = ReactDOM.render(React.createElement(CommandTextBox, null), document.getElementById('commandTextBox'));

var Run = ReactDOM.render(React.createElement(RunButton, null), document.getElementById('runButton'));

var Status = ReactDOM.render(React.createElement(ServerStatus, null), document.getElementById('serverStatus'));

Run.setOutput(Output);
Run.setInput(Input);
Status.initialize();