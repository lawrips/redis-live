/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(8);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var ClusterStatus = React.createClass({
	    displayName: 'ClusterStatus',

	    getInitialState: function getInitialState() {
	        return {
	            status: ''
	        };
	    },

	    initialize: function initialize() {
	        this.serverRequest = $.post('/command', { command: 'cluster nodes' }, function (result) {
	            this.setState({
	                status: result
	            });
	        }.bind(this));
	    },

	    render: function render() {
	        var _this = this;

	        if (this.state.status) {
	            var _ret = function () {
	                var cluster = _renderStatus(_this.state.status);
	                var tables = [];
	                var i = 0;

	                Object.keys(cluster).forEach(function (key) {
	                    tables.push(React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'h3',
	                            null,
	                            'Hash slot: ',
	                            cluster[key][0][8]
	                        ),
	                        React.createElement(
	                            'table',
	                            { id: i++ },
	                            React.createElement(
	                                'thead',
	                                null,
	                                React.createElement(
	                                    'tr',
	                                    null,
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'id'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'ip:port'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'flags'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'master'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'ping-sent'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'pong-recv'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'config-epoch'
	                                    ),
	                                    React.createElement(
	                                        'td',
	                                        null,
	                                        'link-state'
	                                    )
	                                )
	                            ),
	                            React.createElement(
	                                'tbody',
	                                null,
	                                cluster[key].map(function (row, i) {
	                                    return React.createElement(
	                                        'tr',
	                                        { key: i },
	                                        row.map(function (col, j) {
	                                            if (j < 8) {
	                                                var style = {};
	                                                if (col == 'connected') {
	                                                    style.backgroundColor = '#90EE90';
	                                                } else if (col == 'disconnected') {
	                                                    style.backgroundColor = '#FFC1C1';
	                                                }

	                                                return React.createElement(
	                                                    'td',
	                                                    { style: style, key: j },
	                                                    col
	                                                );
	                                            }
	                                        })
	                                    );
	                                })
	                            )
	                        ),
	                        React.createElement('br', null)
	                    ));
	                });

	                console.log(tables);

	                return {
	                    v: React.createElement(
	                        'div',
	                        null,
	                        tables
	                    )
	                };
	            }();

	            if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	        } else {
	            return React.createElement(
	                'div',
	                null,
	                'Results will be displayed here'
	            );
	        }
	    }
	});

	function _renderStatus(status) {
	    var array = status.split('\n');
	    var table = [];
	    // put everything in an array
	    array.forEach(function (line) {
	        if (line) {
	            table.push(line.split(' '));
	        }
	    });

	    // organize into sets, grouped by the master
	    var clusters = {};
	    table.forEach(function (row) {
	        var master = row[3] == '-' ? row[0] : row[3];

	        if (!clusters[master]) {
	            clusters[master] = [];
	        }

	        clusters[master].push(row);
	    });

	    // order items in each set
	    Object.keys(clusters).forEach(function (key) {
	        clusters[key] = clusters[key].sort(function (a, b) {
	            if (a[[3] > b[3]]) {
	                return -1;
	            } else if (a[3] > b[3]) {
	                return 1;
	            }
	            return 0;
	        });
	    });

	    return clusters;
	}

	module.exports = ClusterStatus;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* eslint-disable react/react-in-jsx-scope */

	var commands = __webpack_require__(3);

	// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
	function escapeRegexCharacters(str) {
	  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function getSuggestions(value) {
	  var escapedValue = escapeRegexCharacters(value.trim());

	  if (escapedValue === '') {
	    return [];
	  }

	  var regex = new RegExp('^' + escapedValue, 'i');

	  return commands.filter(function (language) {
	    return regex.test(language.name);
	  });
	}

	function getSuggestionValue(suggestion) {
	  return suggestion.name;
	}

	function renderSuggestion(suggestion) {
	  return React.createElement(
	    'span',
	    null,
	    suggestion.name
	  );
	}

	var CommandTextBox = function (_React$Component) {
	  _inherits(CommandTextBox, _React$Component);

	  // eslint-disable-line no-undef
	  function CommandTextBox() {
	    _classCallCheck(this, CommandTextBox);

	    var _this = _possibleConstructorReturn(this, (CommandTextBox.__proto__ || Object.getPrototypeOf(CommandTextBox)).call(this));

	    _this.onChange = function (event, _ref) {
	      var newValue = _ref.newValue;

	      _this.setState({
	        value: newValue,
	        text: event.target.value
	      });
	    };

	    _this.onSuggestionsFetchRequested = function (_ref2) {
	      var value = _ref2.value;

	      _this.setState({
	        suggestions: getSuggestions(value)
	      });
	    };

	    _this.onSuggestionsClearRequested = function () {
	      _this.setState({
	        suggestions: []
	      });
	    };

	    _this.getText = function () {
	      return _this.state.text;
	    };

	    _this.state = {
	      value: '',
	      suggestions: getSuggestions('')
	    };
	    return _this;
	  }

	  _createClass(CommandTextBox, [{
	    key: 'render',
	    value: function render() {
	      var _state = this.state;
	      var value = _state.value;
	      var suggestions = _state.suggestions;

	      var inputProps = {
	        placeholder: 'e.g. SET hello world',
	        value: value,
	        onChange: this.onChange
	      };

	      return React.createElement(Autosuggest // eslint-disable-line react/jsx-no-undef
	      , { suggestions: suggestions,
	        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
	        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
	        getSuggestionValue: getSuggestionValue,
	        renderSuggestion: renderSuggestion,
	        inputProps: inputProps });
	    }
	  }]);

	  return CommandTextBox;
	}(React.Component);

	module.exports = CommandTextBox;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{ "name": "append" }, { "name": "ADD" }, { "name": "AUTH" }, { "name": "BGREWRITEAOF" }, { "name": "BGSAVE" }, { "name": "CLUSTER" }, { "name": "GET  key" }, { "name": "HGET key field" }, { "name": "HGETALL key" }, { "name": "SADD key member [member ...]" }, { "name": "SET key value [EX seconds] [PX milliseconds] [NX|XX]" }, { "name": "SMEMBERS key" }, { "name": "ZADD key [NX|XX] [CH] [INCR] score member [score member ...]" }, { "name": "ZCARD key" }, { "name": "ZCOUNT key min max" }, { "name": "ZINCRBY key increment member" }, { "name": "ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]" }, { "name": "ZLEXCOUNT key min max" }, { "name": "ZRANGE key start stop [WITHSCORES]" }, { "name": "ZRANGEBYLEX key min max [LIMIT offset count]" }, { "name": "ZREVRANGEBYLEX key max min [LIMIT offset count]" }, { "name": "ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]" }];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var RedisResults = __webpack_require__(5);
	var CommandTextBox = __webpack_require__(2);
	var RunButton = __webpack_require__(6);
	var ServerStatus = __webpack_require__(7);
	var ClusterStatus = __webpack_require__(1);

	var Output = ReactDOM.render(React.createElement(RedisResults, null), document.getElementById('redisResultsTextarea'));

	var Input = ReactDOM.render(React.createElement(CommandTextBox, null), document.getElementById('commandTextBox'));

	var Run = ReactDOM.render(React.createElement(RunButton, null), document.getElementById('runButton'));

	var Status = ReactDOM.render(React.createElement(ServerStatus, { hosts: hosts }), document.getElementById('serverStatus'));

	var Cluster = ReactDOM.render(React.createElement(ClusterStatus, null), document.getElementById('clusterStatus'));

	Run.setOutput(Output);
	Run.setInput(Input);
	Cluster.initialize();

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var resultsStyle = {
	    "height": "200px",
	    "fontFamily": "monospace"
	};

	var RedisResults = React.createClass({
	    displayName: "RedisResults",

	    getInitialState: function getInitialState() {
	        return {
	            text: ''
	        };
	    },

	    setText: function setText(text) {
	        this.setState({
	            text: text
	        });
	    },

	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement("pre", { style: resultsStyle, dangerouslySetInnerHTML: { __html: this.state.text } })
	        );
	    }
	});

	module.exports = RedisResults;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var RunButton = React.createClass({
	    displayName: 'RunButton',

	    getInitialState: function getInitialState() {
	        return {
	            output: {}
	        };
	    },

	    onButtonClick: function onButtonClick(evt) {
	        this.serverRequest = $.post('/command', { command: this.state.input.getText() }, function (result) {
	            if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
	                this.state.output.setText(JSON.stringify(result));
	            } else {
	                this.state.output.setText(result.replace(/\n/g, '<br />'));
	            }
	        }.bind(this));
	    },

	    setOutput: function setOutput(output) {
	        this.setState({
	            output: output
	        });
	    },

	    setInput: function setInput(input) {
	        this.setState({
	            input: input
	        });
	    },

	    render: function render() {
	        return React.createElement(
	            'button',
	            { className: 'form-control', onClick: this.onButtonClick },
	            'Run Command'
	        );
	    }
	});

	module.exports = RunButton;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ServerSelector = __webpack_require__(8);

	var ServerStatus = React.createClass({
	    displayName: 'ServerStatus',

	    getInitialState: function getInitialState() {
	        this.getStatus(this.props.hosts[0]);

	        return {
	            status: ''
	        };
	    },

	    selectorChanged: function selectorChanged(field) {
	        this.getStatus(field);
	    },

	    getStatus: function getStatus(host) {
	        this.serverRequest = $.post('/info', { host: host }, function (result) {
	            this.setState({
	                status: result
	            });
	        }.bind(this));
	    },

	    render: function render() {
	        var Selector = React.createElement(ServerSelector, { onChange: this.selectorChanged.bind(this), hosts: this.props.hosts });

	        if (this.state.status) {
	            var table = _renderStatus(this.state.status);
	            return React.createElement(
	                'div',
	                null,
	                Selector,
	                React.createElement(
	                    'table',
	                    null,
	                    React.createElement(
	                        'tbody',
	                        null,
	                        table.map(function (row, i) {
	                            return React.createElement(
	                                'tr',
	                                { key: i },
	                                row.map(function (col, j) {
	                                    return React.createElement(
	                                        'td',
	                                        { key: j },
	                                        col
	                                    );
	                                })
	                            );
	                        })
	                    )
	                )
	            );
	        } else {
	            return React.createElement(
	                'div',
	                null,
	                Selector,
	                React.createElement(
	                    'div',
	                    null,
	                    'Results will be displayed here'
	                )
	            );
	        }
	    }
	});

	function _renderStatus(status) {
	    var lines = status.split('\n');
	    var table = [];
	    lines.forEach(function (line) {
	        if (line) {
	            var pair = line.split(':');
	            var obj = [];
	            obj.push(pair[0]);
	            obj.push(pair[1]);
	            table.push(obj);
	        }
	    });

	    return table;
	}

	module.exports = ServerStatus;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var ServerSelector = React.createClass({
	    displayName: "ServerSelector",

	    getInitialState: function getInitialState() {
	        return {
	            selectValue: this.props.hosts[0]
	        };
	    },

	    changed: function changed(e) {
	        this.state.selectValue = e.target.value;
	        this.props.onChange(e.target.value);
	    },

	    render: function render() {

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "row" },
	                React.createElement(
	                    "div",
	                    { className: "col-lg-10" },
	                    React.createElement(
	                        "div",
	                        { className: "col-lg-4" },
	                        "Select server:"
	                    ),
	                    React.createElement(
	                        "div",
	                        { className: "col-lg-6" },
	                        React.createElement(
	                            "select",
	                            { value: this.state.selectValue, onChange: this.changed },
	                            hosts.map(function (host, i) {
	                                return React.createElement(
	                                    "option",
	                                    { id: i, name: "{host}" },
	                                    host
	                                );
	                            }),
	                            ";"
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "row" },
	                React.createElement("p", null)
	            )
	        );
	    }
	});

	function _renderStatus(status) {
	    var lines = status.split('\n');
	    var table = [];
	    lines.forEach(function (line) {
	        if (line) {
	            var pair = line.split(':');
	            var obj = [];
	            obj.push(pair[0]);
	            obj.push(pair[1]);
	            table.push(obj);
	        }
	    });

	    return table;
	}

	module.exports = ServerSelector;

/***/ }
/******/ ]);