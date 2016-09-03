/* eslint-disable react/react-in-jsx-scope */

const commands = [{"name": "append"},
{"name":"add"},
{"name":"auth"},
{"name":"bgrewriteaof"},
{"name":"bgsave"},
{"name":"cluster"},
{"name":"GET key"},
{"name":"HGET key field"},
{"name":"HGETALL key"},
{"name":"SADD key member [member ...]"},
{"name":"SET key value [EX seconds] [PX milliseconds] [NX|XX]"},
{"name":"SMEMBERS key"}
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return commands.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class CommandTextBox extends React.Component { // eslint-disable-line no-undef
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      text: event.target.value
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getText = () => {
      return this.state.text;
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'e.g. SET hello world',
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest // eslint-disable-line react/jsx-no-undef
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

module.exports = CommandTextBox;