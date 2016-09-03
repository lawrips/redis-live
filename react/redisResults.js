var resultsStyle = {
    "height": "200px",
    "fontFamily":"monospace",
}

var RedisResults = React.createClass({
    getInitialState: function() {
        return {
            text: ''
        };
    },

    setText: function(text) {
        this.setState({
            text: text
        });
    },

    render: function() {
        return (
            <div  >
            <pre style={resultsStyle} dangerouslySetInnerHTML={{__html: this.state.text}}>
                
            </pre>
            </div>
        )
    }
});

module.exports = RedisResults;