var RedisLive =
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

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CommandOutput = __webpack_require__(1);
	var CommandInput = __webpack_require__(2);
	var ServerStatus = __webpack_require__(3);
	var ClusterStatus = __webpack_require__(5);

	console.log('wotcha');

	var RedisLive = function RedisLive(redisLive) {
	    _classCallCheck(this, RedisLive);

	    var commandOutput = redisLive.commandOutput;
	    var commandInput = redisLive.commandInput;

	    var serverStatus = redisLive.serverStatus;
	    var clusterStatus = redisLive.clusterStatus;

	    redisLive.path = redisLive.path || '';

	    if (commandOutput && commandInput) {
	        var Output = ReactDOM.render(React.createElement(CommandOutput, null), commandOutput);

	        var Input = ReactDOM.render(React.createElement(CommandInput, { path: redisLive.path, commands: redisLive.commands }), commandInput);

	        Input.setOutput(Output);
	    }

	    if (serverStatus) {
	        var Status = ReactDOM.render(React.createElement(ServerStatus, { hosts: redisLive.hosts, path: redisLive.path }), serverStatus);
	    }

	    if (clusterStatus) {
	        var Cluster = ReactDOM.render(React.createElement(ClusterStatus, { path: redisLive.path }), clusterStatus);
	        Cluster.initialize();
	    }
	};

	module.exports = RedisLive;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var resultsStyle = {
	    "height": "200px",
	    "fontFamily": "monospace"
	};

	var CommandOutput = React.createClass({
	    displayName: "CommandOutput",

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

	module.exports = CommandOutput;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* eslint-disable react/react-in-jsx-scope */

	// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
	var commands = [];

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

	var CommandInput = function (_React$Component) {
	  _inherits(CommandInput, _React$Component);

	  // eslint-disable-line no-undef
	  function CommandInput() {
	    _classCallCheck(this, CommandInput);

	    var _this = _possibleConstructorReturn(this, (CommandInput.__proto__ || Object.getPrototypeOf(CommandInput)).call(this));

	    _this.onChange = function (event, _ref) {
	      var newValue = _ref.newValue;

	      _this.setState({
	        value: newValue,
	        text: event.target.value
	      });

	      _this.props.commands.forEach(function (command) {
	        if (command.name == newValue) {
	          _this.setState({
	            summary: command.summary,
	            complexity: command.complexity
	          });
	        }
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

	    _this.setOutput = function (output) {
	      _this.setState({
	        output: output
	      });
	    };

	    _this.onButtonClick = function (evt) {
	      var options = {
	        url: _this.props.path + '/command',
	        dataType: 'json',
	        type: 'POST',
	        data: { command: _this.getText() }
	      };

	      _this.serverRequest = $.ajax(options).always(function (result) {
	        if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object') {
	          _this.state.output.setText(result.responseText);
	        } else {
	          _this.state.output.setText(result.replace(/\n/g, '<br />'));
	        }
	      });
	    };

	    _this.state = {
	      value: '',
	      suggestions: getSuggestions('')
	    };
	    return _this;
	  }

	  _createClass(CommandInput, [{
	    key: 'render',
	    value: function render() {
	      commands = this.props.commands;
	      var _state = this.state;
	      var value = _state.value;
	      var suggestions = _state.suggestions;

	      var inputProps = {
	        placeholder: 'e.g. SET hello world',
	        value: value,
	        onChange: this.onChange
	      };

	      var css = {
	        "display": "inline-block",
	        "verticalAlign": "middle"
	      };

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'div',
	            { className: 'autosuggest' },
	            React.createElement(Autosuggest // eslint-disable-line react/jsx-no-undef
	            , { suggestions: suggestions,
	              onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
	              onSuggestionsClearRequested: this.onSuggestionsClearRequested,
	              getSuggestionValue: getSuggestionValue,
	              renderSuggestion: renderSuggestion,
	              inputProps: inputProps
	            })
	          ),
	          React.createElement(
	            'label',
	            { id: 'summaryLabel', className: 'autosuggest-summary' },
	            this.state.summary,
	            ' ',
	            this.state.complexity ? ' - ' + this.state.complexity : ''
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row' },
	          React.createElement(
	            'button',
	            { className: 'btn btn-primary', onClick: this.onButtonClick },
	            'Run Command'
	          )
	        )
	      );
	    }
	  }]);

	  return CommandInput;
	}(React.Component);

	module.exports = CommandInput;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ServerSelector = __webpack_require__(4);

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
	        var _this = this;

	        var options = {
	            url: this.props.path + '/info',
	            dataType: 'json',
	            type: 'POST',
	            data: { host: host }
	        };

	        this.serverRequest = $.ajax(options).always(function (result) {
	            _this.setState({
	                status: result.responseText
	            });
	        });
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
/* 4 */
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
	                            this.props.hosts.map(function (host, i) {
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

/***/ },
/* 5 */
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
	        var _this = this;

	        var options = {
	            url: this.props.path + '/command',
	            dataType: 'json',
	            type: 'POST',
	            data: { command: 'cluster nodes' }
	        };

	        this.serverRequest = $.ajax(options).always(function (result) {
	            _this.setState({
	                status: result.responseText
	            });
	        });
	    },

	    render: function render() {
	        var _this2 = this;

	        if (this.state.status) {
	            var _ret = function () {
	                var cluster = _renderStatus(_this2.state.status);
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

/***/ }
/******/ ]);