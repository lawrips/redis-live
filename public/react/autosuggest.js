"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/react-in-jsx-scope */

var commands = [{ "name": "append" }, { "name": "add" }, { "name": "auth" }, { "name": "bgrewriteaof" }, { "name": "bgsave" }, { "name": "cluster" }, { "name": "get" }, { "name": "hget" }, { "name": "hgetall" }, { "name": "sadd" }, { "name": "set" }, { "name": "smembers" }];

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
    "span",
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
    key: "render",
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