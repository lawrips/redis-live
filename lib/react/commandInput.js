/* eslint-disable react/react-in-jsx-scope */
var Commands = require('./commands');

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
var commands;

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

class CommandInput extends React.Component { // eslint-disable-line no-undef
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

    commands.forEach((command) => {
      if (command.name == newValue) {
        this.setState({
          summary: command.summary,
          complexity: command.complexity
        });
      }
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


  setOutput = ((output) => {
      this.setState({
          output: output
      });
  });

  onButtonClick = ((evt) => {
      var options = {
          url: this.props.path + '/command',
          dataType: 'json', 
          type: 'POST',
          data: {command: this.getText()},
      }

      this.serverRequest = $.ajax(options).always((result) => {
          if (typeof result === 'object') {
              this.state.output.setText(result.responseText);
          }
          else {
              this.state.output.setText(result.replace(/\n/g,'<br />'));
          }
      });
  })

  render() {
    commands = commands || this.props.commands || new Commands().get();
    //commands = this.props.commands;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'e.g. SET hello world',
      value,
      onChange: this.onChange
    };

    var css =  {
      "display": "inline-block",
      "verticalAlign": "middle"    
    }

    return (
          <div>
            <div className="row">
              <div className="autosuggest">
                  <Autosuggest // eslint-disable-line react/jsx-no-undef
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} 
                    />
              </div>
              <label id="summaryLabel" className="autosuggest-summary">
                {this.state.summary} {this.state.complexity ? ' - ' + this.state.complexity : ''}
              </label>
            </div>
              <div className="row">
                  <button className="btn btn-primary" onClick={this.onButtonClick}>Run Command</button>
              </div>
          </div>
    );
  }
}

module.exports = CommandInput;