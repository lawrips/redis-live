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