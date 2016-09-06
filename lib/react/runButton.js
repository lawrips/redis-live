var RunButton = React.createClass({
    getInitialState: function() {
        return {
            output: {}
        };
    },

    onButtonClick: function(evt) {
        this.serverRequest = $.post('/command', 
        {command: this.state.input.getText()},
        function (result) {
            if (typeof result === 'object') {
                this.state.output.setText(JSON.stringify(result));
            }
            else {
                this.state.output.setText(result.replace(/\n/g,'<br />'));
            }
        }.bind(this));
    },

    setOutput: function(output) {
        this.setState({
            output: output
        });
    },

    setInput: function(input) {
        this.setState({
            input: input
        });
    },

    render: function() {
        return <button className="btn btn-primary" onClick={this.onButtonClick}>Run Command</button>
    }
});

module.exports = RunButton;
