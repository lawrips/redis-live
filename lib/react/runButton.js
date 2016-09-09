var RunButton = React.createClass({
    getInitialState: function() {
        return {
            output: {}
        };
    },

    onButtonClick: function(evt) {
        var options = {
            url: this.props.path + '/command',
            dataType: 'json', 
            type: 'POST',
            data: {command: this.state.input.getText()},
        }

        this.serverRequest = $.ajax(options).always((result) => {
            if (typeof result === 'object') {
                this.state.output.setText(result.responseText);
            }
            else {
                this.state.output.setText(result.replace(/\n/g,'<br />'));
            }
        });
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
